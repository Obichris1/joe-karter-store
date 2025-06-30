"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishListSlice";
import { toast, Toaster } from "react-hot-toast";

const sections = {
  topPicks: "Our Top Picks",
  featured: "Featured Collection",
  new: "New Arrivals",
};

export default function ProductSections({ products }) {
  const [visibleCounts, setVisibleCounts] = useState({
    topPicks: 8,
    featured: 3,
    new: 8,
  });
  const dispatch = useDispatch();

  const wishlistData = useSelector(
    (state) => state.wishlist?.wishlistData || []
  );

  const getSectionProducts = (label) =>
    products.filter((p) => p.label === label);

  const handleLoadMore = (key) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [key]: prev[key] + 4,
    }));
  };

  const isInWishlist = (productId) =>
    Array.isArray(wishlistData) &&
    wishlistData.some((item) => item._id === productId);

  const handleWishlistToggle = (e, product) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      dispatch(removeFromWishlist({ _id: product._id }));
      toast("Removed from wishlist", { icon: "❌" });
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="space-y-12 w-[95%] m-auto">
      {Object.entries(sections).map(([key, label]) => {
        const sectionProducts = getSectionProducts(key);
        const visibleCount = visibleCounts[key];

        return (
          <div key={key} className="px-4 mb-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-2xl font-semibold">{label}</h2>
              <Link
                href="/shop"
                className="border px-5 py-2 rounded-full text-xs md:text-sm  hover:bg-black hover:text-white transition"
              >
                Shop Now
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 md:gap-6 gap-4 ">
              {sectionProducts.slice(0, visibleCount).map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug.current}`}
                  className="p-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300 block"
                >
                  <div className="aspect-square relative rounded-t-2xl overflow-hidden">
                    <Image
                      src={
                        product.images?.[0]?.asset?.url || "/placeholder.jpg"
                      }
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3  flex flex-col">
                    <h3 className="font-semibold text-sm">{product.title}</h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <p className="font-bold text-sm md:text-base self-end">
                      ₦{Number(product.price).toLocaleString()}
                    </p>

                    {/* Buttons - Always visible */}
                    <div className="flex justify-between items-center mt-2">
                      <button
                        onClick={(e) => handleWishlistToggle(e, product)}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                        aria-label={
                          isInWishlist(product._id)
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {isInWishlist(product._id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                        aria-label="Add to cart"
                      >
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < sectionProducts.length && (
              <div className="relative flex items-center justify-center my-20">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative z-10 bg-white px-4">
                  <button
                    onClick={() => handleLoadMore(key)}
                    className="border px-6 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
                  >
                    Load More
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <Toaster />
    </div>
  );
}
