"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";

import ProfileSidebar from "./components/ProfileSidebar";
import PersonalInfo from "./components/PersonalInfo";
import AddressSection from "./components/AddressSection";

export default function ProfileClient() {
  const [editMode, setEditMode] = useState<"none" | "profile" | "address">(
    "none",
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    firstName: "Aamir",
    lastName: "Hashmi",
    gender: "Male",
    email: "user@email.com",
    mobile: "+91 98765 43210",
    image: "",
    addresses: [
      {
        id: 1,
        line1: "H.No 123, Sector 15",
        city: "Faridabad",
        state: "Haryana",
        pincode: "121007",
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((p) => ({ ...p, image: URL.createObjectURL(file) }));
  };

  const handleAddressChange = (id: number, field: string, value: string) => {
    setFormData((p) => ({
      ...p,
      addresses: p.addresses.map((a) =>
        a.id === id ? { ...a, [field]: value } : a,
      ),
    }));
  };

  const addNewAddress = () => {
    setFormData((p) => ({
      ...p,
      addresses: [
        ...p.addresses,
        { id: Date.now(), line1: "", city: "", state: "", pincode: "" },
      ],
    }));
  };

  const removeAddress = (id: number) => {
    setFormData((p) => ({
      ...p,
      addresses: p.addresses.filter((a) => a.id !== id),
    }));
  };

  return (
    <div className="min-h-screen inset-0 z-50 bg-[#f1f3f6] backdrop-blur-sm py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <ProfileSidebar
            formData={formData}
            editMode={editMode}
            fileInputRef={fileInputRef}
            onImageChange={handleImageChange}
            onEditProfile={() => setEditMode("profile")}
            onEditAddress={() => setEditMode("address")}
          />

          <div className="w-full lg:w-4/5 bg-[#fdfcf8] text-primary rounded-xs shadow-xl p-6">
            <PersonalInfo
              formData={formData}
              isEditing={editMode === "profile"}
              onChange={handleChange}
            />

            <AddressSection
              addresses={formData.addresses}
              isEditing={editMode === "address"}
              onAdd={addNewAddress}
              onRemove={removeAddress}
              onChange={handleAddressChange}
            />

            {editMode !== "none" && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setEditMode("none");
                    toast.success("Changes saved successfully!");
                  }}
                  className="px-6 py-2 rounded-lg bg-primary text-white"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditMode("none")}
                  className="px-6 py-2 rounded-lg border"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
