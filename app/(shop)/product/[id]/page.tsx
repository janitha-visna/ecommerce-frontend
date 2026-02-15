"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
        setQuantity(data.stock > 0 ? 1 : 0);

        // Handle sizes (string from backend or array)
        const sizesArray = data.sizes
          ? Array.isArray(data.sizes)
            ? data.sizes
            : data.sizes.split(",").map((s: string) => s.trim())
          : [];

        setSelectedSize(sizesArray.length > 0 ? sizesArray[0] : null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading product...</p>;
  if (!product) return <p className="text-center py-20">Product not found</p>;

  const sizesArray = product.sizes
    ? Array.isArray(product.sizes)
      ? product.sizes
      : product.sizes.split(",").map((s: string) => s.trim())
    : [];

  const incrementQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    if (quantity > product.stock) {
      toast.error("Cannot add more than available stock");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("You must be logged in to add items to cart");
      return;
    }

    setAdding(true);

    try {
      console.log("Sending POST request to /api/cart with data:", {
        productId: product.id,
        size: selectedSize,
        quantity,
      });
      console.log("Using token:", token);

      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          size: selectedSize,
          quantity,
        }),
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        toast.error(data.message || "Failed to add to cart");
      } else {
        toast.success(
          `Added ${quantity} item(s) of size ${selectedSize} to cart!`
        );
      }
    } catch (err) {
      console.error("Error while adding to cart:", err);
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden">
          <img
            src={`http://localhost:5000/api/products/${product.id}/image`}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Product Info */}
        <div className="text-slate-900 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-slate-600 mb-2">{product.description}</p>
          <p className="text-2xl font-bold mb-2">Rs{product.price.toFixed(2)}</p>

          {/* Stock */}
          <p className="mb-4 text-sm text-gray-600">
            Stock:{" "}
            <span
              className={product.stock > 0 ? "text-green-600" : "text-red-600"}
            >
              {product.stock > 0 ? product.stock : "Out of stock"}
            </span>
          </p>

          {/* Sizes */}
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold">Select Size:</p>
            <div className="flex gap-3 flex-wrap">
              {sizesArray.map((size: string) => (
                <button
                  key={size}
                  type="button"
                  className={`px-4 py-2 rounded border ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-900 border-slate-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Total Price */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decrementQuantity}
              className="px-3 py-1 border rounded text-black"
            >
              −
            </button>
            <span className="text-black font-medium">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-3 py-1 border rounded text-black"
            >
              +
            </button>

            <span className="ml-auto font-bold text-xl">
              Total: Rs{(product.price * quantity).toFixed(2)}
            </span>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || adding}
            className={`bg-blue-600 text-white px-6 py-2 rounded transition ${
              product.stock === 0 || adding
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
