"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCartStore } from "../store/useCartStore";
import { Toast } from "primereact/toast";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  quantity?: number; // Optional quantity prop
}

export default function ProductCard({ product, quantity }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const isCartLoading = useCartStore((state) => state.loading);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toastRef = useRef<Toast>(null);

  const [imgSrc, setImgSrc] = useState(
    product.images?.[0] ||
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
  );

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);

    const result = await addToCart(product, quantity);
    setIsAdding(false);
    if (result.success) {
      setIsSuccess(true);
      toastRef.current?.show({
        severity: "success",
        summary: "Added to Cart",
        detail: `${quantity} × ${product.title} has been added to your cart.`,
        life: 2000,
      });
    } else {
      toastRef.current?.show({
        severity: "error",
        summary: "Failed to Add",
        detail: result.message || "Something went wrong.",
        life: 3000,
      });
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col overflow-hidden h-full">
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={() => {
            setImgSrc(
              "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
            );
          }}
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {product.category?.name || "Uncategorized"}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">
              ${product.price}
            </span>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="block text-center bg-blue-600 text-white mt-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
          >
            View Details
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={isAdding || isCartLoading || isSuccess}
            className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl transition-all duration-200 shadow-sm ${
              isSuccess
                ? "bg-green-600 text-white cursor-default"
                : isAdding
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/10 active:scale-[0.98]"
            }`}
          >
            {isAdding ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Adding...</span>
              </>
            ) : isSuccess ? (
              <>
                {/* Check Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span>Added!</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
