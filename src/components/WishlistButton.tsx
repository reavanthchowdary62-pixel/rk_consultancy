"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

export function WishlistButton({ id, name }: { id: string; name: string }) {
  const { toggle, isWishlisted } = useWishlist();
  const saved = isWishlisted(id);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggle(id); }}
      title={saved ? "Remove from wishlist" : "Add to wishlist"}
      className={`p-1.5 rounded-full transition-all ${saved ? "text-red-500 bg-red-50 dark:bg-red-900/30" : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"}`}
    >
      <Heart size={16} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
