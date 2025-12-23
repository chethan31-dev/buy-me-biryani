"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const PortalPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") return null
    if (status === "unauthenticated") {
        router.push('/login')
        return null
    }

    return (
        <div className="relative min-h-screen bg-grid flex items-center justify-center pt-20 px-6 overflow-hidden">
            {/* Background Glows */}
            <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full'></div>
            <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full'></div>

            <div className="max-w-4xl w-full z-10">
                <div className='text-center mb-12'>
                    <h1 className='text-5xl font-black text-gradient tracking-tighter mb-4'>CHOOSE YOUR PATH</h1>
                    <p className='text-gray-400 font-mono text-sm tracking-widest uppercase'>Identify your synchronization mode</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Payer Path */}
                    <Link href="/creators" className="group">
                        <div className="glass p-10 rounded-[2.5rem] border-white/5 h-full transition-all hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 group-active:scale-[0.98]">
                            <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:bg-orange-500 transition-colors">
                                💳
                            </div>
                            <h2 className="text-3xl font-black mb-4 group-hover:text-orange-500 transition-colors">I AM A PAYER</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Enter the grid to discover creators and support them with Biryani transfers. Search the database for your favorite artists.
                            </p>
                            <div className='mt-8 flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase'>
                                Explore Creators ➔
                            </div>
                        </div>
                    </Link>

                    {/* Creator Path */}
                    <Link href="/creator-settings" className="group">
                        <div className="glass p-10 rounded-[2.5rem] border-white/5 h-full transition-all hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 group-active:scale-[0.98]">
                            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:bg-blue-500 transition-colors">
                                🏛️
                            </div>
                            <h2 className="text-3xl font-black mb-4 group-hover:text-blue-500 transition-colors">I AM A CREATOR</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Initialize your personalized vault and setup your Razorpay credentials to start receiving support from the grid.
                            </p>
                            <div className='mt-8 flex items-center gap-2 text-blue-500 font-bold text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase'>
                                Setup Vault ➔
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PortalPage
