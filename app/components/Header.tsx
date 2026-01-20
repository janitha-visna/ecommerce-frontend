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
                        <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            Home
                        </Link>

                        <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            About Us
                        </Link>

                        {user ? (
                            <Link href="/profile" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                Hi, {user.name.split(" ")[0]}
                            </Link>
                        ) : (
                            <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                                Login
                            </Link>
                        )}
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        <Link href="/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors group">
                            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in duration-200">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            className="md:hidden p-2 text-slate-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1 px-4 py-4">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            href="/about"
                            className="block px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/cart"
                            className="block px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cart ({cartCount})
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
