"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

export default function OrderSuccessPage() {
  const router = useRouter();

  // Fake Order ID generating for UX
  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      {/* 🎉 Big Success Check Icon */}
      <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
        Thank You for Your Order!
      </h1>
      
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        Your payment was processed successfully, and your order is on its way. We&apos;ve sent a confirmation email to your address.
      </p>

      {/* Order Reference Box */}
      <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl mb-8">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Order Reference
        </span>
        <span className="text-base font-black text-blue-600 tracking-medium">
          {orderId}
        </span>
      </div>

      {/* Actions Button */}
      <div className="space-y-3">
        <Button label="Continue Shopping" icon="pi pi-shopping-bag" onClick={() => router.push("/")} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition shadow-sm text-sm" />
        {/* <button onClick={() => router.push("/")} className="w-full text-slate-500 hover:text-slate-800 text-sm font-bold transition py-2" >
          Track Order Status
        </button> */}
      </div>
    </div>
  );
}