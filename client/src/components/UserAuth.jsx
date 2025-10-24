import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserAuth(){
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault();
    setErr('')
    try{
      const base = import.meta.env.VITE_API_URL || '';
      if (mode === 'register'){
        const res = await fetch(`${base}/api/auth/register`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password }) })
        const data = await res.json()
        if (!res.ok) return setErr(data.message || 'Register failed')
        // after registration, auto-login
        const login = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
        const ld = await login.json()
        if (!login.ok) return setErr(ld.message || 'Login failed')
        localStorage.setItem('percevia_token', ld.token)
        if (ld.user) localStorage.setItem('percevia_user', JSON.stringify(ld.user))
        navigate('/')
      } else {
        const res = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
        const data = await res.json()
        if (!res.ok) return setErr(data.message || 'Login failed')
        localStorage.setItem('percevia_token', data.token)
        if (data.user) localStorage.setItem('percevia_user', JSON.stringify(data.user))
        navigate('/')
      }
    }catch(e){ console.error(e); setErr('Network error') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <form onSubmit={submit} className="bg-white/5 p-6 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{mode === 'login' ? 'Login' : 'Register'}</h2>
          <div>
            <button type="button" onClick={()=>setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-cyan-300">{mode === 'login' ? 'Create account' : 'Have an account?'}</button>
          </div>
        </div>
        {err && <div className="text-red-400 mb-2">{err}</div>}
  {mode === 'register' && (
    <>
      <label className="block text-sm mb-1 text-white">Full name</label>
      <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-3 rounded mb-2 text-white placeholder-gray-400 bg-[#222]" type="text" style={{caretColor: '#fff'}} required />
    </>
  )}
  <label className="block text-sm mb-1 text-white">Email</label>
  <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-3 rounded mb-2 text-white placeholder-gray-400 bg-[#222]" type="email" style={{caretColor: '#fff'}} required />
  <label className="block text-sm mb-1 text-white">Password</label>
  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full p-3 rounded mb-4 text-white placeholder-gray-400 bg-[#222]" style={{caretColor: '#fff'}} required />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-cyan-400 text-black rounded">{mode === 'login' ? 'Sign in' : 'Register'}</button>
        </div>
      </form>
    </div>
  )
}
