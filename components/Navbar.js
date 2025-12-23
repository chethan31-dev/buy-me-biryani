"use client"
import React from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className='fixed top-0 left-0 right-0 z-[100] h-20 glass border-b border-white/5'>
      <div className='container mx-auto h-full flex justify-between items-center px-6'>
        <Link className="group flex items-center gap-3" href={"/"}>
          <div className='w-10 h-10 glass flex items-center justify-center rounded-xl group-hover:bg-orange-500 transition-colors shadow-lg group-hover:shadow-orange-500/50'>
            <span className='group-hover:scale-110 transition-transform'>🥘</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-black text-xl tracking-tighter leading-none'>
              BUY ME A <span className='text-orange-500 underline decoration-orange-500/30 decoration-4 underline-offset-4'>BIRYANI</span>
            </span>
            <span className='text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold pt-2' >Creator Support v1.0</span>
          </div>
        </Link>

        <div className='flex items-center gap-6'>
          {session ? (
            <>
              <Link href="/portal" className='hidden md:block text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-orange-500/50 pb-1'>
                Portal
              </Link>
              <Link href="/creators" className='hidden md:block text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-orange-500/50 pb-1'>
                Creators Grid
              </Link>
              <div className='flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/5'>
                <img src={session.user.image || "/user_icon.png"} className='w-8 h-8 rounded-xl border border-white/10' alt="" />
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className='text-white hover:text-orange-500 px-3 py-1 text-xs font-black uppercase tracking-tight transition-all'
                >
                  Eject
                </button>
              </div>
            </>
          ) : (
            <div className='flex items-center gap-4'>
              <Link href="/about" className='hidden md:block text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors'>
                System Specs
              </Link>
              <Link href="/login">
                <button className='bg-white text-black hover:bg-orange-500 hover:text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all shadow-xl shadow-white/5 active:scale-95'>
                  Initialize
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
