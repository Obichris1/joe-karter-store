"use client";

import React, { useState } from "react";
import { Box, Grid, Typography, Select, MenuItem, InputLabel, TextField, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishListSlice";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";

 function ShopPage({ category, products = [], allTags = [] }) {
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [subCategory, setSubCategory] = useState("all");

  const router = useRouter();
  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state.wishlist?.wishlistData || []);

  const isInWishlist = (id) =>
    Array.isArray(wishlistData) &&
    wishlistData.some((item) => item._id === id);

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

  // filtering logic
  const fullyFilteredProducts = products.filter((p) => {
    const title = p.title?.toLowerCase() || "";
    const cat = p.category?.toLowerCase() || "";
    const matchesSearch = title.includes(searchQuery) || cat.includes(searchQuery);
    const matchesTag = selectedTag === "all" || p.tags?.includes(selectedTag);
    const matchesSubCategory =
      category?.toLowerCase() !== "athleisure" ||
      subCategory === "all" ||
      p.tags?.map((t) => t.toLowerCase()).includes(subCategory.toLowerCase());

    return matchesSearch && matchesTag && matchesSubCategory;
  });

  const filteredProducts = fullyFilteredProducts.slice(0, visibleCount);

  return (
    <div className="!w-[95%] !m-auto px-6 py-4">
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Box mb={4}>
        <Typography
          className="!text-xl md:!text-2xl !mb-4"
          fontWeight="bold"
          gutterBottom
        >
          Shop all products
        </Typography>

        <Box
          mt={2}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          alignItems="center"
          maxWidth={900}
          justifyContent="space-between"
        >
          <Box flex={1} width="100%">
            <InputLabel
              id="tag-select-label"
              className="!font-bold !text-sm md:!text-base !mb-1"
            >
              Filter by categories
            </InputLabel>
            <Select
              fullWidth
              labelId="tag-select-label"
              value={selectedTag}
              onChange={handleTagChange}
              className="!text-sm md:!text-base"
            >
              <MenuItem className="!text-sm md:!text-base" value="all">
                All
              </MenuItem>
              {allTags.map((tag) => (
                <MenuItem
                  key={tag}
                  value={tag}
                  className="!text-sm md:!text-base"
                >
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box flex={1} width="100%">
            <InputLabel
              htmlFor="search"
              className="!font-bold !text-sm md:!text-base !mb-1"
            >
              Search products
            </InputLabel>
            <TextField
              id="search"
              fullWidth
              placeholder="Enter a product name"
              value={searchQuery}
              className="!text-sm md:!text-base"
              onChange={handleSearchChange}
            />
          </Box>

          {category?.toLowerCase() === "athleisure" && (
            <Box flex={1} width="100%">
              <InputLabel
                id="sub-category-label"
                className="!font-bold !text-sm md:!text-base !mb-1"
              >
                Filter by Timeline
              </InputLabel>
              <Select
                fullWidth
                labelId="sub-category-label"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="!text-sm md:!text-base"
              >
                <MenuItem className="!text-xs md:!text-sm" value="all">All</MenuItem>
                <MenuItem className="!text-xs md:!text-sm"  value="mantra">The Mantra</MenuItem>
                <MenuItem className="!text-xs md:!text-sm"  value="origin">The Origin</MenuItem>
                <MenuItem className="!text-xs md:!text-sm"  value="aftermath">The Aftermath</MenuItem>
              </Select>
            </Box>
          )}
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress size={24} color="#000" />
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Box textAlign="center" mt={10}>
          <Typography className="!text-sm md:!text-base " variant="h6" color="textSecondary">
            No products found
          </Typography>
        </Box>
      ) : (
        <div className="grid grid-cols-2 gap md:grid-cols-5 gap-3">
          {filteredProducts.map((product) => (
            <Grid item xs={6} sm={6} md={3} key={product._id}>
              <Link
                href={`/product/${product.slug.current}`}
                className="p-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform duration-300 block"
              >
                <div className="aspect-square relative rounded-t-2xl overflow-hidden group">
                  {product.images?.length > 1 ? (
                    <ImageSlider images={product.images} />
                  ) : (
                    <Image
                      src={product.images?.[0]?.asset?.url || "/placeholder.jpg"}
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
                    ₦
                    {typeof product.price === "number"
                      ? product.price.toLocaleString()
                      : "0"}
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
            </Grid>
          ))}
        </div>
      )}

      {!loading && fullyFilteredProducts.length > filteredProducts.length && (
        <Box mt={6} textAlign="center">
          <Button
            variant="outlined"
            className="!border !px-6 !py-2 !rounded-full md:!text-sm !text-xs !text-black !border-black hover:!bg-black hover:!text-white !capitalize !transition"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </Box>
      )}

      <Toaster />
    </div>
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
