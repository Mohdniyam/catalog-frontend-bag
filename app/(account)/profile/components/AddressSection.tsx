import AddressCard from "./AddressCard";
import { type AddressSectionProps } from "../types";

export default function AddressSection({
  addresses,
  isEditing,
  onAdd,
  onRemove,
  onChange,
}: AddressSectionProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold uppercase tracking-wide text-primary mb-4">
        Address
      </h3>

      <div className="space-y-4">
        {addresses.map((address, index) => (
          <AddressCard
            key={address.id}
            address={address}
            index={index}
            isEditing={isEditing}
            onChange={onChange}
            onRemove={onRemove}
            canRemove={addresses.length > 1}
          />
        ))}
      </div>

      {isEditing && (
        <button
          onClick={onAdd}
          className="mt-4 px-4 py-2 text-sm rounded-lg border border-primary text-primary hover:bg-primary/10 transition"
        >
          + Add New Address
        </button>
      )}
    </div>
  );
}
