"use client";

import React from "react";
import Image from "next/image";

// ⚠️ Fake Instagram Data (သင့် Project အလိုက် ပုံများ ပြောင်းလဲနိုင်သည်)
const INSTAGRAM_POSTS = [
  { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400", likes: "1.2k", link: "https://instagram.com" },
  { id: 2, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400", likes: "945", link: "https://instagram.com" },
  { id: 3, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400", likes: "2.3k", link: "https://instagram.com" },
  { id: 4, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400", likes: "1.5k", link: "https://instagram.com" },
  { id: 5, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400", likes: "880", link: "https://instagram.com" },
  { id: 6, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400", likes: "3.1k", link: "https://instagram.com" },
];

// ⚠️ Fake Brand Logos
const BRANDS = [
  { name: "VOGUE", icon: "pi-percentage" },
  { name: "ZARA", icon: "pi-tags" },
  { name: "NIKE", icon: "pi-bolt" },
  { name: "ADIDAS", icon: "pi-star" },
  { name: "GUCCI", icon: "pi-heart" },
  { name: "CHANEL", icon: "pi-sparkles" },
];

export default function BrandAndInstagram() {
  return (
    <div className="w-full bg-slate-900 border-t border-b border-gray-100 py-16 space-y-16 overflow-hidden">
      
      {/* 🤝 SECTION 1: BRANDS WE WORK WITH (Infinite Marquee Slider) */}
      <div className="w-full space-y-6">
        <div className="text-center">
          <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Our Partners</p>
          <h2 className="text-xl font-extrabold text-slate-800 mt-1">Brands We Work With</h2>
        </div>

        {/* Endless CSS Animation Row */}
        <div className="relative flex w-full max-w-6xl mx-auto px-4 mask-gradient">
          <div className="flex gap-16 animate-marquee whitespace-nowrap min-w-full justify-around py-4 items-center">
            
            {BRANDS.map((brand, i) => (
              <div key={`b1-${i}`} className="flex items-center gap-2 text-gray-400 hover:text-slate-800 transition-colors cursor-pointer font-black text-xl tracking-widest">
                <i className={`pi ${brand.icon} text-lg`} />
                {brand.name}
              </div>
            ))}
            {BRANDS.map((brand, i) => (
              <div key={`b2-${i}`} className="flex items-center gap-2 text-gray-400 hover:text-slate-800 transition-colors cursor-pointer font-black text-xl tracking-widest">
                <i className={`pi ${brand.icon} text-lg`} />
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📸 SECTION 2: INSTAGRAM FEED */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100 pb-5">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shop Our Instagram</h2>
            <p className="text-gray-400 text-sm mt-0.5">Tag <span className="font-bold text-slate-700">@yourstore</span> in your photos to get featured!</p>
          </div>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            <i className="pi pi-instagram text-base" /> Follow Us
          </a>
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a 
              key={post.id} 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative aspect-square rounded-2xl overflow-hidden group bg-slate-100 border border-gray-100 shadow-inner"
            >
              <Image 
                src={post.image} 
                alt="Instagram Feed" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              {/* Hover Dark Overlay Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white gap-1">
                <i className="pi pi-heart-fill text-lg text-pink-500" />
                <span className="text-xs font-black tracking-wide">{post.likes}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}