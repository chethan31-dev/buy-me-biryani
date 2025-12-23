"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'

const VaultPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { username } = useParams()
    const [creator, setCreator] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login')
        }
    }, [status, router])

    useEffect(() => {
        if (status === "authenticated" && username) {
            const fetchCreator = async () => {
                try {
                    const res = await fetch(`/api/creator-vault?username=${username}`)
                    const data = await res.json()
                    if (res.ok) {
                        setCreator(data)
                    } else {
                        setError(data.error || "Creator not found")
                    }
                } catch (err) {
                    setError("Failed to fetch creator data")
                } finally {
                    setLoading(false)
                }
            }
            fetchCreator()
        }
    }, [status, username])

    const handlePayment = async (amount) => {
        if (!creator || !creator.razorpayid) {
            alert("Creator Razorpay configuration missing!")
            return
        }

        const options = {
            key: creator.razorpayid,
            amount: amount * 100,
            currency: "INR",
            name: "Buy Me a Biryani",
            description: `Supporting ${creator.name}`,
            image: "https://cdn.iconscout.com/icon/free/png-256/free-biryani-icon-download-in-svg-png-gif-file-formats--chicken-rice-traditional-food-pack-icons-4686237.png",
            handler: function (response) {
                alert("Payment Successful! ID: " + response.razorpay_payment_id)
            },
            prefill: {
                name: session?.user?.name,
                email: session?.user?.email,
            },
            theme: {
                color: "#f97316"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-dark">
                <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-orange-500 font-bold tracking-widest text-xs animate-pulse">INITIATING VAULT ACCESS...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-grid">
                <div className="glass p-8 rounded-3xl border-red-500/20 border text-center max-w-md">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-red-500 mb-2">Vault Lockout</h1>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button onClick={() => router.push('/creators')} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl transition-all">Back to Grid</button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-grid pt-24 pb-16 px-4">
            {/* Radial Glow */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial opacity-50 pointe-events-none'></div>

            <div className="container mx-auto max-w-2xl relative z-10">
                <button onClick={() => router.back()} className='mb-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs uppercase'>
                    ⬅ Back to synchronization
                </button>

                <div className="glass rounded-[2rem] p-10 border-white/5 shadow-2xl overflow-hidden relative">
                    <div className='absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full'></div>

                    <div className='flex flex-col items-center mb-10'>
                        <div className='relative group'>
                            <div className='absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200'></div>
                            <img
                                src={creator.profilepic || "/user_icon.png"}
                                alt={creator.name}
                                className="relative w-32 h-32 rounded-3xl object-cover border border-white/10"
                            />
                        </div>

                        <div className='text-center mt-6'>
                            <h1 className="text-4xl font-black text-gradient tracking-tight">{creator.name}</h1>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                                <p className="text-orange-500/80 font-mono text-sm">@{creator.username}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-8 rounded-3xl mb-8 relative group overflow-hidden">
                        <div className='absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                        <p className="relative text-gray-300 text-center text-lg leading-relaxed mb-8">
                            Initialize a biryani transfer to {creator.name}. Direct support for digital excellence.
                        </p>

                        <button
                            onClick={() => handlePayment(100)}
                            className="relative w-full overflow-hidden group bg-orange-600 hover:bg-orange-500 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-orange-900/40 flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            <span className='text-2xl group-hover:rotate-12 transition-transform'>🥘</span>
                            <span className='text-xl tracking-tight'>TRANSFERS ₹100</span>
                            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className='glass p-4 rounded-2xl flex flex-col items-center text-center'>
                            <span className='text-gray-500 text-[10px] uppercase font-mono mb-1'>Protocol</span>
                            <span className='text-orange-500 font-bold'>R-SYNC 2.0</span>
                        </div>
                        <div className='glass p-4 rounded-2xl flex flex-col items-center text-center'>
                            <span className='text-gray-500 text-[10px] uppercase font-mono mb-1'>Status</span>
                            <span className='text-white font-bold tracking-widest uppercase text-xs animate-pulse'>Active Grid</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VaultPage
