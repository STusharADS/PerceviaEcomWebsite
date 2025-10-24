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
      {loading ? <div>Loading...</div> : (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <label className="inline-flex items-center gap-2"><input type="checkbox" onChange={(e)=>selectAll(e.target.checked)} checked={selected.size === items.length && items.length>0} /> Select all</label>
            <button className="px-3 py-1 bg-red-600 rounded" onClick={deleteBulk} disabled={selected.size===0}>Delete selected</button>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Qty</th>
                <th>Ordered At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it._id} className="border-t border-white/6">
                  <td className="py-2"><input type="checkbox" checked={selected.has(it._id)} onChange={()=>toggleSelect(it._id)} /></td>
                  <td className="py-2">{it.name}</td>
                  <td>{it.email}</td>
                  <td>{it.phone}</td>
                  <td>{it.qty}</td>
                  <td>{new Date(it.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <button className="px-3 py-1 bg-red-600 rounded" onClick={()=>remove(it._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
