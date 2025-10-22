export default function ProductSpecs(){
  return (
    <section id="specs" className="py-20 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center heading-accent neon">Specifications</h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* PCB Image */}
          <div className="flex-shrink-0">
            <img src="/pcb.png" alt="Percevia PCB Design" className="rounded-lg shadow-lg w-80 h-auto" />
          </div>
          
          {/* Technical Details */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4 text-cyan-300">Hardware Specifications</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Camera:</span>
                <span className="text-gray-300">5MP wide-angle lens with auto-focus, 120° field of view</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">LiDAR Sensor:</span>
                <span className="text-gray-300">Time-of-Flight, 8m range, 60Hz refresh rate for depth perception</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Processor:</span>
                <span className="text-gray-300">Runs on paired smartphone (Android 8.0+) via companion app</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Connectivity:</span>
                <span className="text-gray-300">Bluetooth 5.0, 10m range, low-latency audio streaming</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Battery:</span>
                <span className="text-gray-300">1500mAh rechargeable Li-ion, up to 12 hours continuous use</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Haptic Feedback:</span>
                <span className="text-gray-300">Dual vibration motors for distance-based collision alerts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Weight:</span>
                <span className="text-gray-300">~45g (lightweight frame design for all-day comfort)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Charging:</span>
                <span className="text-gray-300">USB-C fast charging (0-100% in ~2 hours)</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 mt-8 text-cyan-300">PCB Details</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Board Size:</span>
                <span className="text-gray-300">Custom compact PCB designed for eyewear integration</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Components:</span>
                <span className="text-gray-300">Camera module, LiDAR sensor, Bluetooth chip, battery management system, haptic drivers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-semibold min-w-[140px]">Manufacturing:</span>
                <span className="text-gray-300">JLCPCB assembly with SMT components, scalable for mass production</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
