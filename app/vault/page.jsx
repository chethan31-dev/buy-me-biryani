"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

export default function CreatorVaultPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { username } = useParams();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loader while session is resolving
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h3 className="text-lg">Loading creator vault...</h3>
      </div>
    );
  }

  // While redirecting, render nothing
  if (!session) return null;

  return (
    <div className="min-h-screen bg-grid py-12 px-4">
      <div className="container mx-auto max-w-3xl bg-white/5 glass p-6 rounded-2xl">
        <h1 className="text-2xl md:text-3xl font-black mb-4">Creator Vault</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm">
            Viewing vault of: <b className="font-bold">{username}</b>
          </p>

          <p className="text-sm">
            Logged in as: <b className="font-bold">{session.user?.email}</b>
          </p>
        </div>

        {/* Your vault content / payments UI here */}
      </div>
    </div>
  );
}
