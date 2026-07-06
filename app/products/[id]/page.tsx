"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// ⚠️ PrimeReact Components
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Toast } from "primereact/toast";
import { useCartStore } from "@/app/store/useCartStore";
import { Product } from "@/types";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const toastRef = useRef<Toast>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const defaultImage =
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600";

  useEffect(() => {
    if (!id) return;

    const fetchProductDetail = async () => {
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`,
        );
        if (!res.ok) throw new Error("Product data not found");

        const data = await res.json();
        setProduct(data);

        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    const result = await addToCart(product, quantity);

    if (result.success) {
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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40 gap-3">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="4"
        />
        <span className="text-sm font-bold text-slate-500">
          Loading Product Details...
        </span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 font-bold text-slate-600">
         Sorry, we couldn't find this product.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Toast ref={toastRef} position="top-right" />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition"
      >
        <i className="pi pi-arrow-left"></i> Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
        {/* 📷 Left Side: Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square bg-slate-50 border border-gray-100 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={mainImage.startsWith("http") ? mainImage : defaultImage}
              alt={product.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultImage;
              }}
            />
          </div>

          {/* Thumbnail Images  */}
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`relative w-20 h-20 bg-slate-50 border-2 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transition-all ${
                  mainImage === img
                    ? "border-blue-500 scale-95"
                    : "border-gray-100 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.startsWith("http") ? img : defaultImage}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 📝 Right Side: Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="bg-slate-100 text-slate-700 text-[11px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
              {product.category.name}
            </span>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Fake Stars Rating */}
            <div className="flex items-center gap-2">
              <Rating
                value={4}
                readOnly
                cancel={false}
                className="text-amber-500 text-sm"
              />
              <span className="text-xs text-gray-400 font-bold">
                (4.0 / 32 Reviews)
              </span>
            </div>

            <div className="text-2xl font-black text-blue-600">
              ${product.price.toLocaleString()}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* 🛒 Quantity & Add to Cart Controls */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500 uppercase">
                Quantity
              </span>

              {/* Plus/Minus Counter */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden font-bold text-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 hover:bg-slate-200 active:scale-95 transition text-slate-600"
                >
                  -
                </button>
                <span className="px-4 text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 hover:bg-slate-200 active:scale-95 transition text-slate-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              label="Add to Shopping Cart"
              icon="pi pi-shopping-cart"
              onClick={handleAddToCart}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition duration-200 text-sm shadow-md active:scale-[0.99]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
