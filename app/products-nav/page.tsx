"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Product } from "@/types";
import { PLATZI_PRODUCTS_MOCK } from "../data/productsMock";

export default function ProductsPage() {
  const [products] = useState<Product[]>(PLATZI_PRODUCTS_MOCK);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PLATZI_PRODUCTS_MOCK);
  
  // Filter States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<string | null>(null);

  // Categories List Extracts from products
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category.name)))];

  const sortOptions = [
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Alphabetical (A-Z)", value: "title_asc" },
  ];

  // 🎯 Filter & Sort Logic Combined
  useEffect(() => {
    let result = [...products];

    // Search Filter
    if (search) {
      result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    // Category Filter
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((p) => p.category.name === selectedCategory);
    }

    // Price Filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting Logic
    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "title_asc") result.sort((a, b) => a.title.localeCompare(b.title));

    setFilteredProducts(result);
  }, [search, selectedCategory, priceRange, sortBy, products]);

  // Platzi Image Fixer Helper
  const cleanImageUrl = (url: string) => {
    return url.replace(/^\["?|"?\]$/g, '').replace(/\\"/g, '"');
  };

  return (
    <div className="bg-slate-900 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Explore Our Collections</h1>
          <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
            Find everything you need with premium quality and best market prices.
          </p>
        </div>

        {/* 🎛️ FILTER BAR CONTROLS */}
        <div className="bg-slate-800 p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-10">
          
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <i className="pi pi-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm outline-none focus:bg-gray-100 transition-colors"
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="md:col-span-3">
            <Dropdown
              value={selectedCategory}
              options={categories.map(c => ({ label: c, value: c }))}
              onChange={(e) => setSelectedCategory(e.value)}
              placeholder="Select Category"
              className="w-full bg-gray-50 border-none rounded-xl text-sm"
              style={{ padding: "3px" }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <Dropdown
              value={sortBy}
              options={sortOptions}
              onChange={(e) => setSortBy(e.value)}
              placeholder="Sort By"
              className="w-full bg-gray-50 border-none rounded-xl text-sm"
              style={{ padding: "3px" }}
            />
          </div>

          {/* Price Range Slider */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Max Price:</span>
              <span>${priceRange[1]}</span>
            </div>
            <Slider
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], e.value as number])}
              min={0}
              max={500}
              className="w-full"
            />
          </div>
        </div>

        {/* 📦 PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-slate-800 mt-2">No Products Found</h3>
            <p className="text-gray-400 text-sm">Try tweaking your search filters or browse other categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all flex flex-col h-full"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/5] bg-gray-50 w-full overflow-hidden">
                  <Image
                    src={cleanImageUrl(product.images[0])}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-800 shadow-sm">
                    {product.category.name}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-2 mt-1 font-medium leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-900 font-black text-base">${product.price}</span>
                    <Button 
                      icon="pi pi-shopping-cart"
                      className="bg-slate-900 hover:bg-slate-800 border-none p-2.5 rounded-xl text-white text-sm"
                      title="Add to cart"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}