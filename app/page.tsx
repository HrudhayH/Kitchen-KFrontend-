"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase, Product, Brand, Category } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingCart, Star, TrendingUp, Package, Shield, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, brandsRes, categoriesRes] = await Promise.all([
        supabase
          .from('products')
          .select('*, brand:brands(*), category:categories(*)')
          .eq('is_active', true)
          .limit(8),
        supabase
          .from('brands')
          .select('*')
          .eq('is_active', true)
          .limit(6),
        supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .limit(6)
      ]);

      setProducts(productsRes.data || []);
      setBrands(brandsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Premium Kitchen Utensils for Every Home Chef
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Discover quality cookware, kettles, and kitchen tools from the world&apos;s leading brands.
              Elevate your cooking experience with our curated collection.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/brands">Browse Brands</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Truck className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Free Shipping</h3>
                <p className="text-slate-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure Payment</h3>
                <p className="text-slate-600">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Quality Products</h3>
                <p className="text-slate-600">Only the best brands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Products</h2>
              <p className="text-slate-600">Handpicked selections for your kitchen</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-slate-200" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-slate-200 rounded mb-2" />
                    <div className="h-4 bg-slate-200 rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-16 w-16 text-slate-300" />
                        </div>
                      )}
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          Sale
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <CardHeader className="pb-3">
                    <Link href={`/products/${product.slug}`}>
                      <CardTitle className="text-base line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </CardTitle>
                    </Link>
                    {product.brand && (
                      <p className="text-sm text-slate-500">{product.brand.name}</p>
                    )}
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-slate-900">
                        ${product.price}
                      </span>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <span className="text-sm text-slate-500 line-through">
                          ${product.compare_at_price}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.quantity === 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Shop by Brand</h2>
              <p className="text-slate-600">Explore products from top brands</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/brands">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

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
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Shop by Category</h2>
              <p className="text-slate-600">Find exactly what you need</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/categories">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
                  <div className="relative h-40 bg-gradient-to-br from-emerald-100 to-teal-100">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-16 w-16 text-emerald-300" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </CardTitle>
                    {category.description && (
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
