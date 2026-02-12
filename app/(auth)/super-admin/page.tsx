"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Supplier = {
  _id: string;
  name: string;
  email: string;
  status: string;
};

const SuperAdminPage = () => {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingSuppliers = async (token: string) => {
    try {
      const res = await fetch(
        "https://ngtest.newgeebags.com/api/suppliers/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      console.log("PENDING SUPPLIER LIST :", data);
      console.log("STATUS:", res.status);

      // safety check
      setSuppliers(data);
    } catch (err) {
      console.log("Error fetching suppliers", err);
    } finally {
      setLoading(false);
    }
  };

  const approveSupplier = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`https://ngtest.newgeebags.com/api/suppliers/${id}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // refresh list
      fetchPendingSuppliers(token);
    } catch (err) {
      console.log("Approval error");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");

    const user = userData ? JSON.parse(userData) : null;

    // auth check first
    if (!user || !token) {
      router.replace("/login");
      return;
    }

    if (user.role !== "SUPER_ADMIN") {
      router.replace("/");
      return;
    }

    // fetch only if authorized
    fetchPendingSuppliers(token);
  }, [router]);

  return (
    <section className="min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Pending Suppliers</h2>

        {loading && <p>Loading...</p>}

        {!loading && suppliers.length === 0 && (
          <p className="text-gray-500">No pending suppliers</p>
        )}

        {suppliers.map((s) => (
          <div
            key={s._id}
            className="border p-4 mb-3 flex justify-between items-center rounded-lg"
          >
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-gray-500">{s.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <p
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  s.status === "APPROVED"
                    ? "bg-green-300 text-green-800"
                    : "bg-amber-200 text-amber-800"
                }`}
              >
                {s.status}
              </p>

              <button
                onClick={() => approveSupplier(s._id)}
                disabled={s.status === "APPROVED"}
                className={`px-4 py-1 rounded text-white text-sm
        ${
          s.status === "APPROVED"
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary hover:opacity-90"
        }`}
              >
                {s.status === "APPROVED" ? "Approved" : "Approve"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuperAdminPage;
