"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function ProductForm() {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
        alert("Product added successfully! (Demo)");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Image Upload */}
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Product Image
                    </label>
                    <div className="relative group">
                        <div className={`
              relative flex flex-col items-center justify-center w-full h-[300px] 
              border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden
              ${imagePreview ? 'border-blue-500 bg-slate-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
            `}>
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setImagePreview(null)}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-10 h-10 text-slate-400 mb-3 group-hover:scale-110 transition-transform duration-200" />
                                    <p className="text-sm text-slate-500 font-medium">Click to upload image</p>
                                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                                </>
                            )}
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                                accept="image/*"
                                required={!imagePreview}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                            placeholder="e.g. Premium Cotton T-Shirt"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Description
                        </label>
                        <textarea
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 resize-none text-slate-900"
                            placeholder="Describe your product..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Category
                            </label>
                            <select
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white text-slate-900"
                            >
                                <option value="">Select...</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Sub Category
                            </label>
                            <select
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white text-slate-900"
                            >
                                <option value="">Select...</option>
                                <option value="topwear">Topwear</option>
                                <option value="bottomwear">Bottomwear</option>
                                <option value="footwear">Footwear</option>
                                <option value="innerwear">Innerwear</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                            <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Width - Sizes */}
            <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Available Sizes
                </label>
                <div className="flex flex-wrap gap-3">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <label key={size} className="cursor-pointer group">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="
                w-12 h-12 flex items-center justify-center rounded-lg border-2 border-slate-200 
                font-medium text-slate-600 transition-all duration-200
                peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600
                group-hover:border-blue-300
              ">
                                {size}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-slate-100">
                <button
                    type="submit"
                    disabled={loading}
                    className={`
            px-8 py-3 rounded-xl font-bold text-white transition-all duration-200
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 active:scale-95'}
          `}
                >
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
            </div>
        </form>
    );
}
