"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";

  const { data: session, status } = useSession();

  // If already authenticated, ensure user goes to portal
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError("");

    // Use credentials provider and let NextAuth redirect to callbackUrl
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    });

    // If signIn doesn't redirect, stop loading and show generic error
    setLoading(false);
    setLocalError("Unable to sign in. Check credentials and try again.");
  };

  const handleProviderSignIn = (provider) => {
    // Redirect to provider sign-in; NextAuth will handle callbackUrl
    signIn(provider, { callbackUrl });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Login to Buy Me Biryani 🍛
        </h1>

        {(error || localError) && (
          <p className="text-red-500 text-sm text-center mb-4">
            {localError || "Authentication failed. Please try again."}
          </p>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handleProviderSignIn('google')}
            className="w-full bg-red-600 text-white py-3 md:py-4 rounded hover:bg-red-500"
          >
            Sign in with Google
          </button>

          <button
            onClick={() => handleProviderSignIn('github')}
            className="w-full bg-gray-800 text-white py-3 md:py-4 rounded hover:bg-gray-700"
          >
            Sign in with GitHub
          </button>

          <div className="text-center text-sm text-gray-500">or use email (not available)</div>
        </div>
      </div>
    </div>
  );
}
