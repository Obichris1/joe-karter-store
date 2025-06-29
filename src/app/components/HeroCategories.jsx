'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function HeroCategories() {
  const categories = [
    {
      title: 'Shop Leather',
      description:
        'Discover fashion that speaks your vibe. Curated trends, timeless pieces, and effortless style—because you deserve to stand out.',
      image: '/assets/leatherHome.jpg',
      route: '/leather',
    },
    {
      title: 'Shop Gym Wears',
      description:
        'Discover fashion that speaks your vibe. Curated trends, timeless pieces, and effortless style—because you deserve to stand out.',
      image: '/assets/gym2.jpeg',
      route: '/athleisure',
    },
  ];

  return (
    <section className="py-12 px-4 md:px-16">
      <Typography variant="h4" className="!text-base md:!text-3xl !font-bold text-left !mb-10">
        Elevate Your Style With Handcrafted Leather
        <br className="hidden md:block" /> Goods & Premium Gym Essentials.
      </Typography>

      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat, index) => (
          <Link href={cat.route} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="h-80"
            >
              <Card className="relative !rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-full">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

                <div className="absolute bottom-0 z-20 p-6 text-white w-full flex flex-col md:flex-row gap-8 md:items-center md:justify-between space-y-4 md:space-y-0">
                  <Typography className="!text-xs md:!text-sm !max-w-sm !leading-6">
                    {cat.description}
                  </Typography>
                  <Button
                    variant="contained"
                    className="!flex !w-1/2 !px-4 !py-3 !rounded-full !text-xs !font-bold !bg-white !text-black hover:!bg-black hover:!text-white !transition"
                  >
                    {cat.title}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
