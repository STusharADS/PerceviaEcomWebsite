export default function Specifications(){
  return (
    <section id="specs" className="py-20 px-6 bg-white/5 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">How Does It Work?</h2>

        {/* Two column layout: Text on left, PCB on right */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="flex-1">
            <p className="text-lg mb-4">
              It divides the <strong>FOV into a 9 grid</strong> (labeled 1 to 9 from top-left to bottom-right) and tells the user exactly what the object is and where it is, using <strong>audio cues</strong> and how far away it is, using <strong>haptic feedback</strong>.
            </p>
            <p className="text-cyan-400 text-xl font-semibold mb-2">{'{Object} {Grid Number}'}</p>
            <p className="text-lg">Distance - haptics (z)</p>
          </div>
          <div className="flex-shrink-0">
            <img src="/pcb.png" alt="Percevia PCB Design" className="rounded-lg shadow-lg w-80 h-auto" />
          </div>
        </div>

        {/* Street Demo Video */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-center">See Percevia in Action</h3>
          <div className="flex justify-center">
            <video autoPlay loop muted playsInline className="rounded-lg shadow-lg max-w-full h-auto" style={{ maxHeight: '500px' }}>
              <source src="/streetdemo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-6 text-center">Key Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {title: 'Object Detection & 9-Grid Spatial Awareness', text: 'YOLOv11 + YOLO-E identifies 235+ objects. Field of view divided into 3x3 grid with audio cues for precise location.'},
            {title: 'Scene Understanding', text: 'Press a button for full audio summary of surroundings. BLIP-based descriptions in under 2 seconds.'},
            {title: 'Depth Perception & Collision Avoidance', text: 'Time-of-Flight LiDAR (up to 8m range, 60Hz) with adaptive haptic feedback warns of obstacles.'},
            {title: 'Facial Recognition', text: 'Register loved ones - glasses announce them by name. >98% accuracy in good lighting.'},
            {title: 'Find Misplaced Items', text: 'Ask "Where is my bottle?" and receive verbal directions to locate personal objects.'},
            {title: 'Interactive Voice Assistant', text: 'Ask follow-up questions like "What is on the table?" for detailed environmental information.'},
            {title: 'Custom Object Learning', text: 'Point at unknown objects, name them, and the AI learns to identify them in seconds using YOLO-E.'},
            {title: 'Privacy-First & Offline', text: 'All processing on your smartphone locally. No cloud, no internet required. Complete data privacy.'},
            {title: 'Text & Currency Recognition', text: 'Read menus, signs, documents aloud. Identify currency, colors, and facial expressions in real-time.'},
            {title: 'Video Calls & Music', text: 'Make/receive calls using glasses camera. Listen to music through integrated audio.'},
            {title: '12-Hour Battery Life', text: 'Smart frame design with 1500mAh battery provides industry-leading continuous power.'},
            {title: 'Affordable at ₹6000 Manufacturing Cost', text: 'Target retail: ₹10,000-15,000. 90% cheaper than competitors (Envision ₹2.5L, OrCam ₹2L+).'},
          ].map((s, i) => (
            <li key={i} className="bg-white/6 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
