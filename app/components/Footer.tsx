"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-24 md:pb-16 text-sm">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="text-xl font-black text-white tracking-tight">
            YOUR<span className="text-blue-500">STORE</span>
          </Link>
          <p className="text-slate-400 leading-relaxed max-w-sm text-xs md:text-sm">
            Your premium destination for fashion, electronics, and home decor. Crafted for modern shopping experiences.
          </p>
          <div className="flex gap-4 text-base text-slate-400 pt-2">
            <a href="#" className="hover:text-white transition-colors"><i className="pi pi-facebook" /></a>
            <a href="#" className="hover:text-white transition-colors"><i className="pi pi-twitter" /></a>
            <a href="#" className="hover:text-white transition-colors"><i className="pi pi-instagram" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-white text-base tracking-wide">Quick Links</h4>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-bold text-white text-base tracking-wide">Customer Care</h4>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs & Help</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-6xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>&copy; {currentYear} YOURSTORE. All rights reserved.</p>
        
        {/* Payment Methods Icons Mockup */}
        <div className="flex items-center gap-3 text-lg text-slate-500">
          <i className="pi pi-credit-card" title="Visa/MasterCard" />
          <i className="pi pi-wallet" title="Digital Wallet" />
          <i className="pi pi-paypal" title="PayPal" />
        </div>
      </div>
    </footer>
  );
}