"use client";

import { useState, useRef, Suspense } from "react"; // 🎯 Suspense ကို Import ထည့်ထားပါသည်
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

import { Toast } from "primereact/toast";
import Link from "next/link";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toastRef = useRef<Toast>(null);
  const loginStore = useAuthStore((state) => state.login);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Email is not registered or password is incorrect",
        );
      }

      //  User Profile Data Fetch
      const profileRes = await fetch(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );

      const userData = await profileRes.json();

      if (!profileRes.ok) {
        throw new Error("Failed to fetch user profile");
      }

      loginStore(data.access_token, {
        name: userData.name,
        avatar: userData.avatar,
        email: userData.email,
      });

      clearCart();

      toastRef.current?.show({
        severity: "success",
        summary: "Login Successful",
        detail: `Welcome back, ${userData.name}! Your session is ready.`,
        life: 2000,
      });

      setTimeout(() => {
        router.push(redirect);
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      toastRef.current?.show({
        severity: "error",
        summary: "Login Failed",
        detail: err.message,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <Toast ref={toastRef} position="top-right" />

      <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900">
            Sign In Required
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Please log in to manage your checkout
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border font-bold text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-900 bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border font-bold text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-900 bg-gray-50"
              required
            />
          </div>

          <div className="space-y-4 w-full">
            <div className="grid grid-cols-4 gap-3 w-full">
              <Link
                href="/"
                className="col-span-1 border border-slate-300 hover:bg-gray-50 text-slate-700 font-bold py-3.5 rounded-xl transition duration-200 text-sm flex items-center justify-center shadow-sm active:scale-[0.98]"
                title="Home"
              >
                <i className="pi pi-home text-base"></i>
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="col-span-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition duration-200 text-sm shadow-sm active:scale-[0.98] disabled:bg-slate-400"
              >
                {loading ? "Checking Auth..." : "Log In & Continue"}
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-gray-500 font-semibold">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-slate-900 hover:underline font-bold"
                >
                  Register Here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-slate-500 font-bold text-sm">Loading login portal...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}