"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import FilterMenu from "@/app/components/FilterMenu";
import Pagination from "@/app/components/Pagination";

const ITEMS_PER_PAGE = 10;
const API_URL = "http://localhost:5000/api/products";

export default function CollectionPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSubCategory, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    params.append("limit", ITEMS_PER_PAGE.toString());

    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedSubCategory) params.append("subCategory", selectedSubCategory);

    const res = await fetch(`${API_URL}?${params.toString()}`);
    const data = await res.json();

    setProducts(data.products);
    setTotalPages(data.totalPages); 
    setLoading(false);
  };
  

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="flex flex-col md:flex-row gap-10">
        <FilterMenu
          categories={["men", "women", "kids", "accessories"]}
          subCategories={["topwear", "bottomwear", "footwear", "innerwear"]}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSelectCategory={handleCategoryChange}
          onSelectSubCategory={handleSubCategoryChange}
        />

        <div className="flex-1">
          {loading ? (
            <p className="text-center py-20">Loading products...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                console.log("Product:", product); // <-- logs each product
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl">
              <p className="text-slate-500">
                No products found in this category.
              </p>
            </div>
          )}

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
