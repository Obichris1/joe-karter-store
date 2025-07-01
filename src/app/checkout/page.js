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
  Chip,
  Divider,
  CircularProgress,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  AiFillMail,
  AiOutlineUser,
  AiFillPhone,
  AiFillHome,
  AiFillMoneyCollect,
} from "react-icons/ai";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [isPaystackReady, setPaystackReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [promoTried, setPromoTried] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    promo: "",
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const cart = useSelector((state) => state.cart.productData);
  const router = useRouter();

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 500;
  const total = cartTotal + deliveryFee - appliedDiscount;

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

  const handleApplyCoupon = async () => {
    const code = form.promo.trim().toUpperCase();
    setPromoTried(true);
    if (!code) {
      toast.error("Please enter a promo code");
      setCouponApplied(false);
      setAppliedDiscount(0);
      return;
    }

    try {
      setIsApplying(true);
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!data.success) {
        setCouponApplied(false);
        setAppliedDiscount(0);
        toast.error(data.message || "Invalid promo code");
      } else {
        setCouponApplied(true);
        setAppliedDiscount(data.discount);
        toast.success(`Promo applied: ₦${data.discount} off`);
      }
    } catch (err) {
      toast.error("Something went wrong validating the promo");
      setCouponApplied(false);
      setAppliedDiscount(0);
    } finally {
      setIsApplying(false);
    }
  };

  const handlePayment = async (e) => {
    if (e) e.preventDefault(); // prevent form default behavior
    if (!isPaystackReady || !window.PaystackPop) {
      toast.error("Payment system not ready. Please wait...");
      return;
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
    ];

    for (const field of requiredFields) {
      if (!form[field]) {
        toast.error("Please complete your delivery information");
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
        body: JSON.stringify({
          form,
          cart,
          total,
          discount: appliedDiscount,
          promoCode: form.promo.trim().toUpperCase(),
        }),
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
      amount: total * 100,
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: `${form.firstName} ${form.lastName}`,
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

  if (isCartLoading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress size={25} sx={{ color: "#000" }} />
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
    <div className="flex flex-col md:w-[90%] mx-auto py-12 px-6 md:px-0 md:flex-row gap-36">
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
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineUser />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineUser />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiFillMail />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiFillPhone />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiFillHome />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
            <FormControlLabel
              className="p-0 !text-xs"
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
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
          <Box className="space-y-8">
            {cart.map((item) => (
              <Box key={item._id} className="flex justify-between text-sm text-gray-700">
                <span>{item.title} × {item.quantity}</span>
                <span className="font-bold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </Box>
            ))}

            <Divider className="!my-4" />

            <Box className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₦{cartTotal.toLocaleString()}</span>
            </Box>
            <Box className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </Box>

            <Box className="space-y-2">
              <Typography className="!mb-2 !text-sm">Promo code</Typography>
              <Box className="flex gap-2 items-center">
                <TextField
                  fullWidth
                  name="promo"
                  value={form.promo}
                  onChange={handleChange}
                  size="small"
                  placeholder="Enter promo code"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiFillMoneyCollect />
                      </InputAdornment>
                    ),
                    sx: {
                      fontSize: "1rem",
                      "&::placeholder": { fontSize: "0.75rem" },
                    },
                  }}
                  inputProps={{ style: { fontSize: "0.75rem" } }}
                />
                <Button
                  variant="contained"
                  onClick={handleApplyCoupon}
                  disabled={isApplying}
                  className="!bg-black hover:!scale-105 !capitalize !transition !ease-in-out duration-300"
                >
                  {isApplying ? "Checking..." : "Apply"}
                </Button>
              </Box>
              {promoTried && (
                <Chip
                  label={
                    couponApplied
                      ? `Promo Applied: ₦${appliedDiscount.toLocaleString()} off`
                      : "Invalid Promo Code"
                  }
                  color={couponApplied ? "success" : "error"}
                  variant="outlined"
                />
              )}
            </Box>

            <Box className="flex justify-between text-sm">
              <span>Discount</span>
              <span>-₦{appliedDiscount.toLocaleString()}</span>
            </Box>
            <Divider className="!my-4" />
            <Box className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </Box>

            <form
  onSubmit={(e) => {
    e.preventDefault();
    handlePayment();
  }}
>
  <Button
    type="submit"
    variant="contained"
    disabled={!isPaystackReady || isProcessing}
    className="!bg-black w-full hover:!scale-105 !py-2 !transition capitalize !ease-in-out duration-300 !mt-6"
  >
    {isProcessing ? (
      <CircularProgress size={25} sx={{ color: "#fff" }} />
    ) : (
      <Typography className="!text-xs md:!text-base capitalize">
        Pay with Paystack
      </Typography>
    )}
  </Button>
</form>

          </Box>
        </Paper>
      </motion.div>
      <Toaster />
    </div>
  );
}
