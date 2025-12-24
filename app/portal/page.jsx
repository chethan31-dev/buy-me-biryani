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
    <div>
      {/* your existing JSX */}
    </div>
  )
}

export default PortalPage
