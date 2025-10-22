// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Product, Brand, Category } from "@/lib/supabase";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryBar from "@/components/CategoryBar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import HeroBanner from "@/components/HeroBanner";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [pRes, bRes, cRes] = await Promise.all([
        supabase.from("products").select("*, brands(*), categories(*)").eq("is_active", true).limit(12),
        supabase.from("brands").select("*").eq("is_active", true).limit(8),
        supabase.from("categories").select("*").eq("is_active", true).limit(8),
      ]);
      setProducts(pRes.data ?? []);
      setBrands(bRes.data ?? []);
      setCategories(cRes.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <CategoryBar categories={categories} />
          <HeroCarousel />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Top picks for you</h2>
          <Link href="/products" className="text-sm text-emerald-600">View all</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border rounded p-4 animate-pulse h-72" />
              ))
            : products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 py-8 bg-slate-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Brands</h2>
          <Link href="/brands" className="text-sm text-emerald-600">View all</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((b) => (
            <Link key={b.id} href={`/brands/${b.slug}`} className="p-4 bg-white rounded shadow flex items-center justify-center">
              {b.logo_url ? <img src={b.logo_url} alt={b.name} className="h-12 object-contain" /> : <span>{b.name}</span>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
