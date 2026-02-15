"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomePage() {
  // Sample upcoming product images
  const upcomingProducts = [
    "/images/1.jpg",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1627481758827-bd4b5b2393f5?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1618354699726-2c4d9e7d42c7?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1618354699726-7a9e9bdfc7d0?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1627481758825-4b25bb1c3e6f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1606813902652-8d9d6f0c3c3b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1618354699726-3e5a9f4c1d2b?auto=format&fit=crop&w=400&q=80",
  ];

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {upcomingProducts.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={img}
                alt={`Upcoming product ${index + 1}`}
                className="w-full h-56 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
