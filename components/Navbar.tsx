// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CartButton from "./CartButton";

export default function Navbar({ logo = "/LOGO_PATH" }: { logo?: string }) {
  const supabase = createClientComponentClient();
  const [q, setQ] = useState("");
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  return (
    <header className="bg-white sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(v => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-10 object-contain" />
          <span className="hidden sm:inline text-xl font-bold text-emerald-600">KitchenKettles</span>
        </Link>

        {/* Search */}
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/search?q=${encodeURIComponent(q)}`; }} className="flex-1">
          <div className="relative">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products, brands and more" className="w-full rounded-full border px-4 py-2" />
            <button type="submit" className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-emerald-600 text-white">Search</button>
          </div>
        </form>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="text-sm">{user.email}</div>
          ) : (
            <Link href="/login" className="text-sm">Login</Link>
          )}
          <CartButton />
          <Link href="/become-seller" className="hidden lg:inline text-sm">Become Best customer</Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-2">
            <Link href="/login" className="py-2 border rounded px-3">Login</Link>
            <Link href="/cart" className="py-2 border rounded px-3">Cart</Link>
          </div>
        </div>
      )}
    </header>
  );
}
