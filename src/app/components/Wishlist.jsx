"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { removeFromWishlist } from "@/redux/slices/wishListSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function WishlistPage() {
  const items = useSelector((state) => state.wishlist?.wishlistData || []);
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="space-y-12 w-[90%] m-auto py-6">
      <h2 className="text-2xl font-semibold">Your Wishlist</h2>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link href="/products">
            <Button variant="contained" className="!bg-black !text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative group bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300"
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <Link
                href={`/product/${item.slug?.current || ""}`}
                className="block p-2"
              >
                <div className="aspect-square relative rounded-t-2xl overflow-hidden">
                  <Image
                    src={
                      item.image?.asset?.url ||
                      item.images?.[0]?.asset?.url ||
                      "/placeholder.jpg"
                    }
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.category}</p>
                  <p className="font-bold text-right text-sm mt-1">
                    ₦{Number(item.price).toLocaleString()}
                  </p>
                </div>
              </Link>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                  aria-label="Add to cart"
                >
                  <FaShoppingCart />
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist({ _id: item._id }))}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition text-red-500"
                  aria-label="Remove from wishlist"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continue Shopping */}
      {items.length > 0 && (
        <div className="border-t pt-6 mt-6 text-right">
          <Link href="/products">
            <Button variant="contained" className="!bg-black !text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}

      <Toaster />
    </div>
  );
}
