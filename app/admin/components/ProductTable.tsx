"use client";

import { useEffect, useState } from "react";
import { Trash2, MoreVertical } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  stock: number;
  sizes: string;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const apiBase = "http://localhost:5000"; // your API server

  // Fetch products from API
  const fetchProducts = async () => {
    const token = Cookies.get("token"); // get JWT token from cookies
    if (!token) {
      toast.error("You are not logged in");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/products?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      setProducts(data.products); // keep products as returned by API
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id: number) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${apiBase}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-end text-xs font-bold text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
                      <Image
                        src={`${apiBase}/api/products/${product.id}/image`}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized // important for localhost API images
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500 md:hidden">
                        {product.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    {product.category}
                  </span>
                  <span className="ml-2 text-xs text-slate-400">
                    {product.subCategory}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900">
                    Rs{product.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-end">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg md:hidden"
                      title="More"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
        <p>
          Showing <strong>1</strong> to <strong>{products.length}</strong> of{" "}
          <strong>{products.length} results</strong>
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="px-3 py-1 rounded-md border border-slate-300 opacity-50 cursor-not-allowed"
          >
            Previous
          </button>
          <button
            disabled
            className="px-3 py-1 rounded-md border border-slate-300 opacity-50 cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
