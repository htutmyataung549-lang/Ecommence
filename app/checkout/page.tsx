"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/app/store/useCartStore";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

export default function CheckoutPage() {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);
  const { cart, getTotalPrice, clearCart } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 10 : 0; // Fixed Shipping Fee $10
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toastRef.current?.show({
        severity: "error",
        summary: "Cart Empty",
        detail: "Your cart is empty. Add some products first!",
        life: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    const finalOrder = {
      ...formData,
      items: cart,
      paymentMethod,
      subtotal,
      shipping,
      total,
    };
    console.log("Submitting Order Data:", finalOrder);

    // Fake API Order Processing Delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    clearCart();
    router.push("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-32 max-w-md mx-auto px-4">
        <i className="pi pi-shopping-bag text-5xl text-gray-300 mb-4 block" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          You need to add products to your cart before checking out.
        </p>
        <Button
          label="Go Shopping"
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Toast ref={toastRef} position="top-right" />
      <h1 className="text-3xl font-black text-slate-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Shipping Form & Payment Selection */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
          {/* Shipping Info Block */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-3">
              Shipping Information
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Full Name
              </label>
              <InputText
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:border-blue-500 transition-all outline-none"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Email Address
                </label>
                <InputText
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="p-3 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:border-blue-500 transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Phone Number
                </label>
                <InputText
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="p-3 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:border-blue-500 transition-all outline-none"
                  placeholder="09*****"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Street Address
              </label>
              <InputText
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:border-blue-500 transition-all outline-none"
                placeholder="No. 123, Main Street..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">
                City
              </label>
              <InputText
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-200 rounded-xl bg-slate-50 text-sm focus:border-blue-500 transition-all outline-none"
                placeholder="Yangon"
              />
            </div>
          </div>

          {/* Payment Methods Selection Block*/}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-3">
              Select Payment Method
            </h2>

            <div className="space-y-3">
              {/* Cash on Delivery (COD) Option */}
              <label
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === "cod" ? "border-slate-900 bg-slate-50 font-semibold" : "border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-slate-900"
                  />
                  <div>
                    <p className="text-sm text-slate-800">
                      Cash on Delivery (COD)
                    </p>
                    <p className="text-xs text-gray-400 font-normal">
                      {" "}
                      Pay with cash when your order is delivered.
                    </p>
                  </div>
                </div>
                <span className="text-xl">💵</span>
              </label>

              {/* Mobile Banking KPay / Wave Option */}
              <label
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === "kpay" ? "border-slate-900 bg-slate-50 font-semibold" : "border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="kpay"
                    checked={paymentMethod === "kpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-slate-900"
                  />
                  <div>
                    <p className="text-sm text-slate-800">
                      Mobile Banking (KPay / Wave)
                    </p>
                    <p className="text-xs text-gray-400 font-normal">
                      Transfer the payment via KPay or Wave and upload your
                      payment receipt.
                    </p>
                  </div>
                </div>
                <span className="text-xl">📱</span>
              </label>
            </div>

            {/* Info Box */}
            {/* Payment Information */}
            {paymentMethod === "kpay" && (
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs transition-all animate-fadein">
                <p className="font-bold text-sm text-amber-400 border-b border-gray-700 pb-1">
                  ⚠️ Payment Account Details
                </p>

                <p>
                  <span className="font-semibold text-gray-300">KBZPay:</span>{" "}
                  09 123 456 789 (U Ba)
                </p>

                <p>
                  <span className="font-semibold text-gray-300">WavePay:</span>{" "}
                  09 123 456 789 (U Ba)
                </p>

                <p className="text-gray-400 italic pt-1">
                  After placing your order, please send your payment receipt
                  (screenshot) along with your order number via Viber for
                  payment verification.
                </p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            label={
              isSubmitting
                ? "Processing Order..."
                : `Place Order ($${total.toLocaleString()})`
            }
            icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-credit-card"}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition shadow-md pt-4"
          />
        </form>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-gray-100 space-y-4 sticky top-6">
          <h2 className="text-lg font-bold text-slate-800 border-b border-gray-200 pb-3">
            Order Summary
          </h2>

          {/* Cart Items List */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 truncate">
                    {item.product.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-black text-slate-800">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Calculations */}
          <div className="space-y-2 pt-2 border-t border-gray-200 text-sm font-medium text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-bold text-slate-800">
                ${shipping.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-dashed border-gray-300">
              <span>Total Amount</span>
              <span className="text-blue-600">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
