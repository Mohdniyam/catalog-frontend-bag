"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/src/components/SignupForm";
import { toast } from "sonner";

type Role = "CUSTOMER" | "SUPPLIER" | "SUPER_ADMIN";

export default function SignupPage() {
  const router = useRouter();
  const role: Role = "CUSTOMER";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://ngtest.newgeebags.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        },
      );

      const data = await res.json();
      console.log("CUSTOMER_SIGNUP_DATA: ", data);

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Save for login autofill
      localStorage.setItem(
        "signupCreds",
        JSON.stringify({
          email,
          password,
        }),
      );

      // Redirect to login
      router.replace("/login");
      toast.success("Signup successfully!");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mh-full">
      <SignupForm onSubmit={handleSignup} loading={loading} error={error} />
    </div>
  );
}
