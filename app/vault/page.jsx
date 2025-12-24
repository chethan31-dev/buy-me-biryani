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
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h3>Loading creator vault...</h3>
      </div>
    );
  }

  // While redirecting, render nothing
  if (!session) return null;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Creator Vault</h1>

      <p>
        Viewing vault of: <b>{username}</b>
      </p>

      <p>
        Logged in as: <b>{session.user?.email}</b>
      </p>

      {/* Your vault content / payments UI here */}
    </div>
  );
}
