"use client"
import React from 'react'
import { motion } from "framer-motion";


const HeadBanner = () => {
  return (
    <motion.div
    className="relative h-[45vh] bg-cover bg-center text-white flex items-center  justify-center"
    style={{ backgroundImage: "url('/assets/leather/contactImg.jpg')" }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="absolute inset-0 bg-black/60"></div>
 
  </motion.div>

  )
}

export default HeadBanner