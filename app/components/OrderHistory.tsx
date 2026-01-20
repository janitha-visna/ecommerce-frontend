"use client";

import { useState } from "react";
import { Package, ChevronDown, ChevronUp } from "lucide-react";

// Mock Data
const ORDERS = [
    {
        id: "ORD-12345",
        date: "2024-03-15",
        total: 89.98,
        status: "Delivered",
        items: [
            { name: "Classic Cotton T-Shirt", quantity: 1, price: 29.99 },
            { name: "Summer Floral Dress", quantity: 1, price: 59.99 },
        ]
    },
    {
        id: "ORD-12346",
        date: "2024-03-20",
        total: 34.99,
        status: "Processing",
        items: [
            { name: "Kids Colorful Hoodie", quantity: 1, price: 34.99 },
        ]
    }
];

export default function OrderHistory() {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const toggleOrder = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Package className="text-blue-600" />
                Order History
            </h2>

            <div className="space-y-4">
                {ORDERS.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
                            onClick={() => toggleOrder(order.id)}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Order ID</p>
                                    <p className="font-bold text-slate-900">#{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date</p>
                                    <p className="text-slate-700">{order.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total</p>
                                    <p className="font-bold text-slate-900">${order.total.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Status</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 text-slate-400">
                                {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>

                        {expandedOrder === order.id && (
                            <div className="p-4 bg-white border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">Order Items</h4>
                                <div className="space-y-3">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm text-slate-600 border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span className="font-medium text-slate-900">${item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
