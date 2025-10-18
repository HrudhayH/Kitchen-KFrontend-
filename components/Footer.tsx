// components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold mb-2">About</h3>
          <p className="text-sm text-gray-600">KitchenKettles — quality kitchen products and more.</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Help</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Returns</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Shop</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Kitchen Appliances</li>
            <li>Cookware</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Follow</h3>
          <div className="flex gap-3">
            <a className="text-sm text-gray-600">Facebook</a>
            <a className="text-sm text-gray-600">Instagram</a>
            <a className="text-sm text-gray-600">YouTube</a>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 text-sm text-gray-600 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between">
          <div>© {new Date().getFullYear()} KitchenKettles</div>
          <div>Terms • Privacy • Security</div>
        </div>
      </div>
    </footer>
  );
}
