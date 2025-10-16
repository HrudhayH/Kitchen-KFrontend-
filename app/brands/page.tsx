"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, Brand } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Shop by Brand</h1>
          <p className="text-slate-600">Explore products from our trusted brand partners</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <Card key={i} className="animate-pulse h-32" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {brands.map((brand) => (
                <Link key={brand.id} href={`/brands/${brand.slug}`}>  
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-32 flex items-center justify-center">
                    <CardContent className="p-4 text-center">
                      {brand.logo_url ? (
                        <img
                          src={brand.logo_url}
                          alt={brand.name}
                          className="h-12 mx-auto object-contain mb-2"
                        />
                      ) : (
                        <div className="h-12 flex items-center justify-center mb-2">
                          <Package className="h-8 w-8 text-slate-400" />
                        </div>
                      )}
                      <p className="font-medium text-sm">{brand.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
