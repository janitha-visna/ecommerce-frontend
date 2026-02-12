"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import ProductImage from "../../../components/ProductImage"; // 👈 new import

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
        setQuantity(data.stock > 0 ? 1 : 0);
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

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      alert("Cannot add more than available stock");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: `http://localhost:5000/api/products/${product.id}/image`, // keep for fallback
      quantity,
      size: product.sizes,
    });
    alert(`Added ${quantity} item(s) of size ${product.sizes} to cart!`);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden">
          <ProductImage
            productId={product.id}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="text-slate-900 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-slate-600 mb-2">{product.description}</p>
          <p className="text-2xl font-bold mb-2">${product.price.toFixed(2)}</p>

          {/* Stock */}
          <p className="mb-4 text-sm text-gray-600">
            Stock:{" "}
            <span
              className={product.stock > 0 ? "text-green-600" : "text-red-600"}
            >
              {product.stock > 0 ? product.stock : "Out of stock"}
            </span>
          </p>

          {/* Size */}
          <p className="mb-4 text-sm">
            Size: <span className="font-medium">{product.sizes}</span>
          </p>

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
              Total: ${(product.price * quantity).toFixed(2)}
            </span>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`bg-blue-600 text-white px-6 py-2 rounded transition ${
              product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
