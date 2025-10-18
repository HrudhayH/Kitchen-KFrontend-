// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders"; // if you have one
import { SupabaseCartProvider } from "@/components/SupabaseCartContext";

export const metadata = {
  title: "KitchenKettles",
  description: "Kitchen products and more",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <SupabaseCartProvider>
            <Navbar logo="/LOGO_PATH" />
            <main className="min-h-screen bg-gray-50">{children}</main>
            <Footer />
          </SupabaseCartProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
