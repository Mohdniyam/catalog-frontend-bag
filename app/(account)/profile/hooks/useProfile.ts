import { useState, useRef } from "react";
import { ProfileFormData } from "../types";

export const useProfile = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<ProfileFormData>({
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

  const handleImageChange = (file: File) => {
    setFormData((p) => ({ ...p, image: URL.createObjectURL(file) }));
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

  const handleAddressChange = (id: number, field: string, value: string) => {
    setFormData((p) => ({
      ...p,
      addresses: p.addresses.map((a) =>
        a.id === id ? { ...a, [field]: value } : a,
      ),
    }));
  };

  return {
    formData,
    isEditing,
    setIsEditing,
    fileInputRef,
    handleChange,
    handleImageChange,
    addNewAddress,
    removeAddress,
    handleAddressChange,
  };
};
