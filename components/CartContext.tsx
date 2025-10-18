// components/CartContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty?: number;
  image_url?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kk_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kk_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].qty = (copy[idx].qty || 1) + (item.qty || 1);
        return copy;
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setItems([]);

  const value: CartContextValue = {
    items,
    count: items.reduce((s, it) => s + (it.qty || 0), 0),
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
