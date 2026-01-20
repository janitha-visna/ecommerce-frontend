"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Minus, Plus, ShoppingCart, Star, Share2, Heart } from "lucide-react";
import { useCart } from "../../../context/CartContext";

// In a real app, this would be fetched from API
const PRODUCTS = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "Men",
        subCategory: "Topwear",
        price: 29.99,
        description: "Experience ultimate comfort with our premium cotton t-shirt. Breathable fabric, perfect fit, and durable stitching make it your go-to choice for everyday wear. Available in multiple colors to suit your style.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    },
    {
        id: 2,
        name: "Summer Floral Dress",
        category: "Women",
        subCategory: "Dresses",
        price: 59.99,
        description: "Embrace the summer vibes with this beautiful floral dress. Lightweight and airy, it features a flattering cut and vibrant print that's perfect for casual outings or beach parties.",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    },
    // Add other products as needed matching the IDs used in Home
    {
        id: 3,
        name: "Denim Jeans Slim Fit",
        category: "Men",
        subCategory: "Bottomwear",
        price: 79.99,
        description: "Classic blue denim jeans with a modern slim fit cut. Durable, stylish, and versatile enough for any occasion.",
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=1000&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    },
    {
        id: 4,
        name: "Kids Colorful Hoodie",
        category: "Kids",
        subCategory: "Topwear",
        price: 34.99,
        description: "Keep your little ones warm and stylish with this colorful hoodie. Soft fleece lining ensures comfort while playing.",
        image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=1000&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    },
    {
        id: 5,
        name: "Leather Boots",
        category: "Accessories",
        subCategory: "Footwear",
        price: 129.99,
        description: "Premium leather boots that combine rugged durability with urban style. Water-resistant and built to last.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    },
];

export default function ProductDetailsPage() {
    const params = useParams();
    const id = Number(params.id);
    const product = PRODUCTS.find((p) => p.id === id);

    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-slate-800">Product not found</h2>
                <p className="text-slate-500 mt-2">The product you are looking for does not exist.</p>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            size: selectedSize,
        });
        alert("Added to cart!");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column - Image */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden shadow-sm">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Right Column - Info */}
                <div className="flex flex-col">
                    <div className="mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide">
                                {product.category}
                            </span>
                            {product.subCategory && (
                                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide ml-2">
                                    {product.subCategory}
                                </span>
                            )}
                            <div className="flex gap-4">
                                <button className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                    <Heart size={20} />
                                </button>
                                <button className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-slate-900">
                                ${product.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="fill-current w-5 h-5" />
                                <span className="text-slate-700 font-medium ml-1">4.8</span>
                                <span className="text-slate-400 text-sm ml-1">(120 reviews)</span>
                            </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-8 mt-auto">
                        {/* Sizes */}
                        <div>
                            <div className="flex justify-between mb-3">
                                <span className="font-semibold text-slate-900">Select Size</span>
                                <button className="text-sm text-blue-600 hover:underline">Size Guide</button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {["S", "M", "L", "XL", "XXL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`
                      w-12 h-12 rounded-lg border-2 font-medium transition-all duration-200
                      ${selectedSize === size
                                                ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                                : "border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"}
                    `}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                            <div className="flex items-center border-2 border-slate-200 rounded-xl w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 text-slate-500 hover:text-blue-600 transition-colors"
                                >
                                    <Minus size={20} />
                                </button>
                                <div className="w-12 text-center font-bold text-slate-900 text-lg">
                                    {quantity}
                                </div>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 text-slate-500 hover:text-blue-600 transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-slate-900 text-white h-14 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-slate-900/20 active:scale-95"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
