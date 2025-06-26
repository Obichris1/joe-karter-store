"use client"
import React from "react";
import ContactForm from "../Components/ContactForm";
import { Typography, Paper,Divider } from "@mui/material";
import MapEmbed from "../components/MapEmbed";
import Link from "next/link";

import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineX,
  AiFillPhone
} from "react-icons/ai";

import HeadBanner from "../components/HeadBanner";
import { motion } from "framer-motion";

const page = () => {

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };
  
  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };
  
  const slideInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  
  return (
    <div>
      {/* <HeadBanner /> */}

    {/* Banner Section */}
    <motion.div
        className="relative h-[40vh] bg-cover bg-center text-white flex items-center  justify-center"
        style={{ backgroundImage: "url('/assets/leather/contactImg.jpg')" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.h1
          className="relative z-10 text-2xl md:text-3xl font-bold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Contact Joe Karter
        </motion.h1>
      </motion.div>
    
      <motion.div
            className="w-full text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromRight}
          >
        <Typography className="!font-bold !text-sm md:!text-base !mb-2 ">CONTACT</Typography>
        <div className="flex gap-3 items-center justify-center">
          <AiFillPhone className="text-sm" />{" "}
          <Link
            href="tel:+234 916 523 5934"
            className="mr-4 text-[#333]  !font-bold !text-base"
          >
            0916 523 5934
          </Link>
        </div>
        </motion.div>
      <Divider className="!space-y-8 !mt-8 !mb-8" />

      <div className="w-[90%] m-auto flex flex-col gap-12 mt-10">
      

     

          {/* Contact Form */}
          <motion.div
            className="w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromRight}
          >
            <ContactForm />
          </motion.div>

        <motion.div
            className=" w-full self-end flex flex-col   "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromRight}
          >
      

        {/* SOCIAL MEDIA  */}
        <div className="flex  md:self-end  items-center gap-4 mt-12">
          <Link
            href=""
            target="_blank"
            className=" rounded-full text-[#E12F6C] !text-xl  md:!text-3xl hover:scale-110  transition"
          >
            <AiOutlineInstagram />
          </Link>

          <Link
            href=""
            target="_blank"
            className="  rounded-full text-[#00008B] !text-xl  md:!text-3xl hover:scale-110 transition"
          >
            <AiFillFacebook />
          </Link>

          <Link
            href=""
            target="_blank"
            className=" rounded-full text-[#000] !text-xl  md:!text-3xl hover:scale-110 transition"
          >
            <AiOutlineX />
          </Link>
        </div>
          </motion.div>


        <MapEmbed />
      </div>
    </div>
  );
};

export default page;
