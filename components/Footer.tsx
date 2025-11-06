"use client";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Main Footer Section */}
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 py-12 relative border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 - Quick Links */}
          <div>
            <h2 className="text-lg font-semibold tracking-widest mb-4 border-b-2 border-rose-600 inline-block pb-1">
              KITCHEN KETTLES
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-rose-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-rose-600 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/brand" className="hover:text-rose-600 transition">
                  Brand
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rose-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-rose-600 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions" // ✅ Correct path format
                  className="hover:text-rose-600 transition"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-rose-600 transition"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Address */}
          <div>
            <h2 className="text-lg font-semibold tracking-widest mb-4 border-b-2 border-rose-600 inline-block pb-1">
              ADDRESS
            </h2>
            <p className="text-sm leading-relaxed">
              Ground Floor & First Floor, No. 305, Shop No. 9, <br />
              Varthur Main Road, Opp. Shani Mahatma Temple, <br />
              Gunjur, Bengaluru – 560087
            </p>
          </div>

          {/* Column 3 - Contact + Socials */}
          <div>
            <h2 className="text-lg font-semibold tracking-widest mb-4 border-b-2 border-rose-600 inline-block pb-1">
              CONNECT WITH US
            </h2>

            <div className="text-sm mb-4 space-y-2">
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-rose-600" />{" "}
                <a
                  href="tel:+918989889880"
                  className="hover:text-rose-600 transition"
                >
                  +91 8989889880
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-rose-600" />{" "}
                <a
                  href="mailto:saleskitchenkettles@gmail.com"
                  className="hover:text-rose-600 transition"
                >
                  saleskitchenkettles@gmail.com
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-3">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 bg-white border border-gray-200 rounded-full hover:bg-rose-600 hover:text-white transition"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 bg-white border border-gray-200 rounded-full hover:bg-rose-600 hover:text-white transition"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-800">Kitchen Kettles</span> |
          Designed & Developed by{" "}
          <span className="text-rose-600 font-medium hover:underline">
            IT Alliance
          </span>
        </div>
      </footer>

      {/* Floating WhatsApp and Call Buttons */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">
        {/* WhatsApp */}
        <a
          href="https://wa.me/918989889880"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition transform hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Call */}
        <a
          href="tel:+918989889880"
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-full p-4 shadow-lg transition transform hover:scale-110"
          aria-label="Call Now"
        >
          <FaPhoneAlt className="text-2xl" />
        </a>
      </div>
    </>
  );
}
