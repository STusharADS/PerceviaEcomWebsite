export default function About(){
  return (
    <section id="about" className="py-20 px-6 bg-white/5 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Why Percevia?</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg mb-6">Percevia is a sophisticated, AI-powered smart glasses system designed exclusively for people who are <strong>completely blind</strong>. It combines hardware and software to restore a sense of sight through audio and sensory feedback.</p>
            
            <h3 className="text-xl font-semibold mb-3">What Makes Us Different</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>Built exclusively for the completely blind</strong> for an uncompromised experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>Manufacturing cost just ₹6000</strong> - unlocking mass accessibility (retail target: ₹10-15k)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>90% more affordable</strong> than competitors (Envision ₹2.5L, OrCam ₹2L+)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>Ideal for government schemes</strong> - price point enables large-scale deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>12 hours battery life</strong> - industry-leading continuous power with smart frame design</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Social Impact</h3>
            <div className="bg-white/6 p-6 rounded-lg mb-4">
              <p className="text-cyan-400 text-3xl font-bold mb-2">5:1 Social ROI</p>
              <p className="text-sm">For every ₹1 invested, ₹5 of tangible social value is created through employment, education, reduced inequalities, security, and independence.</p>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">Target Market</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>43 Million</strong> completely blind individuals globally</li>
              <li><strong>1 Billion</strong> with low vision</li>
              <li>India has <strong>one-fifth</strong> of the world's blind population</li>
              <li>Blind population projected to <strong>triple by 2050</strong></li>
              <li><strong>In next 6 months:</strong> Aiming to change {'>'}100 lives</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Recognition & Partnerships</h3>
        <ul className="grid md:grid-cols-2 gap-3 mb-6 text-sm">
          <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> Top 20 finalist - Samsung Solve for Tomorrow (20,000+ applicants)</li>
          <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> Featured in Financial Express</li>
          <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> Praised by Vinay Sir (Vedantu)</li>
          <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> Incubated at Scaler Innovation Lab (SIL)</li>
          <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> Partnered with SRMAB & Sri Rakum School for pilot testing</li>
          <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> Interviewed 100s of blind kids and adults for feedback</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">Roadmap & Funding</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/6 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Q3 2025</h4>
            <p>R&D, model improvements, secure ₹25L grant from Samsung competition</p>
          </div>
          <div className="bg-white/6 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Q4 2025 - Q1 2026</h4>
            <p>Injection molding (₹2.5L onetime + ₹400/unit), PCB manufacturing with JLCPCB - transition to scalable production</p>
          </div>
          <div className="bg-white/6 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Q1-Q2 2026</h4>
            <p>Pilot with blind schools, market launch targeting schools, B2C customers, and government schemes</p>
          </div>
        </div>
      </div>
    </section>
  )
}
