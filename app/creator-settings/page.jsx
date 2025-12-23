"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CreatorSettings = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    const [formData, setFormData] = useState({
        name: '',
        profilepic: '',
        razorpayid: '',
        razorpaysecret: ''
    })

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login')
        }
        if (status === "authenticated") {
            // Pre-fill with session data if available
            setFormData(prev => ({
                ...prev,
                name: session.user.name || '',
                profilepic: session.user.image || '/user_icon.png'
            }))

            // Fetch existing data from DB
            fetch(`/api/creator-vault?username=${session.user.username}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setFormData({
                            name: data.name || '',
                            profilepic: data.profilepic || '',
                            razorpayid: data.razorpayid || '',
                            razorpaysecret: '' // Never show secret
                        })
                    }
                })
        }
    }, [status, session, router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const res = await fetch('/api/creator-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const result = await res.json()
            if (res.ok) {
                setMessage({ type: 'success', text: 'Vault synchronized successfully!' })
            } else {
                setMessage({ type: 'error', text: result.error || 'Failed to update vault.' })
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'System error during synchronization.' })
        } finally {
            setLoading(false)
        }
    }

    if (status === "loading") return null

    return (
        <div className="relative min-h-screen bg-grid pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-2xl relative z-10">
                <button onClick={() => router.push('/portal')} className='mb-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs uppercase'>
                    ⬅ Back to Portal
                </button>

                <div className="glass rounded-[2.5rem] p-10 border-white/5 shadow-2xl relative overflow-hidden">
                    <div className='absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full'></div>

                    <div className='mb-10'>
                        <h1 className='text-4xl font-black text-gradient tracking-tighter'>INITIALIZE VAULT</h1>
                        <p className='text-gray-500 font-mono text-xs uppercase mt-2'>Configure your reception parameters</p>
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-xl mb-8 border font-bold text-sm text-center ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-4">Display Name</label>
                                <input
                                    type="text"
                                    className="glass w-full bg-white/5 border-white/5 px-6 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-4">Profile Image URL</label>
                                <input
                                    type="text"
                                    className="glass w-full bg-white/5 border-white/5 px-6 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                    value={formData.profilepic}
                                    onChange={(e) => setFormData({ ...formData, profilepic: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-4">Razorpay Test Key (rzp_test_...)</label>
                            <input
                                type="text"
                                className="glass w-full bg-white/5 border-white/5 px-6 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-mono text-sm"
                                value={formData.razorpayid}
                                onChange={(e) => setFormData({ ...formData, razorpayid: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-4">Razorpay Secret (Hidden)</label>
                            <input
                                type="password"
                                placeholder="****************"
                                className="glass w-full bg-white/5 border-white/5 px-6 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all"
                                value={formData.razorpaysecret}
                                onChange={(e) => setFormData({ ...formData, razorpaysecret: e.target.value })}
                                required
                            />
                        </div>

                        <div className='pt-6'>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-blue-900/40 active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? 'SYNCHRONIZING...' : 'UPDATE VAULT PARAMS'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatorSettings
