'use client';

import { Button, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutBanner() {
  return (
    <div className="">
      <Box className="rounded-md w-[90%] p-4 mx-auto flex flex-col md:flex-row gap-24 items-center">
        {/* Left Section - Text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <Typography className="!font-bold !mb-4 !text-lg md:!text-2xl">
            Need Leather?
          </Typography>
          <Typography
            variant="body1"
            className="!text-sm md:!text-base !leading-7 md:!mb-18"
          >
            Our people have spoken and we’re #1 on Glassdoor’s Best Places to
            Work list in the Nigeria and the UK. Since the rankings debuted in
            2009, we've ranked among the top four companies in the US every
            single year and have now earned the #1 spot a record six times.
          </Typography>
          <Typography
            variant="body1"
            className="!text-sm md:!text-base !mt-6 !leading-7"
          >
            Our people have spoken and we’re #1 on Glassdoor’s Best Places to
            Work list in the Nigeria and the UK. Since the rankings debuted in
            2009, we've ranked among the top four companies in the US every
            single year and have now earned the #1 spot a record six times.
          </Typography>

          <Link
            href="/services/solar-power-installation"
            className="inline-block mt-6 group hover:text-[#00008B] hover:underline"
          >
            <div className="flex gap-2 items-center md:mt-10">
              <Typography className="!text-sm md:!text-base">
                Explore Products
              </Typography>
              <FaArrowRight className="!text-sm md:!text-base group-hover:translate-x-2 transition-transform duration-300" />
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
            src="/assets/leather/Leather Banner2.jpg"
            alt="Glassdoor Award"
            width={400}
            height={300}
            className="rounded-xl shadow-md"
          />
        </motion.div>
      </Box>
    </div>
  );
}
