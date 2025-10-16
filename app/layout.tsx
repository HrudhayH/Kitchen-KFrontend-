import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kitchen Kettels - Premium Kitchen Utensils & Cookware',
  description: 'Discover quality kitchen utensils, cookware, and kettles from top brands. Shop by category or brand for the best kitchen essentials.',
  keywords: 'kitchen utensils, kettles, cookware, kitchen tools, kitchen accessories, brands',
  openGraph: {
    title: 'Kitchen Kettels - Premium Kitchen Utensils & Cookware',
    description: 'Discover quality kitchen utensils, cookware, and kettles from top brands.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
