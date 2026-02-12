import { Trash } from "lucide-react";
import { type AddressCardProps } from "../types";

export default function AddressCard({
  address,
  index,
  isEditing,
  onChange,
  onRemove,
  canRemove,
}: AddressCardProps) {
  const inputClass =
    "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm";

  return (
    <div className=" rounded-sm space-y-3">
      <div className="flex justify-between items-center">
        <p className="uppercase tracking-wide font-semibold text-gray-400">
          Address {index + 1}
        </p>

        {isEditing && canRemove && (
          <button
            onClick={() => onRemove(address.id)}
            className="text-sm text-primary/80 hover:text-primary cursor-pointer"
          >
            <Trash className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Address Line */}
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">
          Address Line
        </p>
        {isEditing ? (
          <input
            value={address.line1}
            onChange={(e) => onChange(address.id, "line1", e.target.value)}
            className={inputClass}
          />
        ) : (
          <p>{address.line1}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {["city", "state", "pincode"].map((field) => (
          <div key={field}>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              {field}
            </p>
            {isEditing ? (
              <input
                value={address[field]}
                onChange={(e) => onChange(address.id, field, e.target.value)}
                className={inputClass}
              />
            ) : (
              <p>{address[field]}</p>
            )}
          </div>
        ))}
        {/* <div className="">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Address type
          </p>
          <>
            {isEditing ? (
              <div className="flex items-center gap-4 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="address-type"
                    value="home"
                    className="accent-primary"
                  />
                  <span>Home</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="address-type"
                    value="Female"
                    className="accent-primary"
                  />
                  <span>Work</span>
                </label>
              </div>
            ) : (
              <p className="font-medium">{}</p>
            )}
          </>
        </div> */}
      </div>
    </div>
  );
}
