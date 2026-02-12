export default function ClearWishlistModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-md p-6 w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold mb-2">Clear wishlist?</h2>

        <p className="text-sm text-gray-600 mb-4">
          This will remove all items from your wishlist.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-primary text-white rounded cursor-pointer"
          >
            Yes, clear
          </button>
        </div>
      </div>
    </div>
  );
}
