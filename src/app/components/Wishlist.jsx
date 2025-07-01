"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Button, Divider, CircularProgress } from "@mui/material";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { removeFromWishlist } from "@/redux/slices/wishListSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const items = useSelector((state) => state.wishlist?.wishlistData || []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(2); // For "Load More"

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart 🛒");
  };

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div className="space-y-12 w-[90%] m-auto py-6">
      <h2 className="text-base md:text-2xl font-semibold">My Wishlist</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <CircularProgress size={25} color="inherit" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link href="/products">
            <Button variant="contained" className="!bg-black !text-white !py-2 !rounded-lg !text-sm hover:!scale-105 !capitalize !transition-transform !duration-300 !ease-in-out">
              Back to Shop
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {visibleItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-2 rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300"
              >
                <Link
                  href={`/product/${item.slug?.current || ""}`}
                  className="block"
                >
                  <div className="aspect-square relative rounded-xl overflow-hidden">
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
                    <p className="font-bold text-sm mt-1 self-end text-right">
                      ₦{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                </Link>

                <div className="flex justify-between items-center px-3 pb-3 mt-1">
                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                    aria-label="Add to cart"
                  >
                    <FaShoppingCart />
                  </button>
                  <button
                    onClick={() =>
                      dispatch(removeFromWishlist({ _id: item._id }))
                    }
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                    aria-label="Remove from wishlist"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < items.length && (
            <div className="relative flex items-center justify-center my-20">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full" />
              </div>
              <div className="relative z-10 bg-white px-4">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="border px-6 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  Load More
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <Divider />

      {!loading && items.length > 0 && (
        <div className="pt-6 mt-6 text-center">
          <Link href="/products">
            <Button variant="contained" className=" !bg-black !text-white !py-2 !rounded-lg !text-sm hover:!scale-105 !capitalize !transition-transform !duration-300 !ease-in-out">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}

      <Toaster />
    </div>
  );
}
