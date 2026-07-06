"use client";

import React from "react";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { value: "15K+", label: "Happy Customers" },
    { value: "80K+", label: "Products Sold" },
    { value: "24/7", label: "Live Support" },
    { value: "99.8%", label: "Satisfaction Rate" },
  ];

  const coreValues = [
    {
      icon: "pi-verified",
      title: "Quality First",
      desc: "We rigorously source and inspect every item to ensure it meets elite premium global standards.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: "pi-heart",
      title: "Customer Obsessed",
      desc: "Our users are our driving force. Your shopping convenience and post-purchase happiness come first.",
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    },
    {
      icon: "pi-shield",
      title: "100% Secure Checkout",
      desc: "Shop with peace of mind. Every electronic transaction is heavily encrypted and protected.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      
      {/* 🚀 Hero Story Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Our Legacy
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-50 tracking-tight leading-tight">
            Crafting the Future of Modern Retail.
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
            Founded in 2026, YOURSTORE was born out of a simple vision: to eliminate the friction in e-commerce and bring top-tier, trending fashion, state-of-the-art electronics, and sleek home essentials directly to your doorstep.
          </p>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            We believe that premium shopping shouldn&apos;t cost a fortune. By working directly with quality producers, we offer high-grade products packed with modern aesthetics at highly accessible rates.
          </p>
        </div>

        {/* Brand Image Grid Layer */}
        <div className="relative aspect-[4/3] md:aspect-square w-full rounded-3xl overflow-hidden border border-gray-100 shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
            alt="Our Team Workspace"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 📊 BUSINESS STATS GRID */}
      <div className="w-full bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-blue-400">{stat.value}</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 💎 CORE VALUES SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-10">
        <div className="text-center space-y-2">
          <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Our DNA</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">The Principles We Stand By</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, i) => (
            <div 
              key={i} 
              className="bg-slate-800 text-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:-translate-y-1 transition-transform"
            >
              <div className={`w-12 h-12 ${value.bgColor} ${value.color} rounded-xl flex items-center justify-center text-2xl`}>
                <i className={`pi ${value.icon}`} />
              </div>
              <h3 className="font-extrabold text-lead text-lg">{value.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}