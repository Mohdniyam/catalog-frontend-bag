"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";

export default function LoginForm({
  onSubmit,
  loading,
  error,
  formData,
  setFormData,
}: {
  onSubmit: (formData: { email: string; password: string }) => void;
  loading: boolean;
  error: string;
  formData: { email: string; password: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          login to continue or create new Account
        </p>

        {/* Tabs */}
        <div className="flex justify-center">
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

        <form onSubmit={handleSubmit} className="grid">
          <label className="text-primary my-2">Email</label>
          <input
            name="email"
            placeholder="user@email.com"
            value={formData.email}
            type="email"
            className="border px-2 py-2 rounded-md"
            onChange={handleChange}
          />

          <label className="text-primary my-2">Password</label>
          <input
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            type="password"
            className="border px-2 py-2 rounded-md"
            onChange={handleChange}
          />

          <Link href="/forgot-password" className="ml-auto my-2 text-primary">
            Forgot Password?
          </Link>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-10 py-2 mt-4 rounded-md bg-primary text-white"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Logging in
              </>
            ) : (
              <>
                Login <LogIn size={18} />
              </>
            )}
          </button>

          <p className="text-md text-gray-500 mt-3 text-center">
            Not an Account?{" "}
            <Link href="/signup" className="text-primary">
              Signup now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
