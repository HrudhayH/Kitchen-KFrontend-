// components/ClientProviders.tsx
"use client";
import React from "react";
import { CartProvider } from "./CartContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
