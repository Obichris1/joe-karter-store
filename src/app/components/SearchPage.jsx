"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishListSlice";
import { FaHeart, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams.get("query") || "");

  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const wishlistData = useSelector(
    (state) => state.wishlist?.wishlistData || []
  );

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const products = await client.fetch(
        `*[_type == "product" && $query in tags][]{
          _id,
          title,
          slug,
          price,
          category,
          label,
          "imageUrl": images[0].asset->url
        }`,
        { query }
      );
      setAllProducts(products);
      setLoading(false);
    }

    if (query) {
      fetchProducts();
    }
  }, [query]);

  const visibleProducts = allProducts.slice(0, visibleCount);

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
    <div className="w-[90%] m-auto py-8">
      <h1 className="text-base md:text-2xl font-semibold mb-4">
        Search Results for “{query}”
      </h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <CircularProgress size={25} color="inherit" />
        </div>
      ) : allProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4 text-sm md:text-base">
            No products found.
          </p>
          <Link href="/">
            <button className="border px-6 py-2  text-sm rounded-lg bg-black text-white hover:!scale-105  !transition capitalize !ease-in-out duration-300">
              Back to Shop
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {visibleProducts.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug.current}`}
                className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition block"
              >
                <div className="aspect-square relative rounded-xl overflow-hidden mb-2">
                  <img
                    src={product.imageUrl || "/placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium text-sm">{product.title}</h3>
                  <p className="text-xs text-gray-500">{product.category}</p>
                  <p className="text-sm font-bold mt-1 self-end">
                    ₦{Number(product.price).toLocaleString()}
                  </p>

                  {/* Action Buttons */}
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

          {visibleCount < allProducts.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="border px-6 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
      <Toaster />
    </div>
  );
}
