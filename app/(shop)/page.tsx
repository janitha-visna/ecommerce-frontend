"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

// Import products from separate file
import { Product } from "../lib/prodcuts";

export default function HomePage() {
  // Show latest 8 products
  //const latestProducts = PRODUCTS.slice(-8).reverse();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Store</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Discover the latest fashion, accessories, and lifestyle products!
          </p>
          <Link
            href="/collection"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition"
          >
            Browse Collections
          </Link>
        </div>
        {/* Hero Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1521335629791-ce4aec67ddc9?auto=format&fit=crop&w=1400&q=80"
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      </section>

      {/* Latest Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1">
        <h2 className="text-3xl font-semibold mb-10 text-center text-black">
          Latest Collection
        </h2>
        
      </section>
    </div>
  );
}
