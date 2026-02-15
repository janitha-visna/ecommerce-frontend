"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";

const ICONS_MAP: Record<string, any> = {
  Men: Users,
  Women: TrendingUp,
  Kids: Package,
  Accessories: DollarSign,
};

const COLORS_MAP: Record<string, string> = {
  Men: "bg-blue-500",
  Women: "bg-pink-500",
  Kids: "bg-orange-500",
  Accessories: "bg-purple-500",
};

export default function AdminDashboard() {
  const [categoryStats, setCategoryStats] = useState<
    { name: string; stock: number }[]
  >([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const token = Cookies.get("token"); // Get JWT token from cookies
        if (!token) return console.warn("No token found in cookies");

        const res = await fetch("http://localhost:5000/api/products/stock", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error fetching stock:", errorData);
          return;
        }

        const data = await res.json();
        // Transform the stockCounts object to array
        const statsArray = Object.entries(data.stockCounts).map(
          ([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1), // capitalize
            stock: Number(value),
          })
        );

        setCategoryStats(statsArray);
      } catch (err) {
        console.error("Fetch stock error:", err);
      }
    };

    fetchStock();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categoryStats.map((stat) => {
          const Icon = ICONS_MAP[stat.name] || Package;
          const color = COLORS_MAP[stat.name] || "bg-gray-500";

          return (
            <div
              key={stat.name}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                  <Icon
                    className={`w-6 h-6 ${color.replace("bg-", "text-")}`}
                  />
                </div>
                <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
                  {stat.name}
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.stock}
                </h3>
                <p className="text-sm text-slate-500">Total Items in Stock</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
