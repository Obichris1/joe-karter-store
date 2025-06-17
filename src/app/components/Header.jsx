// app/components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';

const Header = () => {
  const pathname = usePathname();

const cartItems = useSelector((state) => (
  state.cart.items
))

console.log(cartItems);


  return (
    <header >
      <div className="px-6 py-4 flex w-[90%] m-auto justify-between items-center bg-white">
      {/* Logo / Brand */}
      <Link href="/" className="text-xl font-bold text-black">
        Joe Karter
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
  <Link
    href="/leather"
    className={`px-3 py-4 text-center rounded-xl transition-colors duration-200
      hover:text-black hover:bg-gray-50
      ${pathname.startsWith('/leather') ? 'bg-gray-100 text-black font-semibold' : ''}`}
  >
    Shop Leather Goods
  </Link>

  <Link
    href="/athleisure"
    className={`px-3 py-4 rounded-xl transition-colors duration-200
      hover:text-black hover:bg-gray-50
      ${pathname.startsWith('/athleisure') ? 'bg-gray-100 text-black font-semibold' : ''}`}
  >
    Shop Nobody Dies
  </Link>
</nav>


      {/* Search & Icons */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="pl-4 pr-10 py-1.5 rounded-full border text-sm text-gray-700 focus:outline-none"
          />
          <MdSearch className="absolute right-2 top-2.5 text-gray-600" />
        </div>

        {/* Nigeria Flag */}
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <Image
            src="/images/nigeria-flag.png"
            alt="Nigeria Flag"
            width={24}
            height={24}
          />
        </div>

        {/* Icons */}
        <FaHeart className="text-gray-700 cursor-pointer" />
        <Link href="/cart">
        <FaShoppingCart className="text-gray-700 cursor-pointer" />
        </Link>
        <FaUser className="text-gray-700 cursor-pointer" />
      </div>
      </div>
      <Divider />
    </header>
  );
};

export default Header;
