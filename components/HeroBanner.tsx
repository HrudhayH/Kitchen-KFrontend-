"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function HeroBanner() {
  const [banner, setBanner] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchBanner = async () => {
      const { data } = await supabase
        .from("banners")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setBanner(data);
    };
    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <div className="w-full h-[350px] md:h-[450px] relative">
      <img
        src={banner.image_url}
        alt="Hero Banner"
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
        <h1 className="text-3xl md:text-5xl font-bold">{banner.title}</h1>
        <p className="mt-2 text-lg">{banner.subtitle}</p>
      </div>
    </div>
  );
}
