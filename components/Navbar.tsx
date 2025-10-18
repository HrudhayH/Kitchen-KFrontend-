// components/Navbar.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { SupabaseCartProvider, useCart } from "./SupabaseCartContext"; // we will wrap in layout, but import useCart for cart count in small screen if needed
import CartButton from "./CartButton"; // reuse previous CartButton or create new below

export default function Navbar({ logo = "/LOGO_PATH" }: { logo?: string }) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user: u },
      } = await supabase.auth.getUser();
      setUser(u ?? null);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const encoded = encodeURIComponent(q.trim());
    router.push(`/search?q=${encoded}`);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <span className="hidden sm:inline font-bold text-lg">KitchenKettles</span>
          </Link>

          {/* Search bar */}
          <form onSubmit={submit} className="flex-1">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full rounded px-4 py-2 text-black"
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-orange-400 rounded text-black font-semibold"
              >
                Search
              </button>
            </div>
          </form>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-sm">{user.email}</div>
                <button onClick={signOut} className="px-3 py-1 border rounded border-white/30">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="px-3 py-1 border border-white rounded">
                Login
              </Link>
            )}
            <CartButton />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-blue-700 p-4">
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <div className="text-sm">{user.email}</div>
                  <button onClick={signOut} className="px-3 py-1 border rounded border-white/30">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="px-3 py-1 border border-white rounded">
                  Login
                </Link>
              )}
              <Link href="/cart" className="px-3 py-1 border border-white rounded">Cart</Link>
              <Link href="/orders" className="px-3 py-1 border border-white rounded">Orders</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
