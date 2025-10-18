// components/CartButton.tsx
"use client";
import Link from "next/link";
import React from "react";
import { useCart } from "./SupabaseCartContext";

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link href="/cart" className="relative inline-flex items-center gap-2 px-3 py-1">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      <span className="hidden md:inline">Cart</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
          {count}
        </span>
      )}
    </Link>
  );
}
