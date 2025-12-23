import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-grid pt-20">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full"></div>

      <div className="relative z-10 container mx-auto px-6 h-[85vh] flex flex-col justify-center items-center text-center">
        <div className="inline-block glass px-4 py-2 rounded-full mb-8 border-white/5">
          <span className="text-orange-500 font-mono text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
            System Online: Support Version 1.0.4
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
          FUEL YOUR <br />
          <span className="text-gradient">FAVORITE CREATOR</span>
        </h1>

        <p className="max-w-xl text-gray-500 text-lg md:text-xl font-medium mb-12 leading-relaxed">
          The futuristic gateway to support creators. Buy a <span className="text-white font-bold">Biryani</span> 🥘 and power the next era of digital excellence.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <Link href="/login">
            <button type="button" className="relative group overflow-hidden bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl text-lg px-10 py-5 transition-all shadow-2xl shadow-orange-900/40 active:scale-95">
              <span className="relative z-10 flex items-center gap-3 italic">
                ENGAGE SYSTEM <span className="text-2xl not-italic">🥘</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </Link>
          <Link href="/about">
            <button type="button" className="glass hover:bg-white/10 text-white font-bold rounded-2xl text-lg px-10 py-5 transition-all border-white/10 active:scale-95">
              PROTOCOL SPECS
            </button>
          </Link>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-md py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: "🌐", title: "Global Sync", desc: "Instantly synchronize with creators across the digital grid." },
              { icon: "⚡", title: "Hyper Flow", desc: "No latency. No complex forms. Just support in one click." },
              { icon: "🛡️", title: "Encrypted", desc: "Military-grade Razorpay integration for total data safety." }
            ].map((feature, i) => (
              <div key={i} className="glass p-8 rounded-3xl border-transparent hover:border-orange-500/20 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-orange-500 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-black text-xl text-white mb-2 tracking-tight uppercase">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
