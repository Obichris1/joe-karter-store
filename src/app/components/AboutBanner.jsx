'use client';

import { Button, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutBanner() {
  return (
    <div className="">
      <Box className="rounded-md w-[90%] p-4 mx-auto flex flex-col md:flex-row md:gap-24 gap-16 items-center">
        {/* Left Section - Text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h1 className="!font-bold md:!mb-8 !mb-4 !text-lg md:!text-3xl">
            Need Leather?
          </h1>
          <p
      
            className="!text-sm md:!text-base !leading-6  md:!leading-7 md:!mb-12"
          >
            Our people have spoken and we’re #1 on Glassdoor’s Best Places to
            Work list in the Nigeria and the UK. Since the rankings debuted in
            2009, we've ranked among the top four companies in the US every
            single year and have now earned the #1 spot a record six times.
          </p>
          <p
      
            className="!text-sm md:!text-base !mt-6 !leading-6 md:!leading-7"
          >
            Our people have spoken and we’re #1 on Glassdoor’s Best Places to
            Work list in the Nigeria and the UK. Since the rankings debuted in
            2009, we've ranked among the top four companies in the US every
            single year and have now earned the #1 spot a record six times.
          </p>

          <Link
            href="/services/solar-power-installation"
            className="inline-block mt-6 group hover:text-[#00008B] hover:underline"
          >
            <div className="flex gap-2 items-center md:mt-10">
              <p className="!text-sm md:!text-base !font-bold !underline ">
                Explore Products
              </p>
              <FaArrowRight className="!text-sm md:!text-base group-hover:translate-x-2 transition-transform duration-300 " />
            </div>
          </Link>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Image
            src="/assets/Leather Banner2.jpg"
            alt=""
            width={400}
            height={300}
            className="rounded-xl shadow-md"
          />
        </motion.div>
      </Box>
    </div>
  );
}
