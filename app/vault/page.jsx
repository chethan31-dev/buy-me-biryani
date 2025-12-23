"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VaultRoot() {
    const router = useRouter()
    useEffect(() => {
        router.push('/creators')
    }, [router])
    return null
}
