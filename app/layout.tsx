// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import { SupabaseCartProvider } from "@/components/SupabaseCartContext";
import { ToastProvider } from "@/components/ToastContext"; // ✅ Add this

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
            <ToastProvider> {/* ✅ Wrap App with ToastProvider */}
              <Navbar logo="/LOGO_PATH" />
              <main className="min-h-screen bg-gray-50">{children}</main>
              <Footer />
            </ToastProvider>
          </SupabaseCartProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
