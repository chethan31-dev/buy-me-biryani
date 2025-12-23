import React from 'react';

const About = () => {
    return (
        <div className="relative min-h-screen bg-grid pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial opacity-30'></div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className='text-center mb-16'>
                    <h1 className="text-6xl font-black text-gradient tracking-tighter mb-4">PROTOCOL: BIRYANI</h1>
                    <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.3em]">System Documentation v1.0.4</p>
                </div>

                <div className='glass p-10 rounded-[2.5rem] border-white/5 mb-16'>
                    <p className="text-xl text-gray-300 leading-relaxed mb-10 first-letter:text-5xl first-letter:font-black first-letter:text-orange-500 first-letter:mr-3 first-letter:float-left">
                        Buy Me a Biryani is a premium creator-support ecosystem designed to bridge the digital gap between innovators and their most loyal synchronizers. It&apos;s a high-fidelity portal for showing appreciation through virtual Biryani transfers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                            <h2 className="text-2xl font-black mb-4 text-orange-500 tracking-tight">MISSION</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Empowering the next generation of digital architects by providing a zero-latency protocol for financial energy transfer.
                            </p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                            <h2 className="text-2xl font-black mb-4 text-orange-500 tracking-tight">WHY BIRYANI?</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Biryani represents complex layered excellence. Just as perfect spice ratios define a 🥘, great content requires resources and refined execution.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: "🚀", title: "ARCHITECTS", desc: "Creators receive direct neural transfers without middleman interference." },
                        { icon: "❤️", title: "SYNCHRONIZERS", desc: "Fans engage in high-speed support protocols for the art they admire." },
                        { icon: "🛡️", title: "ENCRYPTED", desc: "Powered by Razorpay 2.0 security layers for total transaction safety." }
                    ].map((item, i) => (
                        <div key={i} className="glass p-8 rounded-3xl text-center border-white/5 hover:border-orange-500/20 transition-all hover:-translate-y-2">
                            <span className="text-4xl mb-6 block">{item.icon}</span>
                            <h3 className="text-lg font-black text-white mb-2 tracking-widest uppercase">{item.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed lowercase font-mono">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;

export const metadata = {
    title: "Protocol Specs - Buy Me a Biryani",
}