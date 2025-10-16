"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, loading, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { profile } = useAuth();
  const router = useRouter();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Please log in</h2>
            <p className="text-slate-600 mb-6">You need to be logged in to view your cart</p>
            <Button onClick={() => router.push('/login')}>Log In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-slate-600 mb-6">Add some products to get started</p>
            <Button asChild>
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
          <p className="text-slate-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = item.product as Product;
                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden">
                          {product?.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingCart className="h-8 w-8 text-slate-300" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${product?.slug}`}
                            className="font-semibold text-lg hover:text-emerald-600 transition-colors line-clamp-2"
                          >
                            {product?.name}
                          </Link>
                          {product?.brand && (
                            <p className="text-sm text-slate-500 mt-1">{product.brand.name}</p>
                          )}
                          <p className="text-xl font-bold text-slate-900 mt-2">
                            ${product?.price}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>

                          <div className="flex items-center gap-2 border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= (product?.quantity || 0)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <p className="text-sm font-semibold">
                            Total: ${((product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Shipping</span>
                      <span className="font-semibold">
                        {cartTotal >= 50 ? 'Free' : '$10.00'}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-emerald-600">
                          ${(cartTotal + (cartTotal >= 50 ? 0 : 10)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {cartTotal < 50 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 text-sm text-emerald-800">
                      Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                    </div>
                  )}

                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button variant="outline" className="w-full mt-2" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
