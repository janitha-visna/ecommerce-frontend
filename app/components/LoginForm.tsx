"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
    isAdmin?: boolean;
    onToggle?: () => void;
}

export default function LoginForm({ isAdmin = false, onToggle }: LoginFormProps) {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setLoading(false);
        login(formData.email, isAdmin ? "admin" : "user");
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {isAdmin ? "Admin Portal" : "Welcome Back"}
                    </h2>
                    <p className="text-slate-500 mt-2 text-sm">
                        {isAdmin
                            ? "Enter your credentials to access the dashboard"
                            : "Sign in to your account to continue shopping"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            {!isAdmin && (
                                <Link href="#" className="text-xs text-blue-600 hover:underline">
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {!isAdmin && onToggle && (
                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <button onClick={onToggle} className="text-blue-600 font-bold hover:underline">
                            Sign up
                        </button>
                    </div>
                )}
            </div>

            {isAdmin && (
                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <Link href="/login" className="text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-2">
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        Back to Customer Login
                    </Link>
                </div>
            )}
        </div>
    );
}
