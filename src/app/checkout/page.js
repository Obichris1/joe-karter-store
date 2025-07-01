"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { paystackTestKey } from "@/sanity/env";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Divider,
  CircularProgress,
  
InputAdornment,
  Paper,
} from "@mui/material";
import {
  AiFillMail,
  AiOutlineUser,
  AiFillCheckCircle,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineCheckCircle,
  AiFillPhone,
  AiFillHome,
  AiFillCode,
  AiFillMoneyCollect,
} from "react-icons/ai";

import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [isPaystackReady, setPaystackReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    promo: "",
  });

  const cart = useSelector((state) => state.cart.productData);
  const router = useRouter();

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (cart !== undefined) {
      setIsCartLoading(false);
    }
  }, [cart]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!isPaystackReady || !window.PaystackPop) {
      toast.error("Payment system not ready. Please wait...");
      return;
    }

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "state",
    ];
    for (const field of requiredFields) {
      if (!form[field]) {
        toast.error(`Please complete your delivery information`);
        return;
      }
    }

    if (!agreed) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, cart, total: cartTotal }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);
    } catch (err) {
      toast.error("Failed to send order details via email");
      setIsProcessing(false);
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackTestKey,
      email: form.email,
      amount: cartTotal * 100,
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: form.name,
          },
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: form.phone,
          },
        ],
      },
      callback: function () {
        toast.success("Payment successful! 🎉");
        setIsProcessing(false);
        router.push("/success");
      },
      onClose: function () {
        toast("Transaction cancelled");
        setIsProcessing(false);
      },
    });

    handler.openIframe();
  };

  // Handle loading or empty cart
  if (isCartLoading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
    <CircularProgress size={20} sx={{ color: "#000", fontSize:"2px" }} />
      </Box>
    );
  }

  if (cart.length === 0) {
    return (
      <Box className="max-w-3xl mx-auto py-20 px-6 text-center">
        <Typography variant="h5" fontWeight="bold">
          Your cart is empty.
        </Typography>
      </Box>
    );
  }

  return (
    <div className="flex flex-col md:w-[90%] mx-auto py-12  md:flex-row gap-36">
      {/* Shipping Info */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[50%]"
      >
        <Paper elevation={2} className="md:!p-8 !p-6 !rounded-xl">
          <Typography variant="h6" fontWeight="bold" className="!mb-6 !text-base md:!text-xl">
            Shipping Information
          </Typography>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              fullWidth
              required
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiOutlineUser />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiFillMail />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              required
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiFillPhone />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              required
              label="Street Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiFillHome/>
                    </InputAdornment>
                  ),
                },
              }}
              
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
              <TextField
                fullWidth
                required
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiFillHome/>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                fullWidth
                required
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiFillHome/>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <TextField
              fullWidth
              label="Promo Code (optional)"
              name="promo"
              value={form.promo}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiFillMoneyCollect/>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControlLabel
            className="p-0 !text-xs "
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  color="#000"

                  
                />
              }
            
              label="I agree to the Terms and Conditions"
            />
          </Box>
        </Paper>
      </motion.div>

      {/* Order Summary */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <Paper elevation={2} className="md:!p-8 !p-6 !rounded-xl">
          <Typography variant="h6" fontWeight="bold" className="!mb-6 !text-base md:!text-xl">
            Order Summary
          </Typography>
          <Box className="space-y-12">
            {cart.map((item) => (
              <Box
                key={item._id}
                className="flex justify-between border-b pb-2 text-sm text-gray-700"
              >
                <span className="font-semibold">
                  {item.title} × {item.quantity}
                </span>
                <span className="font-bold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </Box>
            ))}
            <Divider className="!space-y-8 !mb-8 !mt-8" />
            <Box className="flex justify-between  font-semibold">
              <span className="text-base">Total:</span>
              <span className="text-base font-bold">₦{cartTotal.toLocaleString()}</span>
            </Box>
            <Button
              variant="contained"
             
              size=""
              onClick={handlePayment}
              disabled={!isPaystackReady || isProcessing}
              className="!bg-black hover:!scale-105 !transition !ease-in-out duration-300"
            >
              {isProcessing ? (
                <CircularProgress size={20} sx={{ color: "#000" }} />
              ) : (
                <Typography className="!text-xs md:!text-base !font-bold  ">Pay with pay stack</Typography>
              )}
            </Button>
          </Box>
        </Paper>
      </motion.div>
      <Toaster />
    </div>
  );
}
