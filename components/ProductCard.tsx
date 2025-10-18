// components/ProductCard.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./SupabaseCartContext";

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
  const { addItem } = useCart();

  return (
    <div className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition flex flex-col">
      <div onClick={() => router.push(`/products/${product.slug}`)} className="flex-1">
        <div className="flex justify-center">
          <img
            src={product.image_url || "/no-image.jpg"}
            alt={product.name}
            className="h-40 object-contain"
          />
        </div>

        <h2 className="mt-2 font-semibold text-gray-800">{product.name}</h2>

        <p className="text-lg font-bold mt-1">₹{product.price}</p>

        <div className="text-sm text-green-600 mt-1">⭐ {product.rating ?? "4.2"}</div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await addItem({ id: product.id, name: product.name, price: product.price, image_url: product.image_url }, 1);
          }}
          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/${product.slug}`);
          }}
          className="px-3 py-2 border rounded"
        >
          View
        </button>
      </div>
    </div>
  );
}
