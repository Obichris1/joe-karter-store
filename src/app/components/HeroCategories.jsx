'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, Button, Typography } from '@mui/material';

export default function HeroCategories() {
  const categories = [
    {
      title: 'Shop Leather',
      description:
        'Discover fashion that speaks your vibe. Curated trends, timeless pieces, and effortless style—because you deserve to stand out.',
      image: '/assets/leather.jpeg',
      route: '/leather-goods',
    },
    {
      title: 'Shop Gym Wears',
      description:
        'Discover fashion that speaks your vibe. Curated trends, timeless pieces, and effortless style—because you deserve to stand out.',
      image: '/assets/gym2.jpeg',
      route: '/gym-wears',
    },
  ];

  return (
    <section className="py-12 px-4 md:px-16">
      <Typography variant="h4" className="text-2xl md:text-6xl !font-bold text-left !mb-10">
        Elevate Your Style With Handcrafted Leather
        <br className="hidden md:block" /> Goods & Premium Gym Essentials.
      </Typography>

      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat, index) => (
          <Link href={cat.route} key={index}>
            <Card className="relative !rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group h-80">
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

              {/* Text Content */}
              <div className="absolute bottom-0 z-20 p-6 text-white w-full flex flex-col md:flex-row gap-4 md:items-center md:justify-between space-y-4 md:space-y-0">
                <Typography className="text-sm md:!text-xs !max-w-sm !leading-6">
                  {cat.description}
                </Typography>
                <Button variant="contained"  className="!px-4 !py-3 !rounded-full !text-sm !bg-white !text-black hover:!bg-black hover:!text-white !transition ">
                  {cat.title}
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
