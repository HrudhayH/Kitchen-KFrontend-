// app/products/[slug]/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = { params: { slug: string } };

export default async function ProductPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  if (!params?.slug) return <div>Invalid product URL</div>;
console.log(params)
  const { data: product, error } = await supabase
    .from("products")
    .select("*, brands(*), categories(*)")
    .eq("slug", params.slug.replace(/%20/g, " "))
    .single();

  if (error || !product) return <div>Product not found</div>;
  

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded shadow">
      {/* LEFT: Product Image */}
      <div className="flex flex-col items-center">
        <img
          src={product.images || "/placeholder.png"}
          alt={product.name}
          className="w-80 h-80 object-contain border rounded p-4"
        />
        <div className="mt-4 flex gap-4">
          <button className="bg-orange-500 text-white px-6 py-2 rounded font-medium">
            Buy Now
          </button>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded font-medium">
            Add to Cart
          </button>
        </div>
      </div>

      {/* RIGHT: Product Details */}
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">Brand: {product.brands?.name}</p>
        <p className="text-gray-600">Category: {product.categories?.name}</p>

        <p className="text-3xl font-bold text-green-600 mt-4">
          ₹ {product.price}
        </p>

        <div className="mt-4">
          <h2 className="font-semibold text-lg">Product Description</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-lg">Specifications</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Brand: {product.brands?.name}</li>
            <li>Category: {product.categories?.name}</li>
            <li>Price: ₹{product.price}</li>
            <li>Available: {product.is_active ? "In Stock" : "Out of Stock"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
