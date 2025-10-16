import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProductList from "../../../components/Products";
import { Product } from "@/lib/supabase"; // ✅ use your existing Product type

type Props = { params: { slug: string } };

export default async function CategoryPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { slug } = params;

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      images,
      slug,
      category:categories (
        id,
        name,
        slug,
        image_url
      )
    `)
    .eq("category.slug", slug);

  if (error) {
    console.error("Supabase error:", error);
    return <p>Failed to load products.</p>;
  }

  if (!data || data.length === 0) {
    return <p>No products found in this category.</p>;
  }

  // Map products so UI gets clean structure
  const formatted = data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    slug: item.slug,
    image_url: item.images?? item.category?.images ?? "",
    category_name: item.category?.name ?? "",
  }));
    console.log(data)
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        Products in "{slug}" category
      </h1>
      <ProductList products={formatted} />
    </div>
  );
}