// components/CategoryBar.tsx
import Link from "next/link";

export default function CategoryBar({ categories = [] }: { categories: any[] }) {
  // categories: [{ id, name, slug, image_url }]
  const items = categories.length ? categories : [
    { id: "c1", name: "Mobiles", slug: "mobiles", image_url: "/icons/mobile.png" },
    { id: "c2", name: "Kitchen", slug: "kitchen", image_url: "/icons/home.png" },
    { id: "c3", name: "Appliances", slug: "appliances", image_url: "/icons/tv.png" },
    { id: "c4", name: "Furniture", slug: "furniture", image_url: "/icons/furniture.png" },
  ];

  return (
    <div className="py-4 bg-white shadow-sm">
      <div className="flex gap-6 items-center overflow-x-auto no-scrollbar px-4">
        {items.map((c) => (
          <Link
            key={c.id}
            href={`/categories/${c.slug}`}
            className="flex flex-col items-center text-sm min-w-[110px]"
          >
            <div className="bg-gray-100 hover:bg-gray-200 transition rounded-xl p-4 shadow-md w-20 h-20 flex items-center justify-center">
              <img src={c.image_url} alt={c.name} className="w-12 h-12 object-contain" />
            </div>
            <span className="mt-2 font-medium text-gray-800 truncate w-24 text-center">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
