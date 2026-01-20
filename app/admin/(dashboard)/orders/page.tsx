"use client";

import { Package, Search, Filter } from "lucide-react";

// Mock Data for Admin
const ADMIN_ORDERS = [
    {
        id: "ORD-12345",
        user: "John Doe",
        email: "john@example.com",
        date: "2024-03-15",
        total: 89.98,
        status: "Delivered",
        items: 2,
    },
    {
        id: "ORD-12346",
        user: "Jane Smith",
        email: "jane@test.com",
        date: "2024-03-20",
        total: 34.99,
        status: "Processing",
        items: 1,
    },
    {
        id: "ORD-12347",
        user: "Mike Ross",
        email: "mike@ross.com",
        date: "2024-03-21",
        total: 129.99,
        status: "Pending",
        items: 3,
    },
    {
        id: "ORD-12348",
        user: "Sarah Connor",
        email: "sarah@sky.net",
        date: "2024-03-21",
        total: 210.50,
        status: "Shipped",
        items: 5,
    },
];

export default function AdminOrdersPage() {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
                    <p className="text-slate-500 mt-1">Manage and track customer orders.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                        <Filter size={18} />
                        Filter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-end text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {ADMIN_ORDERS.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4 font-semibold text-slate-900">#{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900">{order.user}</span>
                                            <span className="text-xs text-slate-500">{order.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${order.status === "Delivered" ? "bg-green-50 text-green-700 border-green-200" :
                                                order.status === "Processing" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                    order.status === "Shipped" ? "bg-purple-50 text-purple-700 border-purple-200" :
                                                        "bg-amber-50 text-amber-700 border-amber-200"
                                            }
                    `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-end">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
