"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import ProductImage from "./ProductImage";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  description: string;
  sizes: string; // "XS,S,M,L"
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sizeOptions = product.sizes.split(",");
  const selectedSize = sizeOptions[0];

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // 🚀 prevents Link redirect
    e.stopPropagation(); // 🚀 prevents parent click

    setLoading(true);
    const token = Cookies.get("token");

    if (!token) {
      toast.error("Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          size: selectedSize,
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      toast.success(`${product.name} added to cart 🛒`);
    } catch (err: any) {
      toast.error(err.message || "Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <ProductImage
            productId={product.id}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </Link>

        {/* Cart Icon */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition z-10"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      {/* Info Section */}
      <div className="p-5">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-slate-900 mb-2 truncate group-hover:text-blue-600 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* ✅ PRICE NOW CLEARLY VISIBLE */}
        <div className="mb-2">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="text-sm text-slate-600">
          Sizes: {sizeOptions.join(", ")}
        </div>
      </div>
    </div>
  );
  
  
}
