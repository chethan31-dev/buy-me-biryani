"use client"
import React, { useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const PortalPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p className="text-center mt-20">Loading...</p>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid p-6">
      <div className="w-full max-w-2xl glass p-6 md:p-8 rounded-2xl text-center">
        <h1 className="text-2xl md:text-4xl font-black mb-3">Welcome, {session.user.name || session.user.email}</h1>
        <p className="text-sm text-gray-400 mb-6">Choose your role to continue</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => router.push('/creators')} className="py-4 md:py-6 px-4 bg-orange-600 text-white rounded-2xl font-bold">I am a Payer</button>
          <button onClick={() => router.push('/creator-settings')} className="py-4 md:py-6 px-4 bg-blue-600 text-white rounded-2xl font-bold">I am a Creator</button>
        </div>

        <div className="mt-6 text-xs text-gray-500">Signed in as @{session.user.username || session.user.email}</div>
      </div>
    </div>
  )
}

export default PortalPage
