import { UserRoundCog } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";

export default function ProfileSidebar({
  formData,
  editMode,
  fileInputRef,
  onImageChange,
  onEditProfile,
  onEditAddress,
}: any) {
  return (
    <div className="w-full lg:w-1/3">
      <div className="flex flex-col h-full px-auto gap-4">
        <div className="w-full flex flex-row items-center bg-[#fdfcf8] rounded-xs shadow-xl  px-4 py-4">
          <div className="p-2">
            <ProfileAvatar
              image={formData.image}
              isEditing={editMode === "profile"}
              onClick={() =>
                editMode === "profile" && fileInputRef.current?.click()
              }
            />

            {editMode === "profile" && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onImageChange}
              />
            )}
          </div>
          <div className="">
            {/* User Greeting Text */}
            <div className="flex flex-col justify-center px-2">
              <span className="flex text-sm">Hello,</span>
              <h2 className="text-xl text-primary font-semibold">
                {formData.firstName} {formData.lastName}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full bg-[#fdfcf8] rounded-xs shadow-xl">
          <div className="flex gap-4 text-lg font-semibold uppercase tracking-wide text-gray-400  px-8 py-4 border-b">
            <UserRoundCog className="" /> Account Settings
          </div>
          <div className="bg-[#fdfcf8] my-4">
            <button
              onClick={onEditProfile}
              className={`w-full flex items-center gap-2 px-8 py-3 text-sm font-semibold cursor-pointer
    ${editMode === "profile" ? "bg-primary/10 text-primary" : "hover:bg-primary/10 text-primary"}
  `}
            >
              Profile Information
            </button>
            <button
              onClick={onEditAddress}
              className={`w-full flex items-center gap-2 px-8 py-3 text-sm font-semibold cursor-pointer
    ${editMode === "address" ? "bg-primary/10 text-primary" : "hover:bg-primary/10 text-primary"}
  `}
            >
              Manage Addresses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
