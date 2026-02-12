"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";

export default function SignupForm({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (formData: {
    name: string;
    email: string;
    password: string;
  }) => void;
  loading: boolean;
  error: string;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm h-150 overflow-auto">
        <h2 className="flex justify-center text-3xl font-bold mb-2">Welcome</h2>

        <p className="flex justify-center text-md text-gray-600 mb-8">
          Please signup to continue
        </p>

        {/* Tabs */}
        <div className="flex justify-center">
          {/* Toggle Button */}
          <div className="bg-[#70707040] rounded-lg flex">
            <Link
              href="/login"
              className={`px-10 py-2 rounded-md ${
                isLogin ? "bg-primary text-white" : "text-primary"
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`px-10 py-2 rounded-md ${
                !isLogin ? "bg-primary text-white" : "text-primary"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>
        {/* Form fields */}
        <form onSubmit={handleSubmit} className="grid">
          <label className="text-primary my-2">Username</label>
          <input
            name="name"
            placeholder="User name"
            type="text"
            className="border px-2 py-2 rounded-md"
            onChange={handleChange}
          />

          <label className="text-primary my-2">Email</label>
          <input
            name="email"
            placeholder="user@email.com"
            type="email"
            className="border p-2 rounded-md"
            onChange={handleChange}
          />

          <label className="text-primary my-2">Password</label>
          <input
            name="password"
            placeholder="Enter your password"
            type="password"
            className="border p-2 rounded-md"
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-10 py-2 mt-6 rounded-md bg-primary text-white"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating
              </>
            ) : (
              <>
                Sign Up <LogIn size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
