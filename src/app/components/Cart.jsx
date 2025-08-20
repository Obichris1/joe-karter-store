"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  increaseQuantity,
  deleteProduct,
  decreaseQuantity,
} from "@/redux/slices/cartSlice";
import Link from "next/link";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const items = useSelector((state) => state.cart.productData);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    if (items !== undefined) {
      setIsCartLoading(false);
    }
  }, [items]);

  const subtotal = items.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const deliveryFee = 500;
  const discount = 500;
  const total = subtotal + deliveryFee - discount;

  if (isCartLoading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress size={25} sx={{ color: "#000" }} />
      </Box>
    );
  }

  return (
    <div className="flex flex-col w-[90%] m-auto lg:flex-row py-6 gap-8">
    
      {/* Cart Items */}
      <div className="flex-1">
      <IconButton onClick={() => router.back()} aria-label="go back">
      <ArrowBackIcon />
    </IconButton>
        <h2 className="text-base md:text-xl font-semibold mt-2 mb-4">
          Purchase Summary
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => {
              const price = Number(item.price) || 0;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        item.image?.asset?.url ||
                        item.images?.[0]?.asset?.url ||
                        "/placeholder.jpg"
                      }
                      alt={item.title || "Product image"}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="flex flex-col gap-3">
                      <p className="text-base">{item.title}</p>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm">Size: {item.size}</p>
                        <p className="text-sm">Color: {item.color}</p>
                      </div>
                      <p className="text-base font-bold mt-1">
                        ₦{price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-full px-2 py-1">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item))}
                        disabled={item.quantity === 1}
                        className="text-gray-600"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item))}
                        className="text-gray-600"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(deleteProduct(item))}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[500px] border rounded-xl mt-12 h-3/4 p-6">
        <h3 className="text-base md:text-xl font-semibold mb-6">Order Summary</h3>
        <div className="space-y-8">
          {items.map((item, index) => {
            const price = Number(item.price) || 0;
            const quantity = item.quantity || 1;
            return (
              <Box
                key={item._id || index}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {item.title} × {quantity}
                </span>
                <span className="font-bold">
                  ₦{(price * quantity).toLocaleString()}
                </span>
              </Box>
            );
          })}

          <hr />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>

        <Link href="/checkout">
          <Button className="!mt-8 !w-full !bg-black !text-white !capitalize !py-3 !rounded-xl !text-sm  hover:!scale-105 !transition-transform !duration-300 !ease-in-out">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
