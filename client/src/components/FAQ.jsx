export default function FAQ(){
  const faqs = [
    {q: 'When will the glasses ship?', a: 'We are running pre-orders now and expect first-run shipments after the launch/pilot phase. Exact shipping dates will be emailed to pre-order customers.'},
    {q: 'What platforms does the app support?', a: 'The companion app is designed specifically for people who are completely blind. Android (APK) support is available first; iOS support is planned for a later release.'},
    {q: 'What are the key features of Percevia?', a: 'Percevia provides advanced object detection (YOLO), scene descriptions (BLIP), 3x3 spatial audio cues, LiDAR-based depth sensing for collision avoidance, facial recognition, lost-item finder, and an interactive voice assistant. All heavy processing happens locally on the user\'s phone for privacy.'},
    {q: 'Is user data sent to the cloud?', a: 'No. Percevia is privacy-first: all processing happens locally between the glasses and the companion phone app. No personal images or environment data are sent to external servers.'},
    {q: 'Where can I see a demo or learn more?', a: 'Watch the Percevia V4 dissection video and a visual demo: Video: https://drive.google.com/file/d/1f73e_B948IAEg5urh-SCR-2sYYvbjntT/view?usp=sharing  • Design demo: https://www.canva.com/design/DAGyfVCAmd0/8T8fhC9eCFTWJuMcNz6PXA/edit?utm_content=DAGyfVCAmd0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'},
  ];

  return (
    <section id="faq" className="py-20 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold mb-6 heading-accent neon text-left">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white/6 p-4 rounded-lg">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
