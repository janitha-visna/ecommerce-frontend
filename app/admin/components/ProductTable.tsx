"use client";

import { Trash2, Edit2, MoreVertical } from "lucide-react";
import Image from "next/image";

// Dummy data
const PRODUCTS = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "Men",
        subCategory: "Topwear",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 2,
        name: "Summer Floral Dress",
        category: "Women",
        subCategory: "Topwear",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 3,
        name: "Denim Jeans Slim Fit",
        category: "Men",
        subCategory: "Bottomwear",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 4,
        name: "Kids Colorful Hoodie",
        category: "Kids",
        subCategory: "Topwear",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
        id: 5,
        name: "Leather Boots",
        category: "Accessories",
        subCategory: "Footwear",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
];

export default function ProductTable() {
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            console.log("Delete product", id);
            // Implement delete logic here
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-end text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {PRODUCTS.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{product.name}</p>
                                            <p className="text-xs text-slate-500 md:hidden">{product.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                        {product.category}
                                    </span>
                                    <span className="ml-2 text-xs text-slate-400">{product.subCategory}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-slate-900">${product.price.toFixed(2)}</span>
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
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors md:hidden"
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
                <p>Showing <strong>1</strong> to <strong>{PRODUCTS.length}</strong> of <strong>{PRODUCTS.length} results</strong></p>
                <div className="flex gap-2">
                    <button disabled className="px-3 py-1 rounded-md border border-slate-300 opacity-50 cursor-not-allowed">Previous</button>
                    <button disabled className="px-3 py-1 rounded-md border border-slate-300 opacity-50 cursor-not-allowed">Next</button>
                </div>
            </div>
        </div>
    );
}
