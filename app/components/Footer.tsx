import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            ShopBrand
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Premium quality clothing for the modern lifestyle. We bring you the latest trends with comfort and durability in mind.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Best Sellers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Men's Collection</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Women's Collection</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Order Status</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Size Guide</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li>123 Fashion Street</li>
                            <li>New York, NY 10001, USA</li>
                            <li>support@shopbrand.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} ShopBrand. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
