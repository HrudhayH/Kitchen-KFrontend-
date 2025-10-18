// app/login/page.tsx
"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") ?? "/";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInEmail = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signErr } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    setLoading(false);
    if (signErr) {
      setError(signErr.message);
      return;
    }
    router.push(next);
  };

  const signInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // redirect to current origin
        redirectTo: `${window.location.origin}${next}`,
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={signInEmail} className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          type="email"
          required
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          type="password"
          required
        />
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="my-4 text-center">OR</div>

      <button onClick={signInGoogle} className="w-full border py-2 rounded flex items-center justify-center gap-2">
        <img src="/google-icon.png" alt="Google" className="h-5" />
        Continue with Google
      </button>

      <p className="mt-4 text-sm">
        Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a>
      </p>
    </div>
  );
}
