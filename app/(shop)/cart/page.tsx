"use client";

import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import ProductImage from "../../components/ProductImage"; // 👈 new import

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 px-4">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Trash2 className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Your cart is empty
        </h2>
        <p className="text-slate-500 text-center max-w-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setIsCheckingOut(true);

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      const res = await fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("You don't have permission to checkout");
        }
        if (res.status === 401) {
          throw new Error("Your session has expired. Please login again.");
        }
        const error = await res.json();
        throw new Error(error.message || "Failed to place order");
      }

      const order = await res.json();

      // Clear cart on successful order
      items.forEach((item) => removeFromCart(item.id));

      // Redirect to profile with success message
      router.push("/profile?order=success");
    } catch (error: any) {
      alert(error.message || "Failed to place order. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-6 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                <ProductImage
                  productId={item.id}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-900 text-lg mb-1">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Size:{" "}
                    <span className="font-medium text-slate-700">
                      {item.size}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border border-slate-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-slate-500 hover:text-blue-600"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="w-8 text-center font-medium text-sm">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-slate-500 hover:text-blue-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400 mb-1">Price</p>
                    <p className="font-bold text-lg text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="font-medium text-slate-900">$0.00</span>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Including VAT</p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
