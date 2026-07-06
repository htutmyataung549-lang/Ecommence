"use client";

import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast"; 

export default function PreFooter() {
  const [email, setEmail] = useState("");
  const toastRef = useRef<Toast>(null); 

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    toastRef.current?.show({
      severity: "success",
      summary: "Subscription Successful!",
      detail: `Thank you for subscribing with: ${email}`,
      life: 3000, 
    });

    setEmail("");
  };

  return (
    <div className="w-full bg-slate-900 text-white py-8">
      <Toast ref={toastRef} position="top-right" />

      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {/* 🚚 Section 1: Value Propositions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-5 bg-slate-800/40 rounded-2xl border border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
              <i className="pi pi-truck" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Free Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">For all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-slate-800/40 rounded-2xl border border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
              <i className="pi pi-dollar" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Secure Payment</h4>
              <p className="text-xs text-slate-400 mt-0.5">100% protected checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-slate-800/40 rounded-2xl border border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
              <i className="pi pi-sync" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">14 days money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-slate-800/40 rounded-2xl border border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
              <i className="pi pi-phone" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">24/7 Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Dedicated tech support team</p>
            </div>
          </div>
        </div>

        {/* ✉️ Section 2: Newsletter Box */}
        <div className="border-t border-slate-800 pt-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-md text-center lg:text-left">
            <h2 className="text-2xl font-black tracking-tight text-white">Join Our Newsletter</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Subscribe today to get updates on new arrivals, exclusive promo codes, and seasonal sales!
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <i className="pi pi-envelope absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <InputText
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm outline-none placeholder-slate-500 focus:border-slate-500 transition-colors"
              />
            </div>
            <Button
              type="submit"
              label="Subscribe"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl border-none transition text-sm active:scale-95 flex-shrink-0"
            />
          </form>
        </div>

      </div>
    </div>
  );
}