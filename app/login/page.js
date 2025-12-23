"use client"
import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (session) {
      router.push('/portal')
    }
  }, [session, router])

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden bg-grid'>
      {/* Animated background blobs */}
      <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse'></div>
      <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700'></div>

      <div className="glass p-10 rounded-3xl shadow-2xl max-w-md w-full z-10 border border-white/10">
        <div className='text-center mb-10'>
          <div className='inline-block p-4 rounded-2xl bg-orange-500/10 mb-4 border border-orange-500/20'>
            <span className='text-5xl'>🥘</span>
          </div>
          <h1 className='text-4xl font-black text-gradient mb-2 tracking-tighter'>Access Vault</h1>
          <p className='text-gray-400 text-sm'>Enter the futuristic portal of support</p>
        </div>

        {error && (
          <div className='bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl mb-6 text-center animate-shake'>
            Authentication failed. Please check your credentials or network.
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={() => signIn("google", { callbackUrl: '/portal' })}
            className="group flex items-center justify-center w-full bg-white text-black rounded-xl px-6 py-4 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: '/portal' })}
            className="group flex items-center justify-center w-full bg-[#24292e] text-white rounded-xl px-6 py-4 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/20 border border-white/5"
          >
            <svg className="w-6 h-6 mr-3 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className='mt-8 pt-8 border-t border-white/5 flex flex-col items-center'>
          <p className='text-gray-500 text-[10px] uppercase tracking-widest font-bold'>Cyber Protocol Active</p>
          <p className='text-orange-500/50 text-[10px] mt-1'>TEST MODE: rzp_test_id required</p>
        </div>
      </div>
    </div>
  )
}

export default Login