// app/brands/[slug]/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProductList from "@/components/Products"; // grid display component

type Props = { params: { slug: string } };

export default async function BrandPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  if (!params?.slug) return <div>Invalid brand URL</div>;

  // Fetch brand
  const { data: brand, error: brandError } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", params.slug.replace(/%20/g, " "))
    .single();

  if (brandError || !brand) return <div>Brand not found</div>;

  // Fetch products of this brand
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("brand_id", brand.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (productsError) return <div>Failed to load products</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      {/* TOP: Brand Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        {brand.logo_url && (
          <img
            src={brand.logo_url}
            alt={brand.name}
            className="w-40 h-40 object-contain border rounded p-4"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{brand.name}</h1>
          {brand.description && (
            <p className="text-gray-700 mt-2">{brand.description}</p>
          )}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Products by {brand.name}</h2>
        <ProductList products={products || []} />
      </div>
    </div>
  );
}
