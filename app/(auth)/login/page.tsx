"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/src/components/LoginForm";
import { toast } from "sonner";

type Role = "CUSTOMER" | "SUPPLIER" | "SUPER_ADMIN";

export default function LoginPage() {
  const router = useRouter();

  // Single source of truth
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // STEP 1: Auto fill from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("registeredUser");
    if (stored) {
      const user = JSON.parse(stored);

      setFormData({
        email: user.email,
        password: user.password,
      });
    }
  }, []);

  const handleLogin = async (formData: { email: string; password: string }) => {
    setLoading(true);
    setError("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://ngtest.newgeebags.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();
      console.log("LOGIN_RESPONSE:", data);

      if (!response.ok) {
        console.log("ERROR_STATUS:", response.status);

        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      setTimeout(() => {
        toast.success("Successfully Logged in!");
      }, 1000);

      //  Save token
      localStorage.setItem("token", data.token);

      //  Role from backend
      const backendRole: Role = data.role;

      // Save user role
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          email,
          role: backendRole,
        }),
      );

      window.dispatchEvent(new Event("userLoggedIn"));

      //  Redirect based on role
      if (backendRole === "SUPER_ADMIN") {
        router.replace("/super-admin");
      } else if (backendRole === "SUPPLIER") {
        router.replace("/supplier");
      } else {
        router.replace("/");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
