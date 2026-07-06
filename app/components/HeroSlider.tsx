// "use client";

// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Carousel } from "primereact/carousel";
// import { Button } from "primereact/button";

// const SLIDER_ITEMS = [
//   {
//     id: 1,
//     title: "Upgrade Your Style",
//     subtitle: "New Summer Collection 2026",
//     description: "Discover the latest trends in fashion with up to 30% off on all new arrivals. Premium quality guaranteed.",
//     image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
//     buttonText: "Shop Collection",
//     link: "/products?category=clothes",
//     badge: "New Arrival",
//   },
//   {
//     id: 2,
//     title: "Next-Gen Electronics",
//     subtitle: "Smart Gadgets & Accessories",
//     description: "Experience the future today. Get exclusive deals on high-performance headphones, smartwatches, and laptops.",
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200",
//     buttonText: "Explore Tech",
//     link: "/products?category=electronics",
//     badge: "Limited Offer",
//   },
//   {
//     id: 3,
//     title: "Minimalist Living",
//     subtitle: "Modern Furniture & Decor",
//     description: "Transform your home into a sanctuary. Elegant, durable, and crafted furniture designs now available.",
//     image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200",
//     buttonText: "Discover More",
//     link: "/products?category=furniture",
//     badge: "Trending Now",
//   },
// ];

// export default function HeroSlider() {
//   const router = useRouter();

//   const slideTemplate = (item: typeof SLIDER_ITEMS[0]) => {
//     return (
//       <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-3xl bg-slate-900 text-white border border-gray-100">
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <Image
//             src={item.image}
//             alt={item.title}
//             fill
//             className="object-cover opacity-60 transition-transform duration-700 hover:scale-105"
//             priority
//           />
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
//         </div>

//         {/* Slide Content Box */}
//         <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-16 max-w-2xl space-y-4 md:space-y-6">
//           <span className="bg-blue-600 text-white text-[11px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider shadow-sm">
//             {item.badge}
//           </span>
          
//           <div className="space-y-2">
//             <p className="text-blue-400 text-sm md:text-base font-bold tracking-medium">
//               {item.subtitle}
//             </p>
//             <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
//               {item.title}
//             </h1>
//           </div>

//           <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium line-clamp-3">
//             {item.description}
//           </p>

//           <Button
//             label={item.buttonText}
//             icon="pi pi-arrow-right"
//             iconPos="right"
//             onClick={() => router.push(item.link)}
//             className="bg-white hover:bg-gray-100 text-slate-900 font-bold px-6 py-3.5 rounded-2xl border-none transition shadow-lg text-sm active:scale-95"
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 py-6 hero-slider-container">
//       <Carousel
//         value={SLIDER_ITEMS}
//         numVisible={1}
//         numScroll={1}
//         itemTemplate={slideTemplate}
//         autoplayInterval={5000} 
//         circular
//         showNavigators={false} 
//         className="custom-carousel"
//       />
//     </div>
//   );
// }