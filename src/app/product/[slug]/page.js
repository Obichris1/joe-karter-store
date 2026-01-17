"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { FaMinus, FaPlus, FaRegHeart, FaHeart } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { Button, Typography, Divider } from "@mui/material";
import Product from "@/app/components/Product";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishListSlice";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [useCustomMeasurement, setUseCustomMeasurement] = useState(false);
  const [customMeasurement, setCustomMeasurement] = useState("");
  const [isSliding, setIsSliding] = useState(false);
  const [useCustomColor, setUseCustomColor] = useState(false);
  const [customColor, setCustomColor] = useState("");

  const LEATHER_SIZES = [
    "39",
    "40",
    "40-41",
    "41",
    "41-42",
    "42-43",
    "43",
    "43-44",
    "44",
    "44-45",
    "45",
    "45-46",
    "46",
    "46-47",
    "47",
    "47-48",
  ];

  const ATHLEISURE_SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

  const LEATHER_COLORS = ["Black", "Brown", "Tan", "Burgundy", "Navy", "Olive"];

  const ATHLEISURE_COLORS = [
    "Black",
    "White",
    "Gray",
    "Blue",
    "Red",
    "Green",
    "Purple",
  ];

  const getSizesForCategory = (category) => {
    if (!category) return [];
    if (category.toLowerCase() === "leather") return LEATHER_SIZES;
    if (category.toLowerCase() === "athleisure") return ATHLEISURE_SIZES;
    return []; // fallback: no sizes
  };

  const getColorsForCategory = (category) => {
    if (category?.toLowerCase().includes("leather")) {
      return LEATHER_COLORS;
    }
    if (category?.toLowerCase().includes("athleisure")) {
      return ATHLEISURE_COLORS;
    }
    return [];
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "product" && slug.current == $slug][0]{
        _id,
        title,
        price,
        slug,
        images[]{asset->{url}},
        sizes,
        colors,
        category
      }`;
      const result = await client.fetch(query, { slug });
      setProduct(result);
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  useEffect(() => {
    if (!product) return; // wait until product is fetched
    const fetchRelatedProducts = async () => {
      const query = `*[_type == "product" && category == "${product.category}" && slug.current != "${slug}"]{
        _id,
        title,
        slug,
        price,
        label,
        category,
        images[]{ asset->{ url } }
      }`;
      const result = await client.fetch(query);
      setProducts(result);
    };
    fetchRelatedProducts();
  }, [product]); // runs only when product changes

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        slug: product.slug.current,
        title: product.title,
        price: product.price,
        image: product.images?.[0]?.asset?.url || "",
        quantity,
        size: useCustomMeasurement ? customMeasurement : selectedSize,
        color: selectedColor,
      })
    );

    toast.success(`${product?.title.substring(0, 15)} added to cart`);
  };

  const wishlistData = useSelector(
    (state) => state.wishlist?.wishlistData || []
  );

  const isInWishlist = (id) =>
    Array.isArray(wishlistData) && wishlistData.some((item) => item._id === id);

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isInWishlist(product._id)) {
      dispatch(removeFromWishlist({ _id: product._id }));
      toast("Removed from wishlist", { icon: "❌" });
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };

  const handleNextImage = () => {
    setIsSliding(true);
    setTimeout(() => {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
      setIsSliding(false);
    }, 300);
  };

  const handlePrevImage = () => {
    setIsSliding(true);
    setTimeout(() => {
      setSelectedImage((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
      setIsSliding(false);
    }, 300);
  };

  if (!product) {
    return (
      <div className="p-10 flex justify-center items-center">
        <CircularProgress size={25} sx={{ color: "#000", fontSize: "2px" }} />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto w-[90%] py-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-40">
        {/* Images */}
        <div className="relative">
          <IconButton
            className="!mb-4"
            onClick={() => router.back()}
            aria-label="go back"
          >
            <ArrowBackIcon />
          </IconButton>

          <div className="relative aspect-auto rounded-xl overflow-hidden">
            <Image
              src={product.images[selectedImage]?.asset.url}
              alt={product.title}
              width={800}
              height={800}
              className={`object-cover h-[90%] transition-transform duration-300 ease-in-out ${
                isSliding ? "scale-95 opacity-80" : "scale-100 opacity-100"
              }`}
            />
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 bg-white/70 hover:bg-white rounded-full p-1 z-10"
            >
              ◀
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 bg-white/70 hover:bg-white rounded-full p-1 z-10"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8 md:space-y-6 ">
          <div>
            <h1 className="text-base md:text-xl  mb-2">{product.title}</h1>
            <p className="text-xl md:text-2xl font-bold ">
              ₦{Number(product.price).toLocaleString()}
            </p>
          </div>

          {/* Size */}
          <div>
            <h3 className="font-semibold ">Sizes*</h3>

            {!useCustomMeasurement && (
              <select
                value={selectedSize || ""}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border p-2 rounded my-3 text-sm"
              >
                <option value="">Select a size</option>
                {getSizesForCategory(product.category).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            )}

            <Button
              onClick={() => setUseCustomMeasurement((prev) => !prev)}
              className="!text-xs !capitalize !text-black !underline !font-normal !p-0 mt-2"
            >
              {useCustomMeasurement
                ? "Select from standard sizes"
                : "Use your own measurement"}
            </Button>

            {useCustomMeasurement && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Enter your measurement"
                  value={customMeasurement}
                  onChange={(e) => setCustomMeasurement(e.target.value)}
                  className="w-full border p-2 rounded text-xs"
                />
              </div>
            )}
          </div>

          {/* Color */}
          <div>
            <h3 className="font-semibold mb-1 mt-4">Color*</h3>

            {!useCustomColor ? (
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border p-2 rounded text-xs"
              >
                <option value="">Select a color</option>
                {getColorsForCategory(product.category).map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Enter your color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setSelectedColor(e.target.value); // keep them in sync
                }}
                className="w-full border p-2 rounded text-xs"
              />
            )}

            <Button
              onClick={() => {
                setUseCustomColor((prev) => !prev);
                setCustomColor("");
                setSelectedColor("");
              }}
              className="!text-xs !capitalize !text-black !underline !font-normal !p-0 mt-2"
            >
              {useCustomColor
                ? "Select from standard colors"
                : "Use your own color"}
            </Button>
          </div>

          {/* Quantity */}
          <div>
            <h3 className=" mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="border rounded-full p-2"
              >
                <FaMinus size={14} className=" hover:cursor-pointer" />
              </button>
              <span className="text-base font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="border rounded-full p-2"
              >
                <FaPlus size={14} className=" hover:cursor-pointer" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-8 items-center">
            <Button
              variant="contained"
              onClick={handleAddToCart}
              className="md:!px-18 !px-12 !py-3 !rounded-full  !text-xs md:!text-sm !bg-black !text-white hover:scale-105  !transition-transform !duration-300 !ease-in-out !capitalize"
            >
              Add to Cart
            </Button>
            <button
              className="border rounded-full p-3"
              onClick={handleWishlistToggle}
              aria-label={
                isInWishlist(product._id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              {isInWishlist(product._id) ? (
                <FaHeart size={18} className="text-red-500" />
              ) : (
                <FaRegHeart size={18} className="text-black" />
              )}
            </button>
          </div>

          {/* Extra Sections */}
          <div className="space-y-2 text-sm border-t pt-4">
            {[
              "Product Details",
              "Composition & Care",
              "Share Product",
              "Shipping & Returns",
            ].map((section) => (
              <div key={section}>
                <Button className=" !text-left !text-xs md:!text-sm !capitalize !font-medium !text-black hover:bg-none">
                  {section}
                </Button>
                <Divider />
              </div>
            ))}
          </div>
        </div>

        <Toaster />
      </div>

      {/* Recommended products */}
      <div className="w-[90%] m-auto overflow-hidden">
        <Typography variant="h6" className="!font-bold">
          You may also like
        </Typography>
        <div className="marquee">
          <div className="maylike-products-container overflow-hidden track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
