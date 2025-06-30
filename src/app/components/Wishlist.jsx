"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { removeFromWishlist } from "@/redux/slices/wishListSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast, Toaster } from "react-hot-toast";

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300"
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

              {/* Always-visible Action Buttons */}
              <div className="flex justify-between items-center px-4 pb-4">
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  className="flex items-center gap-1 text-xs text-black hover:text-white hover:bg-black border border-black px-3 py-1 rounded-full transition"
                >
                  <FaShoppingCart />
                  
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist({ _id: item._id }))}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-3 py-1 rounded-full transition"
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
