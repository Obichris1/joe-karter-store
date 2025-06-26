'use client';

import { FaStar, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const supportCards = [
  {
    title: 'Design a shoe',
    description: 'Create your own custom shoe with Joe Karter',
    icon: <FaStar className="text-white w-6 h-6" />,
    backgroundImage: '/assets/leather2.webp',
    dark: true,
    href: '/contact',
  },
  {
    title: 'Our FAQ',
    description: 'Get answers to the most common questions',
    icon: <FaQuestionCircle className="text-black w-6 h-6" />,
    dark: false,
    href: '/faq',
  },
  {
    title: 'Reach out To Us',
    description: 'Contact us on WhatsApp for enquiries',
    icon: <FaPhone className="text-black w-6 h-6" />,
    dark: false,
    href: '/contact',
  },
];

export default function SupportCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10 py-12 px-4 md:px-16">
      {supportCards.map((card, index) => (
        <Link href={card.href} key={index}>
          <div
            className={`relative rounded-2xl p-6 min-h-[200px] flex flex-col justify-end transform transition-transform duration-300 hover:scale-105 cursor-pointer ${
              card.dark ? 'text-white overflow-hidden' : 'bg-gray-100 text-black'
            }`}
          >
            {/* Background & overlay */}
            {card.dark && (
              <>
                <Image
                  src={card.backgroundImage}
                  alt={card.title}
                  fill
                  className="object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
              </>
            )}

            {/* Content */}
            <div className="relative z-20 space-y-2">
              <div>{card.icon}</div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm">{card.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
