"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const fields = [
  { name: "name", label: "Enter your name" },
  { name: "email", label: "Enter your Email", type: "email" },
  { name: "password", label: "Enter your Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];

const FloatingInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}: Props) => {
  return (
    <div className="relative mb-6">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border-0 border-b-2 border-gray-300 focus:border-primary focus:outline-none bg-transparent py-3"
      />

      <label
        className="
       absolute left-0 top-3 text-gray-500
        transition-all duration-200

       peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-primary

        peer-not-placeholder-shown:-top-2
        peer-not-placeholder-shown:text-xs
        peer-not-placeholder-shown:text-primary"
      >
        {label}
      </label>
    </div>
  );
};

const SupplierRegisterPage = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log("LOGIN BUTTON CLICKED!");
    router.replace("/login");
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // password match check
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // basic validation
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://ngtest.newgeebags.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            role: "SUPPLIER",
          }),
        },
      );

      const data = await res.json();
      console.log("API RESPONSE: ", data);

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Registration successful! Waiting for admin approval.");

      // redirect to login after success
      setTimeout(() => {
        setSuccess("");
        router.replace("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-1">
          Welcome
        </h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          Register to Become a Supplier
        </p>

        <div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-3">{success}</p>}
        </div>

        {fields.map((f) => (
          <FloatingInput
            key={f.name}
            label={f.label}
            name={f.name}
            type={f.type || "text"}
            value={form[f.name as keyof typeof form]}
            onChange={handleChange}
          />
        ))}
        <Button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <Button
          type="button"
          className="mt-2 w-full text-black cursor-pointer hover:bg-[#f3f0e9]/60 hover:text-black"
          variant="outline"
          onClick={handleClick}
        >
          Existing User? Login
        </Button>
      </form>
    </section>
  );
};

export default SupplierRegisterPage;
