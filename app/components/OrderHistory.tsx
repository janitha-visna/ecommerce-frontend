"use client";

import { useState, useEffect } from "react";
import { Package, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie"; // Add this import

type OrderItem = {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  orderId: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
};

export default function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Get token from cookies instead of localStorage
        const token = Cookies.get("token");

        if (!token) {
          throw new Error("No authentication token found");
        }

        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("You don't have permission to view these orders");
          }
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();

        // Transform the data to match the expected format
        const transformedOrders = data.map((order: any) => ({
          id: order.id.toString(),
          orderId: `ORD-${order.id}`,
          date: order.createdAt,
          total: order.totalAmount,
          status: order.status,
          items: order.OrderItems.map((item: any) => ({
            id: item.id,
            productId: item.productId || 0,
            name: item.productName,
            quantity: item.quantity,
            price: item.price,
          })),
        }));

        setOrders(transformedOrders);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 mb-2">Failed to load orders</p>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No orders yet
        </h3>
        <p className="text-slate-500 mb-6">
          Looks like you haven't placed any orders.
        </p>
        <a
          href="/collection"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Package className="text-blue-600" />
        Order History
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
              onClick={() => toggleOrder(order.id)}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Order ID
                  </p>
                  <p className="font-bold text-slate-900">
                    #{order.orderId || order.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Date
                  </p>
                  <p className="text-slate-700">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Total
                  </p>
                  <p className="font-bold text-slate-900">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Shipped"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="ml-4 text-slate-400">
                {expandedOrder === order.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="p-4 bg-white border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">
                  Order Items
                </h4>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm text-slate-600 border-b border-slate-50 last:border-0 pb-2 last:pb-0"
                    >
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
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
