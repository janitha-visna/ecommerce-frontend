"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ShopBrand
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-black">
              Home
            </Link>

            <Link href="/collection" className="text-black">
              Collection
            </Link>

            <Link href="/about" className="text-black">
              About Us
            </Link>

            <Link href="/contact" className="text-black">
              Contact
            </Link>

            {user ? (
              <Link href="/profile" className="text-black">
                Hi, {user.name.split(" ")[0]}
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="space-y-1 px-4 py-4">
            <MobileLink href="/" setIsMenuOpen={setIsMenuOpen}>
              Home
            </MobileLink>

            <MobileLink href="/collection" setIsMenuOpen={setIsMenuOpen}>
              Collection
            </MobileLink>

            <MobileLink href="/about" setIsMenuOpen={setIsMenuOpen}>
              About Us
            </MobileLink>

            <MobileLink href="/contact" setIsMenuOpen={setIsMenuOpen}>
              Contact
            </MobileLink>

            <MobileLink href="/cart" setIsMenuOpen={setIsMenuOpen}>
              Cart ({cartCount})
            </MobileLink>

            {!user && (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-3 text-center px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* Reusable styles */
const MobileLink = ({
  href,
  children,
  setIsMenuOpen,
}: {
  href: string;
  children: React.ReactNode;
  setIsMenuOpen: (value: boolean) => void;
}) => (
  <Link
    href={href}
    onClick={() => setIsMenuOpen(false)}
    className="block px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-medium"
  >
    {children}
  </Link>
);
