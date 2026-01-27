"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              PREWAVE
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Prewave is simply dummy text of the printing and typesetting
              industry. It has been the industry's standard dummy text ever
              since the 1500s.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-white font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Address: </strong> 126, Senanayake Road, Matale
              </li>
              <li>
                <strong>Phone: </strong> +11 222 2222 / (+94) 01 2315 6789
              </li>
              <li>
                <strong>Hours: </strong> 10:00 - 19:00, Mon - Sat
              </li>
            </ul>
          </div>

          {/* Secured Payment */}
          <div>
            <h4 className="text-white font-semibold mb-6">
              Secured Payment Gateways
            </h4>
            <img
              src="/pay.png"
              alt="Payment Options"
              className="h-12 object-contain"
            />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} PREWAVE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
