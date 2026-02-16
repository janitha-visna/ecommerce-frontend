"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { user } = useAuth();
  const pathname = usePathname();

  // ✅ Fetch cart count using js-cookie token
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          setCartItemsCount(0);
          return;
        }

        const res = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await res.json();

        // ✅ Calculate total quantity
        const totalQuantity = data.CartItems
          ? data.CartItems.reduce(
              (acc: number, item: any) => acc + item.quantity,
              0
            )
          : 0;

        setCartItemsCount(totalQuantity);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartItemsCount(0);
      }
    };

    fetchCartCount();
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collection", label: "Collection" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PREWAVE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium ${
                  pathname === link.href
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-black hover:text-blue-600"
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <Link
                href="/profile"
                className="text-black hover:text-blue-600 font-medium"
              >
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

            {/* 🛒 Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />

              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
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
            {navLinks.map((link) => (
              <MobileLink
                key={link.href}
                href={link.href}
                isActive={pathname === link.href}
                setIsMenuOpen={setIsMenuOpen}
              >
                {link.label}
              </MobileLink>
            ))}

            <MobileLink
              href="/cart"
              isActive={pathname === "/cart"}
              setIsMenuOpen={setIsMenuOpen}
            >
              Cart ({cartItemsCount})
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

/* Mobile Link Component */
const MobileLink = ({
  href,
  children,
  setIsMenuOpen,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  setIsMenuOpen: (value: boolean) => void;
  isActive?: boolean;
}) => (
  <Link
    href={href}
    onClick={() => setIsMenuOpen(false)}
    className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
    }`}
  >
    {children}
  </Link>
);
