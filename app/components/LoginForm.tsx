"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  isAdmin?: boolean;
  onToggle?: () => void;
}

export default function LoginForm({
  isAdmin = false,
  onToggle,
}: LoginFormProps) {
  const { login, adminLogin } = useAuth(); // Get both login functions
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isAdmin) {
        // Use admin login for admin portal
        await adminLogin(formData.email, formData.password);
      } else {
        // Use regular login for customer portal
        await login(formData.email, formData.password);
      }
      // No need to handle redirect here - AuthContext handles it
    } catch (err: any) {
      alert(err.message || "Invalid email or password");
      setLoading(false);
    }
    // Don't set loading false on success - component will unmount
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {isAdmin ? "Admin Portal" : "Welcome Back"}
          </h2>
          <p className="text-gray-700 mt-2 text-sm">
            {isAdmin
              ? "Enter your credentials to access the dashboard"
              : "Sign in to your account to continue shopping"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                  bg-white text-black placeholder:text-gray-500 
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 
                  outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-900">
                Password
              </label>
              {!isAdmin && (
                <Link
                  href="#"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                  bg-white text-black placeholder:text-gray-500 
                  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 
                  outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-lg 
              hover:bg-slate-800 transition-all shadow-lg 
              active:scale-95 flex items-center justify-center gap-2 
              disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Register link - only for non-admin */}
        {!isAdmin && onToggle && (
          <div className="mt-6 text-center text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <button
              onClick={onToggle}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        )}
      </div>

      {/* Admin footer */}
      {isAdmin && (
        <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
          <Link
            href="/login"
            className="text-sm text-gray-700 hover:text-gray-900 flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Customer Login
          </Link>
        </div>
      )}
    </div>
  );
}
