"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterMenu from "../components/FilterMenu";
import Pagination from "../components/Pagination";

// Expanded Mock Data
const PRODUCTS = [
    { id: 1, name: "Classic Cotton T-Shirt", category: "Men", subCategory: "Topwear", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60" },
    { id: 2, name: "Summer Floral Dress", category: "Women", subCategory: "Dresses", price: 59.99, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop&q=60" },
    { id: 3, name: "Denim Jeans Slim Fit", category: "Men", subCategory: "Bottomwear", price: 79.99, image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500&auto=format&fit=crop&q=60" },
    { id: 4, name: "Kids Colorful Hoodie", category: "Kids", subCategory: "Topwear", price: 34.99, image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=500&auto=format&fit=crop&q=60" },
    { id: 5, name: "Leather Boots", category: "Accessories", subCategory: "Footwear", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
    { id: 6, name: "Summer Hat", category: "Accessories", subCategory: "Headwear", price: 24.99, image: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=500&auto=format&fit=crop&q=60" },
    { id: 7, name: "Striped Sweater", category: "Women", subCategory: "Topwear", price: 49.99, image: "https://images.unsplash.com/photo-1620799140408-ed5341cdb4b6?w=500&auto=format&fit=crop&q=60" },
    { id: 8, name: "Running Shoes", category: "Men", subCategory: "Footwear", price: 89.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
    { id: 9, name: "Designer Sunglasses", category: "Accessories", subCategory: "Eyewear", price: 159.99, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60" },
    { id: 10, name: "Basic White Tee", category: "Men", subCategory: "Topwear", price: 19.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60" },
    { id: 11, name: "Floral Skirt", category: "Women", subCategory: "Bottomwear", price: 39.99, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop&q=60" },
    { id: 12, name: "Kids Denim Jacket", category: "Kids", subCategory: "Topwear", price: 44.99, image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=500&auto=format&fit=crop&q=60" },
    { id: 13, name: "Leather Wallet", category: "Accessories", subCategory: "Bags", price: 49.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
    { id: 14, name: "Winter Scarf", category: "Accessories", subCategory: "Scarves", price: 29.99, image: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=500&auto=format&fit=crop&q=60" },
    { id: 15, name: "Formal Shirt", category: "Men", subCategory: "Topwear", price: 59.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60" },
];

const ITEMS_PER_PAGE = 8; // Adjust to 10 as requested, but 8 looks better in 4-col grid. User asked for 10. Let's do 8 first as it fits grid better, or 12. 10 is odd for grid. I will stick to 8 (2 rows) or 12. User asked for 10. I'll use 10.

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Get available subcategories based on selected category
    const availableSubCategories = Array.from(
        new Set(
            PRODUCTS
                .filter((p) => selectedCategory ? p.category === selectedCategory : true)
                .map((p) => p.subCategory)
                .filter((sub): sub is string => !!sub)
        )
    ).sort();

    // Filter logic
    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesCategory = selectedCategory === null || product.category === selectedCategory;
        const matchesSubCategory = selectedSubCategory === null || product.subCategory === selectedSubCategory;

        return matchesCategory && matchesSubCategory;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / 10);
    const startIndex = (currentPage - 1) * 10;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + 10);

    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
        setSelectedSubCategory(null); // Reset sub-category when main category changes
        setCurrentPage(1);
    };

    const handleSubCategoryChange = (subCategory: string | null) => {
        setSelectedSubCategory(subCategory);
        setCurrentPage(1);
    };

    // Calculate Counts
    const categoryCounts = PRODUCTS.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const subCategoryCounts = PRODUCTS
        .filter(p => !selectedCategory || p.category === selectedCategory)
        .reduce((acc, p) => {
            if (p.subCategory) {
                acc[p.subCategory] = (acc[p.subCategory] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


            {/* Main Content */}
            <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                </div>

                <FilterMenu
                    categories={["Men", "Women", "Kids", "Accessories"]}
                    subCategories={availableSubCategories}
                    categoryCounts={categoryCounts}
                    subCategoryCounts={subCategoryCounts}
                    totalCount={PRODUCTS.length}
                    selectedCategory={selectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    onSelectCategory={handleCategoryChange}
                    onSelectSubCategory={handleSubCategoryChange}
                />

                {currentProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500">No products found in this category.</p>
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </section>
        </div>
    );
}
