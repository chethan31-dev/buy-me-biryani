"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const CreatorsPage = () => {
    const [creators, setCreators] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('/api/creators')
            .then(res => res.json())
            .then(data => {
                setCreators(data)
                setLoading(false)
            })
    }, [])

    const filteredCreators = creators.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.username.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="relative min-h-screen bg-grid pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16'>
                    <div>
                        <h1 className='text-6xl font-black text-gradient tracking-tighter'>CREATORS GRID</h1>
                        <p className='text-gray-500 font-mono text-sm uppercase tracking-[0.2em] mt-2'>Select a target for transfer</p>
                    </div>

                    <div className='relative group'>
                        <div className='absolute inset-0 bg-orange-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity'></div>
                        <input
                            type="text"
                            placeholder="SEARCH BY NAME OR ID..."
                            className='relative glass bg-white/5 border-white/10 px-6 py-4 rounded-2xl w-full md:w-80 font-mono text-sm focus:outline-none focus:border-orange-500/50 transition-all'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="glass h-80 rounded-[2rem] animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCreators.map((creator) => (
                            <Link key={creator.username} href={`/vault/${creator.username}`} className="group">
                                <div className="glass p-8 rounded-[2rem] border-white/5 h-full transition-all hover:bg-white/[0.07] hover:border-orange-500/30 hover:-translate-y-2">
                                    <div className='flex items-center gap-6 mb-8'>
                                        <img
                                            src={creator.profilepic || "/user_icon.png"}
                                            className='w-20 h-20 rounded-2xl border border-white/10 object-cover shadow-lg group-hover:shadow-orange-500/20'
                                            alt=""
                                        />
                                        <div>
                                            <h3 className='text-2xl font-black tracking-tight leading-tight'>{creator.name}</h3>
                                            <p className='text-orange-500 font-mono text-xs uppercase mt-1'>@{creator.username}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between mt-4 pt-6 border-t border-white/5'>
                                        <span className='text-[10px] font-mono text-gray-500 uppercase tracking-widest'>Status: Synced</span>
                                        <button className='bg-orange-500/10 text-orange-500 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors group-hover:bg-orange-500 group-hover:text-white'>
                                            Pay Biryani
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {!loading && filteredCreators.length === 0 && (
                    <div className='text-center py-40'>
                        <p className='text-gray-500 font-mono text-xl'>NO CREATORS FOUND IN THE GRID</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreatorsPage
