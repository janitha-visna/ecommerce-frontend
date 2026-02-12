import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import ProductImage from "./ProductImage"; // 👈 new import

export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
          <ProductImage
            productId={product.id}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Quick Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
            <button className="bg-white/90 backdrop-blur shadow-lg text-slate-900 px-6 py-2 rounded-full font-medium text-sm hover:bg-blue-600 hover:text-white transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
            {product.category}
            {product.subCategory && (
              <span className="text-slate-400 font-normal normal-case ml-1">
                • {product.subCategory}
              </span>
            )}
          </p>
          <h3 className="font-semibold text-slate-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ShoppingCart size={16} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
