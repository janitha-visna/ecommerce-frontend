"use client";

import { useAuth } from "../context/AuthContext";
import { User, Mail, LogOut } from "lucide-react";
import OrderHistory from "../components/OrderHistory";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center sticky top-24">
                            <div className="w-24 h-24 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold font-sans">
                                {user.name.charAt(0)}
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                            <p className="text-slate-500 text-sm mb-6">{user.email}</p>

                            <div className="space-y-3">
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors font-medium"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <OrderHistory />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
