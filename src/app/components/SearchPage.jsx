'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import CircularProgress from '@mui/material/CircularProgress';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams.get('query') || '');

  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-[90%] m-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for “{query}”
      </h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <CircularProgress color='black' />
        </div>
      ) : allProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug.current}`}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-square relative rounded-xl overflow-hidden mb-2">
                  <img
                    src={product.imageUrl || '/placeholder.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-sm">{product.title}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
                <p className="text-sm font-bold mt-1">
                  ₦{Number(product.price).toLocaleString()}
                </p>
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
    </div>
  );
}
