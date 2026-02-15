"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../../components/ProductForm";
import Cookies from "js-cookie"; // if you store JWT in cookies

export default function AddProductPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    // Example: get user info from JWT in cookie
    const token = Cookies.get("token"); // adjust if you store token differently
    if (!token) {
      router.replace("/login"); // not logged in → redirect to login
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
      if (payload.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        router.replace("/"); // not admin → redirect home
      }
    } catch (err) {
      console.error("Invalid token", err);
      router.replace("/login");
    }
  }, [router]);

  if (isAdmin === null) {
    // loading / verifying token
    return (
      <p className="text-center mt-20 text-slate-500">Verifying access...</p>
    );
  }

  if (!isAdmin) return null; // already redirected

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
          <p className="text-slate-500 mt-1">
            Create a new product for your store.
          </p>
        </div>
      </div>

      <ProductForm />
    </>
  );
}
