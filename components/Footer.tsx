// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold mb-2">About</h4>
          <p className="text-sm text-gray-600">KitchenKettles — premium kitchen products.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Help</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Returns</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Shop</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Cookware</li>
            <li>Kettles</li>
            <li>Accessories</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Follow</h4>
          <div className="text-sm text-gray-600">Facebook • Instagram • YouTube</div>
        </div>
      </div>
    </footer>
  );
}
