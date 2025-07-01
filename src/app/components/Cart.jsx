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
import { Button, CircularProgress, Box } from "@mui/material";

export default function CartPage() {
  const items = useSelector((state) => state.cart.productData);
  const dispatch = useDispatch();

  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    if (items !== undefined) {
      setIsCartLoading(false);
    }
  }, [items]);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 500;
  const discount = 500;
  const total = subtotal + deliveryFee - discount;

  if (isCartLoading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress size={20} sx={{ color: "#000", fontSize:"2px" }} />
      </Box>
    );
  }

  return (
    <div className="flex flex-col w-[90%] m-auto lg:flex-row py-6  gap-8">
      {/* Cart Items */}
      <div className="flex-1">
        <h2 className="text-base md:text-xl  font-semibold mb-4">Purchase Summary</h2>

        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
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
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity stepper */}
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
                  {/* Delete */}
                  <button
                    onClick={() => dispatch(deleteProduct(item))}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[500px] border rounded-xl mt-12 h-3/4 p-6">
        <h3 className="text-base md:text-xl  font-semibold mb-6">Order Summary</h3>
        <div className="space-y-8">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal</span>
            <span className="text-sm">₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Discount</span>
            <span className="text-sm">₦{discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Delivery Fee</span>
            <span className="text-sm">₦{deliveryFee.toLocaleString()}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Coupon input */}
        <div className="flex items-center mt-4 gap-2">
          <input
            placeholder="Promo code"
            className="flex-1 p-2 rounded-lg bg-gray-100 focus:outline-none"
          />
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:!scale-105 !transition !ease-in-out duration-300">
            Apply
          </button>
        </div>

        {/* Checkout */}
        <Link href="/checkout">
          <Button className="!mt-8 !w-full !bg-black !text-white !py-3 !rounded-xl !text-sm hover:!scale-105 !capitalize !transition-transform !duration-300 !ease-in-out">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
