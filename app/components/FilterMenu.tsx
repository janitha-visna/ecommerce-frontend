"use client";

import { Filter, Layers } from "lucide-react";

interface FilterMenuProps {
    categories: string[];
    subCategories: string[];
    categoryCounts: Record<string, number>;
    subCategoryCounts: Record<string, number>;
    totalCount: number;
    selectedCategory: string | null;
    selectedSubCategory: string | null;
    onSelectCategory: (category: string | null) => void;
    onSelectSubCategory: (subCategory: string | null) => void;
}

export default function FilterMenu({
    categories,
    subCategories,
    categoryCounts,
    subCategoryCounts,
    totalCount,
    selectedCategory,
    selectedSubCategory,
    onSelectCategory,
    onSelectSubCategory,
}: FilterMenuProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
            {/* Category Filter */}
            <div>
                <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold">
                    <Filter size={20} />
                    <span>Filter by Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onSelectCategory(null)}
                        className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${selectedCategory === null
                                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
              `}
                    >
                        <span>All Categories</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === null ? 'bg-white/20' : 'bg-slate-200'}`}>
                            {totalCount}
                        </span>
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${selectedCategory === category
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                `}
                        >
                            <span>{category}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === category ? 'bg-white/20' : 'bg-slate-200'}`}>
                                {categoryCounts[category] || 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sub-Category Filter (Only show if there are subcategories available) */}
            {subCategories.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold border-t border-slate-100 pt-6">
                        <Layers size={20} />
                        <span>Filter by Sub-Category</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => onSelectSubCategory(null)}
                            className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${selectedSubCategory === null
                                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                `}
                        >
                            <span>All Sub-Categories</span>
                            {/* For sub-categories, the "All" count is the count of the selected category or total */}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedSubCategory === null ? 'bg-white/20' : 'bg-slate-200'}`}>
                                {selectedCategory ? categoryCounts[selectedCategory] : totalCount}
                            </span>
                        </button>
                        {subCategories.map((sub) => (
                            <button
                                key={sub}
                                onClick={() => onSelectSubCategory(sub)}
                                className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${selectedSubCategory === sub
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                  `}
                            >
                                <span>{sub}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedSubCategory === sub ? 'bg-white/20' : 'bg-slate-200'}`}>
                                    {subCategoryCounts[sub] || 0}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
