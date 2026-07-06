"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Category } from "@/types";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const defaultImage =
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=300";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");

        if (!res.ok) {
          throw new Error("Failed to fetch categories.");
        }

        const data = await res.json();
        setCategories(data.slice(0, 6));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 gap-3">
        <ProgressSpinner
          style={{ width: "40px", height: "40px" }}
          strokeWidth="6"
          animationDuration=".5s"
        />
        <span className="text-xs font-bold text-slate-500 tracking-wider">
          Loading Categories...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-12 max-w-xl mx-auto px-4">
        <Message
          severity="error"
          text={error}
          className="w-full rounded-xl p-3 font-semibold text-xs"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <i className="pi pi-th-large text-blue-500 text-xl"></i>
          Shop by Categories
        </h2>

        <p className="text-gray-500 text-xs mt-1 font-medium">
          Browse products by category and find exactly what you're looking for.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
        {categories.map((category) => {
          // Image displayed in the Card header
          const cardHeader = (
            <div className="relative w-full aspect-square overflow-hidden bg-slate-50 border-b border-gray-100">
              <Image
                src={
                  category.image && category.image.startsWith("http")
                    ? category.image
                    : defaultImage
                }
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImage;
                }}
              />
            </div>
          );

          return (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="group block"
            >
              {/* PrimeReact Card Component */}
              <Card
                header={cardHeader}
                className="shadow-sm border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                {/* Card Body */}
                <h3 className="font-bold text-xs md:text-sm text-slate-800 text-center group-hover:text-blue-600 transition truncate -mt-2">
                  {category.name}
                </h3>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
