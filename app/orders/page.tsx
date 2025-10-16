"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { profile } = useAuth();
  const router = useRouter();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Please log in</h2>
            <p className="text-slate-600 mb-6">You need to be logged in to view your orders</p>
            <Button onClick={() => router.push('/login')}>Log In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Orders</h1>
          <p className="text-slate-600">View and track your order history</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="pt-6 text-center py-16">
              <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
              <p className="text-slate-600 mb-6">Start shopping to see your orders here</p>
              <Button onClick={() => router.push('/products')}>Browse Products</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
