import { useEffect, useState } from 'react';

function getToken(){
  return localStorage.getItem('percevia_token');
}

export default function AdminDashboard(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Set());

  const fetchList = async () => {
    setLoading(true);
    try{
      const base = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${base}/api/admin/preorders`, { headers: { Authorization: `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('auth');
      const data = await res.json();
      setItems(data);
    }catch(e){ console.error(e); setItems([]); }
    setLoading(false);
  }

  useEffect(()=>{ fetchList() }, []);

  const remove = async (id) => {
    try{
      const base = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${base}/api/admin/preorders/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('fail');
      setItems(i => i.filter(x => x._id !== id));
      setSelected(s => { const n = new Set(s); n.delete(id); return n; });
    }catch(e){ console.error(e) }
  }

  const toggleProcessed = async (id) => {
    try{
      const base = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${base}/api/admin/preorders/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error('fail');
      const data = await res.json();
      // update local item
      setItems(prev => prev.map(it => it._id === id ? data.preorder : it));
    }catch(e){ console.error(e) }
  }

  

  const deleteBulk = async () => {
    const ids = Array.from(selected);
    await Promise.all(ids.map(id => remove(id)));
    setSelected(new Set());
  }

  const toggleSelect = (id) => {
    setSelected(s => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    })
  }

  const selectAll = (checked) => {
    if (checked) setSelected(new Set(items.map(i=>i._id)))
    else setSelected(new Set())
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin — Preorders</h2>
      <div className="mb-6 text-sm text-gray-400">Manage incoming preorder requests. Use the checkboxes to select entries and delete them in bulk.</div>
      {loading ? <div>Loading...</div> : (
        <div>
          {/* Analytics: Age histogram and city map */}
          {items.length > 0 && (
            <div className="mb-6 grid md:grid-cols-2 gap-6">
              {/* Age histogram */}
              <div className="bg-white/5 p-4 rounded">
                <h3 className="font-semibold mb-3">Age distribution</h3>
                {(() => {
                  const buckets = { '0-17':0, '18-24':0, '25-34':0, '35-44':0, '45-54':0, '55-64':0, '65+':0 };
                  items.forEach(it => {
                    const a = Number(it.age);
                    if (!isNaN(a)) {
                      if (a < 18) buckets['0-17']++;
                      else if (a <= 24) buckets['18-24']++;
                      else if (a <= 34) buckets['25-34']++;
                      else if (a <= 44) buckets['35-44']++;
                      else if (a <= 54) buckets['45-54']++;
                      else if (a <= 64) buckets['55-64']++;
                      else buckets['65+']++;
                    }
                  });
                  const max = Math.max(...Object.values(buckets), 1);
                  return (
                    <div>
                      {Object.entries(buckets).map(([k,v]) => (
                        <div key={k} className="mb-2">
                          <div className="flex items-center justify-between text-sm mb-1"><div>{k}</div><div className="text-gray-300">{v}</div></div>
                          <div className="h-3 bg-white/10 rounded overflow-hidden">
                            <div className="h-3 bg-cyan-400" style={{width: `${Math.round((v/max)*100)}%`}} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })()}
              </div>

              {/* City map (approx) */}
              <div className="bg-white/5 p-4 rounded">
                <h3 className="font-semibold mb-3">City locations (approx)</h3>
                {(() => {
                  const counts = {};
                  items.forEach(it => { const c = (it.city || '').trim().toLowerCase(); if (c) counts[c] = (counts[c] || 0) + 1; });
                  const cityCoords = {
                    delhi: {x: 62, y: 18}, mumbai: {x: 36, y: 64}, bengaluru: {x: 58, y: 76}, chennai: {x: 72, y: 82}, kolkata: {x: 86, y: 36}, hyderabad: {x: 57, y: 64}, pune: {x: 38, y: 72}, ahmedabad: {x: 30, y: 46}, jaipur: {x: 44, y: 36}, lucknow: {x: 64, y: 40}
                  };
                  const mapped = Object.entries(counts).map(([city,count]) => ({ city, count, coord: cityCoords[city] || null }));
                  const known = mapped.filter(m => m.coord);
                  const unknown = mapped.filter(m => !m.coord);
                  return (
                    <div className="flex gap-4">
                      <svg viewBox="0 0 100 100" className="w-56 h-40 bg-black/40 rounded">
                        {/* simple India silhouette placeholder */}
                        <rect x="0" y="0" width="100" height="100" fill="transparent" />
                        {known.map((m, i) => (
                          <g key={m.city} transform={`translate(${m.coord.x}, ${m.coord.y})`}>
                            <circle r={Math.max(3, Math.min(12, 4 + m.count))} fill="#01D3F2" stroke="#fff" strokeWidth="0.5" />
                            <text x={0} y={-6} fontSize="4" fill="#fff" textAnchor="middle">{m.count > 1 ? m.count : ''}</text>
                            <title>{`${m.city} — ${m.count}`}</title>
                          </g>
                        ))}
                      </svg>
                      <div className="flex-1">
                        {unknown.length > 0 ? (
                          <div>
                            <div className="text-sm mb-2">Cities not plotted (no coordinate match):</div>
                            <ul className="text-sm space-y-1">
                              {unknown.map(u => (
                                <li key={u.city} className="flex items-center gap-2"><span className="inline-block bg-white/10 text-xs px-2 py-1 rounded">{u.count}</span> <span className="capitalize">{u.city}</span></li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-300">All cities plotted on map (approx).</div>
                        )}
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
          <div className="mb-4 flex items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-white"><input type="checkbox" onChange={(e)=>selectAll(e.target.checked)} checked={selected.size === items.length && items.length>0} /> <span className="ml-2">Select all</span></label>
            <button className="px-3 py-1 bg-red-600 rounded" onClick={deleteBulk} disabled={selected.size===0}>Delete selected</button>
          </div>

          <div className="grid gap-4">
            {items.slice().sort((a,b) => {
              if (a.processed === b.processed) return new Date(b.createdAt) - new Date(a.createdAt);
              return a.processed ? 1 : -1; // unprocessed first
            }).map(it => (
              <div key={it._id} className={`p-4 rounded-lg flex items-center justify-between gap-4 ${it.processed ? 'bg-white/2 opacity-70' : 'bg-white/5'}`}>
                <div className="flex items-center gap-4">
                  <input type="checkbox" checked={selected.has(it._id)} onChange={()=>toggleSelect(it._id)} />
                  <div>
                    <div className={`text-lg font-semibold ${it.processed ? 'line-through text-gray-400' : ''}`}>{it.name}</div>
                    <div className={`text-sm ${it.processed ? 'text-gray-400' : 'text-gray-300'}`}>{it.email} • {it.phone}</div>
                    <div className={`text-sm mt-1 ${it.processed ? 'text-gray-400' : 'text-gray-400'}`}>Qty: {it.qty} • Ordered: {new Date(it.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`px-3 py-2 rounded ${it.processed ? 'bg-gray-600 text-white' : 'bg-green-600 text-white'}`} onClick={()=>toggleProcessed(it._id)}>{it.processed ? 'Unmark' : 'Mark processed'}</button>
                  <button className="px-3 py-2 bg-red-600 rounded" onClick={()=>remove(it._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
