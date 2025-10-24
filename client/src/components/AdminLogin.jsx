import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const [email, setEmail] = useState('admin@percevia.local');
  const [password, setPassword] = useState('password123');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try{
      const base = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) return setErr(data.message || 'Login failed');
      localStorage.setItem('percevia_token', data.token);
      navigate('/admin');
    }catch(e){ setErr('Network error') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <form onSubmit={submit} className="bg-white/5 p-6 rounded-lg w-full max-w-md">
  <h2 className="text-xl font-bold mb-4">Admin Login</h2>
  <div className="text-sm text-gray-300 mb-4">Note: the form fields are pre-filled for convenience during testing.</div>
        {err && <div className="text-red-400 mb-2">{err}</div>}
        <label className="block text-sm mb-1 text-white">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-3 rounded mb-2 text-white placeholder-gray-400 bg-[#222]" style={{caretColor:'#fff'}} />
        <label className="block text-sm mb-1 text-white">Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full p-3 rounded mb-4 text-white placeholder-gray-400 bg-[#222]" style={{caretColor:'#fff'}} />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-white/10 rounded">Sign in</button>
        </div>
      </form>
    </div>
  )
}
