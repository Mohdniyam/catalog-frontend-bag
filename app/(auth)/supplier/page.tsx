"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SupplierPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [error, setError] = useState("");

  // Role protection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "SUPPLIER") {
      router.replace("/");
    }
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createProduct = async (e: any) => {
    // console.log(e);
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessData(null);

    try {
      const res = await fetch("https://ngtest.newgeebags.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      setSuccessData(data);

      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
      });
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Supplier Dashboard</h1>

      <form
        onSubmit={createProduct}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Create Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

        {successData && (
          <div className="mt-4 text-green-600 text-sm">
            Product Created ✔ <br />
            ID: {successData._id}
          </div>
        )}
      </form>
    </div>
  );
};

export default SupplierPage;
