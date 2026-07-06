"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ⚠️ PrimeReact Components
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import { Toast } from "primereact/toast";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

export default function Navbar() {
  const { cart, fetchCart } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const menuRef = useRef<TieredMenu>(null);
  const toastRef = useRef<Toast>(null);

  const [cartCount, setCartCount] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [visibleLeft, setVisibleLeft] = useState<boolean>(false);

  // Default Fallback Image URL
  const defaultAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100";

  useEffect(() => {
    fetchCart();
    setIsMounted(true);
  }, [fetchCart]);

  useEffect(() => {
    if (isMounted) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    }
  }, [cart, isMounted]);

  const handleLogout = () => {
    toastRef.current?.show({
      severity: "info",
      summary: "Logged Out",
      detail: "You have been logged out successfully.",
      life: 1500,
    });

    setTimeout(() => {
      setVisibleLeft(false);
      logout();
      router.push("/");
      router.refresh();
    }, 1500);
  };

  const profileMenuItems = [
    { label: user?.name || "My Account", icon: "pi pi-user", disabled: true },
    { separator: true },
    { label: "Log Out", icon: "pi pi-sign-out", command: handleLogout },
  ];

  if (!isMounted) return null;

  return (
    <nav className="">
      {/* ⚠️ PrimeReact Toast */}
      <Toast ref={toastRef} position="top-right" />

      <div className="container mx-auto px-4 py-3.5 flex justify-between items-center">
        {/* Hamburger Menu (Mobile Only) */}
        <div className="block md:hidden">
          <Button
            icon="pi pi-bars"
            onClick={() => setVisibleLeft(true)}
            className="p-button-text text-white p-0 text-xl"
            style={{ width: "40px", height: "40px" }}
          />
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-wider hover:text-blue-400 transition"
        >
          Platzi <span className="text-blue-500">Store</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-300 hover:text-white font-semibold text-sm transition"
          >
            Home
          </Link>
          <Link
            href="/products-nav"
            className="text-gray-300 hover:text-white font-semibold text-sm transition"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-white font-semibold text-sm transition"
          >
            About Store
          </Link>
        </div>

        {/* Right Side Controls (Cart + Auth Profile) */}
        <div className="flex items-center gap-4">
          {/* Shopping Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-3.5 py-2 rounded-xl transition shadow-sm font-bold text-xs md:text-sm"
          >
            <i className="pi pi-shopping-cart text-base text-blue-400"></i>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black animate-pulse shadow">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop User Section */}
          <div className="hidden md:block">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-300 max-w-[100px] line-clamp-1">
                  {user.name}
                </span>
                {/* Profile Avatar */}
                <div
                  onClick={(e) => menuRef.current?.toggle(e)}
                  className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer hover:scale-105 transition shadow-sm bg-slate-800"
                >
                  <Image
                    src={
                      user?.avatar && user.avatar.startsWith("http")
                        ? user.avatar
                        : defaultAvatar
                    }
                    alt="User Profile"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultAvatar;
                    }}
                  />
                </div>
                {/* PrimeReact Dropdown Menu Popover */}
                <TieredMenu
                  model={profileMenuItems}
                  popup
                  ref={menuRef}
                  className="bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Responsive Sidebar Menu */}
      <Sidebar
        visible={visibleLeft}
        onHide={() => setVisibleLeft(false)}
        className="w-72 bg-slate-900 border-r border-slate-800 text-white"
      >
        <div className="flex flex-col h-full justify-between pt-4">
          <div className="space-y-6 flex flex-col">
            {/* Mobile Profile Header Section */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-800 rounded-2xl mb-2">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 bg-slate-700 flex-shrink-0">
                  <Image
                    src={
                      user?.avatar && user.avatar.startsWith("http")
                        ? user.avatar
                        : defaultAvatar
                    }
                    alt="User Profile Mobile"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultAvatar;
                    }}
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-black text-sm text-white truncate">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-black truncate">
                    {user.email || "Platzi User"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="border-b border-slate-800 pb-4 mb-2">
                <span className="text-lg font-black text-blue-500 tracking-wider">
                  Navigation
                </span>
              </div>
            )}

            {/* Links */}
            <Link
              href="/"
              onClick={() => setVisibleLeft(false)}
              className="text-black hover:text-white font-bold text-base flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <i className="pi pi-home text-blue-400"></i> Home
            </Link>
            <Link
              href="/products-nav"
              onClick={() => setVisibleLeft(false)}
              className="text-black hover:text-white font-bold text-base flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <i className="pi pi-box text-blue-400"></i> Products
            </Link>
            <Link
              href="/about"
              onClick={() => setVisibleLeft(false)}
              className="text-black hover:text-white font-bold text-base flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <i className="pi pi-info-circle text-blue-400"></i> About Store
            </Link>
          </div>

          {/* Mobile Bottom Auth Button */}
          <div className="border-t border-slate-800 pt-4 mb-4">
            {isAuthenticated ? (
              <Button
                label="Log Out"
                icon="pi pi-sign-out"
                onClick={handleLogout}
                className="w-full p-button-danger p-button-outlined rounded-xl font-bold text-sm py-2.5"
              />
            ) : (
              <Link href="/login" onClick={() => setVisibleLeft(false)}>
                <Button
                  label="Sign In"
                  icon="pi pi-sign-in"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm py-2.5"
                />
              </Link>
            )}
          </div>
        </div>
      </Sidebar>
    </nav>
  );
}
