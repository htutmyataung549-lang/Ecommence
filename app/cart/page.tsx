"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/useCartStore";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function CartPage() {
  const {
    cart,
    fetchCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    loading,
  } = useCartStore();

  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    fetchCart();
    setIsMounted(true);
    
    if (typeof window !== "undefined") {
      const hasCookieToken = document.cookie.includes("platzi_token");
      const hasLocalToken = !!localStorage.getItem("platzi_token");
      
      setIsAuthenticated(hasCookieToken || hasLocalToken);
    }
  }, [fetchCart]);

  // Checkout Logic
  const handleCheckout = async () => {
    setCheckoutLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout");
      setCheckoutLoading(false);
      return;
    } else {
      setCheckoutLoading(false);
      router.push("/checkout");
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-2xl border shadow-sm text-center max-w-md w-full">
          <Toast ref={toastRef} position="top-right" />
          <div className="text-6xl mb-4">🛒 </div>
          <h2 className="text-2xl font-black text-slate-900">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm mt-2 mb-6">
            It looks like your shopping cart is empty. Start adding some items
            to your cart!
          </p>
          <Link
            href="/"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition duration-200 shadow-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Toast ref={toastRef} position="top-right" />

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">
          Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-gray-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border">
                    <Image
                      src={
                        item.product.images?.[0] ||
                        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <h3 className="font-bold text-slate-800 text-base line-clamp-1">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-400 text-xs uppercase font-semibold">
                      {item.product.category?.name}
                    </p>
                    <p className="text-slate-900 font-extrabold text-sm pt-1">
                      ${item.product.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white rounded-lg transition font-bold"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white rounded-lg transition font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-gray-400 hover:text-red-500 p-2 transition-colors rounded-xl hover:bg-red-50"
                    title="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right">
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
              >
                Clear All Items
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 lg:sticky lg:top-28">
            <h2 className="text-lg font-black text-slate-900 tracking-tight border-b pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">
                  ${getTotalPrice()}
                </span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-base pt-1">
                <span className="font-bold text-slate-900">Total Bill</span>
                <span className="font-black text-slate-900 text-xl">
                  ${getTotalPrice()}
                </span>
              </div>
            </div> 

            <Button
              label={checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              icon={
                checkoutLoading ? "pi pi-spin pi-spinner" : "pi pi-shopping-bag"
              }
              loading={checkoutLoading}
              onClick={handleCheckout}
              className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
              style={{ backgroundColor: "#0f172a", borderColor: "#0f172a" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}