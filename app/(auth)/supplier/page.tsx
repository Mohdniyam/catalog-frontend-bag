"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SupplierPage = () => {
  const router = useRouter();
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

  return <div className="min-h-screen">SupplierPage</div>;
};

export default SupplierPage;
