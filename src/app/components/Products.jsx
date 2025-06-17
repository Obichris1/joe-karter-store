"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

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

  const getSectionProducts = (label) =>
    products.filter((p) => p.label === label);

  const handleLoadMore = (key) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [key]: prev[key] + 4,
    }));
  };

  return (
    <div className="space-y-12 w-[90%] m-auto">
      {Object.entries(sections).map(([key, label]) => {
        const sectionProducts = getSectionProducts(key);
        const visibleCount = visibleCounts[key];

        return (
          <div key={key} className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{label}</h2>
              <Link
                href="/shop"
                className="border px-5 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
              >
                Shop Now
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {sectionProducts.slice(0, visibleCount).map((product) => (
                <Link
                  href={`/product/${product.slug.current}`}
                  key={product._id}
                  className="p-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105"
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
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{product.title}</h3>
                    <p className="text-xs text-gray-500">
                      {product.category}
                    </p>
                    <p className="font-bold text-right text-sm mt-1">
                      ₦{Number(product.price).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < sectionProducts.length && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => handleLoadMore(key)}
                  className="border px-6 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
