"use client";

import { Package, TrendingUp, Users, DollarSign } from "lucide-react";

const CATEGORY_STATS = [
    { name: "Men", stock: 124, active: 45, icon: Users, color: "bg-blue-500" },
    { name: "Women", stock: 186, active: 62, icon: TrendingUp, color: "bg-pink-500" },
    { name: "Kids", stock: 89, active: 34, icon: Package, color: "bg-orange-500" },
    { name: "Accessories", stock: 65, active: 28, icon: DollarSign, color: "bg-purple-500" },
];

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {CATEGORY_STATS.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                                <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
                                    {stat.name}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.stock}</h3>
                                <p className="text-sm text-slate-500">Total Items in Stock</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-sm">
                                <span className="text-slate-500">Active Listings</span>
                                <span className="font-semibold text-slate-900">{stat.active}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
