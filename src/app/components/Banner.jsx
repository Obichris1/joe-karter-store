"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

const HeroBanner = ({ banners }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const currentRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!banners || banners.length === 0) return;

    // Start the interval
    intervalRef.current = setInterval(() => {
      progressRef.current += 1;

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        currentRef.current = (currentRef.current + 1) % banners.length;
        setCurrent(currentRef.current);
      }

      setProgress(progressRef.current);
    }, 50); // ~10 seconds full

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  const banner = banners[current];
  // console.log(banner);
  

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 object-cover bg-center"
          style={{
            backgroundImage: `url(${urlFor(banner.image).width(1600).url()})`,
          }}
        >
          <div className="absolute inset-0 bg-black/60 flex items-end px-10 lg:px-20">
            <div className="text-white max-w-3xl mb-30">
              <div className="flex flex-col gap-8">
              <h1 className="text-2xl md:text-4xl font-bold">
                {banner.title}
              </h1>

              <h4 className="text-xl text-white md:text-2xl ">
                {banner.subTitle}
              </h4>
               
              <Link
                  href='/shop'
                  className="bg-white text-black font-semibold px-6 py-3 w-32 rounded-full inline-block"
                >
                  Shop Now
                </Link>
              </div>
         
             
             
           
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-5 right-16 flex gap-2">
  {banners.map((_, index) => (
    <div
      key={index}
      className={`h-1 rounded-full overflow-hidden ${
        index === current ? "w-20 bg-white/30" : "w-6 bg-white/20"
      }`}
    >
      {index === current && (
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  ))}
</div>

    </div>
  );
};

export default HeroBanner;
