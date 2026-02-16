"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ProductImage from "../../components/ProductImage";
import { Toaster, toast } from "react-hot-toast";

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  size: string;
  quantity: number;
  price: number;
  Product: {
    id: number;
    name: string;
    category: string;
    subCategory?: string;
    price: number;
    description: string;
    sizes: string;
  };
}

interface Cart {
  id: number;
  userId: number;
  CartItems: CartItem[];
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();
  const [shipping, setShipping] = useState<number>(0);

  useEffect(() => {
    const randomShipping = Math.floor(Math.random() * 10) + 1;
    // Generates number between 1 and 10
    setShipping(randomShipping);
  }, []);
  
  

  const token = Cookies.get("token");

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await res.json();
        setCart(data);
      } catch (err: any) {
        console.error("Error fetching cart:", err);
        toast.error(err.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, router]);

  // Remove item from cart (calls backend)
  const removeFromCart = async (cartItemId: number) => {
    if (!cart) return;

    const token = Cookies.get("token");
    if (!token) {
      toast.error("You must be logged in to remove items from cart");
      return;
    }

    try {
      console.log("Deleting cart item:", cartItemId);

      const res = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("DELETE response status:", res.status);
      const data = await res.json();
      console.log("DELETE response data:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete item from cart");
      }

      // Remove locally
      setCart({
        ...cart,
        CartItems: cart.CartItems.filter((item) => item.id !== cartItemId),
      });

      toast.success("Item removed from cart");
    } catch (err: any) {
      console.error("Error removing cart item:", err);
      toast.error(err.message || "Failed to remove item");
    }
  };

  // Update quantity in cart
  const updateQuantity = (cartItemId: number, newQty: number) => {
    if (!cart) return;
    if (newQty < 1) return;

    setCart({
      ...cart,
      CartItems: cart.CartItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      ),
    });
  };

  // Calculate total
  const cartTotal = cart
    ? cart.CartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const finalTotal = cartTotal + shipping;

  // Checkout
  const handleCheckout = async () => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (!cart || cart.CartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    setIsCheckingOut(true);

    try {
      // 1️⃣ Reduce stock for each item in the cart
      for (const item of cart.CartItems) {
        const res = await fetch(
          `http://localhost:5000/api/products/${item.productId}/reduce-stock`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity }),
          }
        );

        if (!res.ok) {
          const error = await res.json();
          throw new Error(
            `Failed to reduce stock for ${item.Product.name}: ${
              error.message || res.statusText
            }`
          );
        }
      }

      // 2️⃣ Place order
      const orderRes = await fetch(
        "http://localhost:5000/api/orders/checkout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!orderRes.ok) {
        const error = await orderRes.json();
        throw new Error(error.message || "Failed to place order");
      }

      const order = await orderRes.json();

      // ✅ Success toast
      toast.success("Order placed successfully!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#1e293b",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "16px 24px",
          borderRadius: "12px",
        },
      });

      // 3️⃣ Clear cart locally
      setCart(null);

      // 4️⃣ Redirect to profile/orders page
      router.push("/profile?order=success");
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error(err.message || "Checkout failed", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!cart || cart.CartItems.length === 0) {
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

  return (
    <>
      {/* 🔥 Hot Toasts */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.CartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-6 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  <ProductImage
                    productId={item.productId}
                    alt={item.Product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-900 text-lg mb-1">
                        {item.Product.name}
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
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 text-slate-500 hover:text-blue-600"
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-8 text-center font-medium text-sm">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 text-slate-500 hover:text-blue-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400 mb-1">Price</p>
                      <p className="font-bold text-lg text-slate-900">
                        Rs{(item.price * item.quantity).toFixed(2)}
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
                    Rs{cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">
                    Rs{shipping.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>Rs{finalTotal.toFixed(2)}</span>
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
    </>
  );
}
