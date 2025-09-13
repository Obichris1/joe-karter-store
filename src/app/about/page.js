"use client"

import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20 space-y-24">
      <h1 className="text-2xl md:text-4xl font-bold">
        About Us
      </h1>
      {/* NBD ATHLEISURE Section */}
      <section className="grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            NBD Athleisure
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-7">
            NBD Athleisure was created out of a passion for movement and a belief
            that fitness is more than just a routine—it’s a lifestyle. What started
            as a personal pursuit of discipline and consistency has grown into a
            brand that blends performance with culture. Our pieces are designed for
            individuals who want more than activewear; they want comfort that
            transitions seamlessly from workouts to daily life, all while carrying
            the spirit of resilience.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-7">
            We are a community of doers, driven by the mindset that discipline and
            style can coexist. NBD Athleisure isn’t just clothing—it’s an identity.
            From outdoor cardio sessions to everyday hustle, our designs embody grit,
            freedom, and self-expression. We exist for the dreamers who dare to push
            limits, the achievers who show up daily, and the believers who know that
            greatness starts with a decision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="/assets/jk-group.jpg" // replace with actual image
            alt="NBD Athleisure"
            width={600}
            height={500}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </section>

      {/* Joe Karter Shoes Section */}
      <section className="grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden shadow-xl order-2 md:order-1"
        >
          <Image
            src="/assets/about-jk.jpg" // replace with actual image
            alt="Joe Karter Shoes"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.7 }}
          className="space-y-6 order-1 md:order-2"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-7">
            Joe Karter Shoes
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-7">
            At Joe Karter Shoes, we believe luxury should be within reach without
            losing its soul. Since 2019, we’ve been crafting footwear that blends
            timeless design with modern edge—shoes built to be worn, remembered, and
            admired. Every pair is designed with precision, using premium materials
            that promise comfort, durability, and effortless style.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-7">
            We are more than a footwear brand; we are curators of confidence. Rooted
            in Africa yet inspired by global elegance, Joe Karter Shoes was born
            from a vision to rival international standards while staying true to
            authentic craftsmanship. We exist for those who want to make an
            impression—boldly, stylishly, and sustainably.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
