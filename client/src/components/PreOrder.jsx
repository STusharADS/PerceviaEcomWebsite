import { useState } from 'react';

export default function PreOrder() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qty, setQty] = useState(1);
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/api/preorders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, qty, age, city })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ loading: false, success: true, message: data.message || 'Preorder saved' });
        setName(''); setEmail(''); setPhone(''); setQty(1); setAge(''); setCity('');
      } else {
        setStatus({ loading: false, success: false, message: data.message || 'Error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, message: 'Network error' });
    }
  }

  return (
  <section id="pre-order" className="py-20 px-6 max-w-4xl mx-auto text-center bg-[#0D0D0D]">
      <h2 className="text-3xl font-bold mb-4 heading-accent neon">Pre order</h2>

      <div className="mb-6">
        <div className="max-w-md mx-auto bg-white/5 p-4 rounded-lg">
          <div className="text-sm text-white mb-2">Initial retail price</div>
          <div className="text-2xl text-gray-300 line-through">₹11,999</div>
          <div className="text-lg text-cyan-300 font-bold">Pre-order price: ₹8,999</div>
          <div className="text-xs text-gray-400 mt-2">Limited first-run pre-orders get the special pre-order price.</div>
        </div>
      </div>

      {status.success ? (
        <div className="bg-white/6 p-6 rounded-lg text-white">Thanks! Your pre-order request has been received. We'll contact you at the email you provided with next steps.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name" className="w-full p-3 rounded-md text-white placeholder-gray-400" style={{background: '#3a3a3c', border: '1px solid #48484a'}} aria-label="name" />
          <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" className="w-full p-3 rounded-md text-white placeholder-gray-400" style={{background: '#3a3a3c', border: '1px solid #48484a'}} aria-label="email" />
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone number" className="w-full p-3 rounded-md text-white placeholder-gray-400" style={{background: '#3a3a3c', border: '1px solid #48484a'}} aria-label="phone" />

          <div className="flex gap-2">
            <input required value={age} onChange={(e) => setAge(e.target.value)} type="number" min={1} max={120} placeholder="Age" className="w-1/2 p-3 rounded-md text-white placeholder-gray-400" style={{background: '#3a3a3c', border: '1px solid #48484a'}} aria-label="age" />
            <input required value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" className="w-1/2 p-3 rounded-md text-white placeholder-gray-400" style={{background: '#3a3a3c', border: '1px solid #48484a'}} aria-label="city" />
          </div>

          <div className="flex gap-2 justify-center">
            <label className="flex items-center gap-2 text-white">Qty
              <input required min={1} max={10} value={qty} onChange={(e) => setQty(Number(e.target.value))} type="number" className="w-20 p-2 rounded-md text-white ml-2" style={{background: '#3a3a3c', border: '1px solid #48484a'}} aria-label="quantity" />
            </label>
          </div>
          <div className="flex justify-center">
            <button disabled={status.loading} className="px-6 py-3 rounded-full font-semibold transition-colors" style={{background: '#3a3a3c', color: '#fff', border: '1px solid #48484a'}} onMouseEnter={(e) => e.currentTarget.style.background = '#48484a'} onMouseLeave={(e) => e.currentTarget.style.background = '#3a3a3c'}>{status.loading ? 'Submitting...' : 'Request Pre-order'}</button>
          </div>
          {status.success === false && <div className="text-red-400 mt-2">{status.message}</div>}
        </form>
      )}
    </section>
  );
}
