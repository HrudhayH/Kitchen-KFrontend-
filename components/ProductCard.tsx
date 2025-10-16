// components/ProductCard.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image_url?: string;
    rating?: number;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <div
      className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
      onClick={() => router.push(`/products/${product.slug}`)}
    >
      <div className="flex justify-center">
        <img
          src={product.image_url || "/no-image.jpg"}
          alt={product.name}
          className="h-40 object-contain"
        />
      </div>

      <h2 className="mt-2 font-semibold text-gray-800">{product.name}</h2>

      <p className="text-lg font-bold mt-1">₹{product.price}</p>

      <div className="text-sm text-green-600 mt-1">
        ⭐ {product.rating || "4.2"} / 5
      </div>

      <button
        className="mt-2 text-blue-600 text-sm hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          alert("Wishlist feature coming soon!");
        }}
      >
        ❤️ Wishlist
      </button>
    </div>
  );
}
