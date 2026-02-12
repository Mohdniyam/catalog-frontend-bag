import { Image } from "lucide-react";

export default function ProfileAvatar({ image, isEditing, onClick }: any) {
  return (
    <div
      className="relative w-18 h-18 rounded-full bg-linear-to-br from-primary/30 to-primary/10 p-1 cursor-pointer group transition"
      onClick={onClick}
    >
      <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Image className="text-primary/60 w-6 h-6" />
        )}
      </div>

      {isEditing && (
        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition">
          Change Photo
        </div>
      )}
    </div>
  );
}
