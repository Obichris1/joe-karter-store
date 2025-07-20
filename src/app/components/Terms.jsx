"use client";

import React from "react";
import { Container, Button, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsAndConditions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="!w-[95%] p-4 md:p-6 !m-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p
          className="font-bold mb-4 mt-2 md:text-2xl text-xl"
        >
          Terms and Conditions
        </p>

        <p variant="body2" paragraph>
          Welcome to Joe Karter Ecommerce Store. By accessing or using our
          website, you agree to be bound by the following terms and conditions.
          Please read them carefully.
        </p>

        <Section title="1. General">
          These Terms and Conditions govern your use of our website and the
          purchase of products from Joe Karter Ecommerce Store. We reserve the
          right to update or change these terms at any time without prior
          notice.
        </Section>

        <Section title="2. Products">
          All product descriptions and pricing are subject to change at any time
          without notice. We reserve the right to discontinue any product at any
          time.
        </Section>

        <Section title="3. Orders & Payment">
          Orders are confirmed only after successful payment. We accept secure
          payments via our supported gateways. Please ensure all details are
          correct before placing an order.
        </Section>

        <Section title="4. Shipping & Delivery">
          Delivery timelines are estimates and may vary. Joe Karter is not
          responsible for delays caused by third-party delivery partners.
        </Section>

        <Section title="5. Returns & Refunds">
          We accept returns within 7 days of delivery, provided the item is
          unused and in its original condition. Refunds are processed within
          7–10 business days of receiving the returned item.
        </Section>

        <Section title="6. Privacy Policy">
          Your personal information is handled in accordance with our Privacy
          Policy. We do not share your data with third parties without your
          consent.
        </Section>

        <Section title="7. Contact Us">
          If you have any questions about these Terms and Conditions, please
          contact us at joekarterng@gmail.com.
        </Section>

        <p className="mt-4" color="text.secondary">
          Last updated: July 2025
        </p>
      </motion.div>

      <div className="flex self-center mt-10">
        <Button
          variant="contained"
          onClick={() => window.history.back()}
          className="!bg-black !text-white !py-2 !rounded-lg !text-sm hover:!scale-105 !capitalize !transition-transform !duration-300 !ease-in-out"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <>
    <p className="mt-6 mb-2 font-bold">{title}</p>
    <p className="">{children}</p>
  </>
);

export default TermsAndConditions;
