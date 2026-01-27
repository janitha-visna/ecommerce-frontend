"use client";

interface FilterMenuProps {
  categories: string[];
  subCategories: string[];
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onSelectSubCategory: (subCategory: string | null) => void;
}

export default function FilterMenu({
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
}: FilterMenuProps) {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="border border-slate-200 rounded-xl p-6 bg-white">
        {/* Title */}
        <h2 className="text-lg font-semibold tracking-wide mb-6 text-black">
          FILTERS
        </h2>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase mb-4 text-black">Categories</h3>

          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === category}
                  onChange={() =>
                    onSelectCategory(
                      selectedCategory === category ? null : category
                    )
                  }
                  className="h-4 w-4 accent-black cursor-pointer"
                />
                <label className="ext-sm text-slate-800 cursor-pointer">
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Type / Subcategory */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4 text-black">Type</h3>

          <ul className="space-y-3">
            {subCategories.map((sub) => (
              <li key={sub} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSubCategory === sub}
                  onChange={() =>
                    onSelectSubCategory(
                      selectedSubCategory === sub ? null : sub
                    )
                  }
                  className="h-4 w-4 accent-black cursor-pointer"
                />
                <label className="ext-sm text-slate-800 cursor-pointer">
                  {sub}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
