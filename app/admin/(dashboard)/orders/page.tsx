"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const token = Cookies.get("token");

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Sort Orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Filter Orders
  const filteredOrders = statusFilter
    ? sortedOrders.filter((o) => o.status === statusFilter)
    : sortedOrders;

  // Update Status
  const updateStatus = async (id: number, status: string) => {
    await fetch(`http://localhost:5000/api/orders/admin/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchOrders();
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 text-slate-900 dark:text-white bg-white dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>

        <div className="flex gap-3">
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg text-slate-900 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
          >
            Sort: {sortOrder === "asc" ? "Oldest" : "Newest"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
              <th className="p-4 text-left text-sm font-semibold">Order ID</th>
              <th className="p-4 text-left text-sm font-semibold">Customer</th>
              <th className="p-4 text-left text-sm font-semibold">Date</th>
              <th className="p-4 text-left text-sm font-semibold">Status</th>
              <th className="p-4 text-left text-sm font-semibold">Total</th>
              <th className="p-4 text-right text-sm font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <td className="p-4 font-semibold">#{order.id}</td>

                <td className="p-4">
                  <div>
                    <div className="font-medium">{order.User?.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {order.User?.email}
                    </div>
                  </div>
                </td>

                <td className="p-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-sm">{order.status}</td>

                <td className="p-4 font-bold">
                  ${order.totalAmount?.toFixed(2)}
                </td>

                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-96 text-slate-900 dark:text-white">
            <h2 className="text-xl font-bold mb-4">
              Order #{selectedOrder.id}
            </h2>

            <p>
              <strong>Name:</strong> {selectedOrder.User?.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.User?.email}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>

            <div className="mt-4 space-y-2">
              {["Processing", "Shipped", "Delivered"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(selectedOrder.id, status)}
                  className="w-full border border-slate-300 dark:border-slate-600 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  Mark {status}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 text-red-500 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
