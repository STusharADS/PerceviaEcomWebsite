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
              {/* Age bar chart */}
              <div className="bg-white/5 p-4 rounded">
                <h3 className="font-semibold mb-3">Age distribution</h3>
                {(() => {
                  const buckets = [
                    { key: '0-17', min: 0, max: 17 },
                    { key: '18-24', min: 18, max: 24 },
                    { key: '25-34', min: 25, max: 34 },
                    { key: '35-44', min: 35, max: 44 },
                    { key: '45-54', min: 45, max: 54 },
                    { key: '55-64', min: 55, max: 64 },
                    { key: '65+', min: 65, max: 200 }
                  ];
                  const counts = buckets.map(b => 0);
                  items.forEach(it => {
                    const a = Number(it.age);
                    if (!isNaN(a)) {
                      const idx = buckets.findIndex(b => a >= b.min && a <= b.max);
                      if (idx >= 0) counts[idx]++;
                    }
                  });
                  const max = Math.max(...counts, 1);
                  const width = 280; // svg width
                  const height = 140; // svg height
                  const barW = Math.floor((width - 20) / counts.length) - 6;
                  return (
                    <div className="overflow-x-auto">
                      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
                        <rect x="0" y="0" width={width} height={height} fill="transparent" />
                        {counts.map((c, i) => {
                          const x = 10 + i * (barW + 6);
                          const h = Math.round((c / max) * (height - 40));
                          const y = height - h - 20;
                          return (
                            <g key={i}>
                              <rect x={x} y={y} width={barW} height={h} fill="#01D3F2" rx="3" />
                              <text x={x + barW / 2} y={y - 4} fontSize="10" fill="#fff" textAnchor="middle">{c}</text>
                              <text x={x + barW / 2} y={height - 6} fontSize="10" fill="#aaa" textAnchor="middle">{buckets[i].key}</text>
                            </g>
                          )
                        })}
                        {/* axis line */}
                        <line x1="8" y1={height - 20} x2={width - 8} y2={height - 20} stroke="#333" strokeWidth="1" />
                      </svg>
                    </div>
                  )
                })()}
              </div>

              {/* City locations: show top cities as a horizontal bar chart (more reliable than the map) */}
              <div className="bg-white/5 p-4 rounded">
                <h3 className="font-semibold mb-3">City distribution (top cities)</h3>
                {(() => {
                  const counts = {};
                  items.forEach(it => { const c = (it.city || '').trim(); if (c) counts[c] = (counts[c] || 0) + 1; });
                  const entries = Object.entries(counts).map(([city,count]) => ({ city, count }));
                  if (entries.length === 0) return <div className="text-sm text-gray-300">No city data available.</div>;
                  // sort descending
                  entries.sort((a,b) => b.count - a.count);
                  const top = entries.slice(0, 8);
                  const other = entries.slice(8).reduce((s,e) => s + e.count, 0);
                  const max = Math.max(...entries.map(e => e.count), 1);
                  return (
                    <div className="space-y-3">
                      {top.map(e => (
                        <div key={e.city} className="flex items-center gap-3">
                          <div className="w-32 text-sm text-gray-200 truncate">{e.city}</div>
                          <div className="flex-1 bg-black/20 rounded h-4 overflow-hidden">
                            <div className="h-4 bg-[#01D3F2]" style={{ width: `${Math.round((e.count / max) * 100)}%` }} />
                          </div>
                          <div className="w-10 text-right text-sm text-gray-200">{e.count}</div>
                        </div>
                      ))}
                      {other > 0 && (
                        <div className="flex items-center gap-3">
                          <div className="w-32 text-sm text-gray-200">Other</div>
                          <div className="flex-1 bg-black/20 rounded h-4 overflow-hidden">
                            <div className="h-4 bg-[#01D3F2]" style={{ width: `${Math.round((other / max) * 100)}%` }} />
                          </div>
                          <div className="w-10 text-right text-sm text-gray-200">{other}</div>
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-2">Showing top {top.length} cities. City names are displayed as entered and not normalized.</div>
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
