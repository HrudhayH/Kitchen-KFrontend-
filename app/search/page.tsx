// app/search/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProductList from "@/components/Products";

type Props = { searchParams?: { q?: string } };

export default async function SearchPage({ searchParams }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const q = (searchParams?.q || "").trim();

  if (!q) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <p className="text-gray-600">Type something in the search box.</p>
      </div>
    );
  }

  // Simple text search (adjust columns to your schema)
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, price, slug, image_url")
    .ilike("name", `%${q}%`)
    .limit(50);

  if (error) {
    console.error(error);
    return <div className="p-6">Search failed</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search results for “{q}”</h1>
      <ProductList products={products || []} />
    </div>
  );
}
