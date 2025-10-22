// components/HeroCarousel.tsx
import { useEffect, useState } from "react";

const slides = [
  { id: 1, title: "Big Bang Sale", subtitle: "Up to 70% off", image: "/banners/banner1.jpg" },
  { id: 2, title: "Exclusive Kettles", subtitle: "Best sellers", image: "/banners/banner2.jpg" },
  { id: 3, title: "Cookware Deals", subtitle: "Premium collections", image: "/banners/banner3.jpg" },
];

export default function HeroCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mt-4">
      <div className="h-64 md:h-96 rounded overflow-hidden bg-gray-100">
        {slides.map((s, i) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute left-8 top-1/3 text-white">
              <h2 className="text-3xl md:text-5xl font-bold">{s.title}</h2>
              <p className="mt-2 text-lg md:text-2xl">{s.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* indicators */}
      <div className="flex gap-2 justify-center mt-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full ${i === idx ? "bg-emerald-600" : "bg-gray-300"}`}></button>
        ))}
      </div>
    </div>
  );
}
