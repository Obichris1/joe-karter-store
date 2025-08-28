"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

const HeroBanner = ({ banners }) => {
  const [current, setCurrent] = useState(0);
  const progressRef = useRef(0);
  const currentRef = useRef(0);
  const intervalRef = useRef(null);

  if (!banners || banners.length === 0) return null;

  useEffect(() => {
    progressRef.current = 0;
    currentRef.current = 0;
    setCurrent(0);

    intervalRef.current = setInterval(() => {
      progressRef.current += 1;

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        currentRef.current = (currentRef.current + 1) % banners.length;
        setCurrent(currentRef.current);
      }
    }, 180);

    return () => clearInterval(intervalRef.current);
  }, [banners.length]);

  const banner = banners[current];
  const hasVideo = !!banner?.video?.asset?.url;
  const hasImage = !!banner?.image;

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner._id || current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {hasVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src={banner?.video?.asset?.url}
            />
          ) : hasImage ? (
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${urlFor(banner?.image).width(1600).url()})`,
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xl">
              No media available
            </div>
          )}

          <div className="absolute inset-0 bg-black/60 flex items-end px-6 lg:px-20">
            <div className="text-white max-w-3xl mb-20">
              <div className="flex flex-col gap-8">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {banner?.title}
                </h1>
                <p className="!text-base text-white md:!text-xl">
                  {banner?.subTitle}
                </p>
                <Link
                  href={banner?.ctaLink  || ""}
                  className="bg-white text-black font-semibold md:text-base text-sm px-3 py-2 text-center w-28 rounded-full inline-block"
                >
                  {banner?.ctaText || "Shop Now"}
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
                style={{ width: `${progressRef.current}%` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
