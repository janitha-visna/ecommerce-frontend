"use client";

import { useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import FilterMenu from "@/app/components/FilterMenu";
import Pagination from "@/app/components/Pagination";
import { PRODUCTS } from "@/app/lib/prodcuts";


export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // Get available subcategories based on selected category
  const availableSubCategories = Array.from(
    new Set(
      PRODUCTS.filter((p) =>
        selectedCategory ? p.category === selectedCategory : true
      )
        .map((p) => p.subCategory)
        .filter((sub): sub is string => !!sub)
    )
  ).sort();

  // Filter logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === null || product.category === selectedCategory;
    const matchesSubCategory =
      selectedSubCategory === null ||
      product.subCategory === selectedSubCategory;
    return matchesCategory && matchesSubCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setCurrentPage(1);
  };

  const handleSubCategoryChange = (subCategory: string | null) => {
    setSelectedSubCategory(subCategory);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <FilterMenu
          categories={["Men", "Women", "Kids", "Accessories"]}
          subCategories={availableSubCategories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSelectCategory={handleCategoryChange}
          onSelectSubCategory={handleSubCategoryChange}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl">
              <p className="text-slate-500">
                No products found in this category.
              </p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
}
