export default function Download(){
  return (
    <section id="download" className="py-20 px-6 bg-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Download App</h2>
        <p className="mb-6">The companion Android app is built specifically for people who are completely blind. Install the APK on an Android device to pair with the glasses — all processing stays local on the phone for privacy.</p>
        <p className="text-sm text-muted mb-4">To make this link work locally, put your APK at <code>/client/public/percevia-app.apk</code>.</p>
        <a href="/percevia-app.apk" download className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold">Download APK</a>
      </div>
    </section>
  )
}
