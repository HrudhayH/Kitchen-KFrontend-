"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChartBar as BarChart3, Package, ShoppingCart, Users, Tag, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const { profile } = useAuth();
  const router = useRouter();

  if (!profile) {
    router.push('/login');
    return null;
  }

  if (profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-slate-600 mb-6">You don't have permission to access this page</p>
            <Button onClick={() => router.push('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    { title: 'Total Products', value: '0', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Orders', value: '0', icon: ShoppingCart, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Total Users', value: '0', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'Revenue', value: '$0', icon: TrendingUp, color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage your e-commerce platform</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                  Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Manage your product catalog</p>
                <Button className="w-full">Manage Products</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-emerald-600" />
                  Brands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Add and edit product brands</p>
                <Button className="w-full">Manage Brands</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Organize product categories</p>
                <Button className="w-full">Manage Categories</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-emerald-600" />
                  Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">View and manage customer orders</p>
                <Button className="w-full">Manage Orders</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-emerald-600" />
                  Offers & Discounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Create and manage special offers</p>
                <Button className="w-full">Manage Offers</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">View detailed statistics and reports</p>
                <Button className="w-full">View Analytics</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
