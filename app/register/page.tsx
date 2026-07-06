"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toast } from "primereact/toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toastRef = useRef<Toast>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong during registration.");
      }

      // PrimeReact Toast Alert
      toastRef.current?.show({
        severity: "success",
        summary: "Registration Successful",
        detail: "Your account has been created! Redirecting to login...",
        life: 2000,
      });

      setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 2000);

    } catch (err: any) {
      setError(err.message);
      toastRef.current?.show({
        severity: "error",
        summary: "Registration Failed",
        detail: err.message,
        life: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <Toast ref={toastRef} position="top-right" />

      <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900">Create an Account</h1>
          <p className="text-gray-500 text-sm mt-1">Sign up to unlock all ecommerce features</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border font-bold text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-900 bg-gray-50"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border font-bold text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-900 bg-gray-50"
              placeholder="john@mail.com"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border font-bold text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-900 bg-gray-50"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition duration-200 text-sm shadow-sm active:scale-[0.98] disabled:bg-slate-400"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 font-semibold">
              Already have an account?{" "}
              <Link href="/login" className="text-slate-900 hover:underline font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}