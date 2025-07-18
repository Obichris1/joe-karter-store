"use client";

import {
  Box,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaHeart, FaRegHeart,FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishListSlice";
import { toast, Toaster } from "react-hot-toast";
import { useRef } from "react";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state.wishlist?.wishlistData || []);

  useEffect(() => {
    async function fetchTagsAndProducts() {
      try {
        const tags = await client.fetch(
          `array::unique(*[_type == "product"][]['tags'][] )`
        );
        setAllTags(tags || []);

        const products = await client.fetch(
          `*[_type == "product"]{
            _id,
            title,
            slug,
            price,
            category,
            label,
            tags,
            images[] {
              asset->{url}
            }
          }`
        );
        setProducts(products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchTagsAndProducts();
  }, []);

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const isInWishlist = (productId) =>
    Array.isArray(wishlistData) && wishlistData.some((item) => item._id === productId);

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

  const filteredProducts = products
    .filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const matchesSearch =
        title.includes(searchQuery) || category.includes(searchQuery);

      const matchesTag =
        selectedTag === "all" || product.tags?.includes(selectedTag);

      return matchesTag && matchesSearch;
    })
    .slice(0, visibleCount);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography className="!text-xl md:!text-2xl !mb-4" fontWeight="bold" gutterBottom>
          Shop All Products
        </Typography>

        <Box
          mt={2}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          alignItems="center"
          maxWidth={600}
          justifyContent="space-between"
        >
          <Box flex={1} width="100%">
            <InputLabel id="tag-select-label" className="!font-bold !mb-1">Filter by Tag</InputLabel>
            <Select
              fullWidth
              labelId="tag-select-label"
              value={selectedTag}
              onChange={handleTagChange}
            >
              <MenuItem value="all">All</MenuItem>
              {allTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box flex={1} width="100%">
            <InputLabel htmlFor="search" className="!font-bold !mb-1" >Search Products</InputLabel>
            <TextField
              id="search"
              fullWidth
              placeholder="Search by title or category"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
        </Box>
      </Box>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="grid-cols-4" key={product._id}>
            <Link
                  key={product._id}
                  href={`/product/${product.slug.current}`}
                  className="p-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300 block"
                >
                  <div className="aspect-square relative rounded-t-2xl overflow-hidden group">
                    {product.images?.length > 1 ? (
                      <ImageSlider images={product.images} />
                    ) : (
                      <Image
                        src={
                          product.images?.[0]?.asset?.url || "/placeholder.jpg"
                        }
                        alt={product.title}
                        fill
                        className="object-cover transition duration-300"
                      />
                    )}
                  </div>

                  <div className="p-3 flex flex-col">
                    <h3 className="font-semibold text-sm">{product.title}</h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <p className="font-bold text-sm md:text-base self-end">
                      ₦{Number(product.price).toLocaleString()}
                    </p>

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
            </div>
          ))
        ) : (
          <Typography variant="body1" mt={4}>
            No products found.
          </Typography>
        )}
      </div>

      {filteredProducts.length <
        products.filter((product) => {
          const title = product.title?.toLowerCase() || "";
          const category = product.category?.toLowerCase() || "";
          const matchesSearch =
            title.includes(searchQuery) || category.includes(searchQuery);
          const matchesTag =
            selectedTag === "all" || product.tags?.includes(selectedTag);
          return matchesTag && matchesSearch;
        }).length && (
        <Box mt={6} textAlign="center">
          <Button variant="contained" className="!bg-black !text-white !text-sm md:!text-base !capitalize !rounded-2xl" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
      <Toaster />
    </Container>
  );
};

export default ShopPage;


function ImageSlider({ images }) {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);
  
    useEffect(() => {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 10000);
      return () => clearInterval(intervalRef.current);
    }, [images]);
  
    const prevImage = (e) => {
      e.preventDefault();
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    };
  
    const nextImage = (e) => {
      e.preventDefault();
      setIndex((prev) => (prev + 1) % images.length);
    };
  
    return (
      <div className="relative w-full h-full">
        <Image
          src={images[index]?.asset?.url || "/placeholder.jpg"}
          alt="Product Image"
          fill
          className="object-cover transition duration-500"
        />
  
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-1"
              aria-label="Previous Image"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-1"
              aria-label="Next Image"
            >
              <FaChevronRight size={14} />
            </button>
          </>
        )}
      </div>
    );
  }