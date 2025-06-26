'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const cartItems = useSelector((state) => state.cart.productData);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">

      <div className="px-6 py-3 flex w-[95%] m-auto justify-between items-center bg-white">
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

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden md:block w-[300px]">
          <input
            type="text"
            placeholder="Search tags (e.g. men, women, shoes)"
            className="w-full pl-4 pr-0 py-3 rounded-full  text-sm text-gray-700 bg-gray-100 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <MdSearch className="absolute right-2 text-2xl top-2.5 text-gray-600  flex items-center justify-center hover:scale-110 transition cursor-pointer"  />
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-3 ml-4">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:scale-110 transition">
            <Image
              src="/naija.png"
              alt="Nigeria Flag"
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
           <Link href='/wishlist'>
           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:scale-110 transition cursor-pointer">
            <FaHeart className="text-red-500" />
          </div></Link>
          
          <Link href="/cart" className="relative">
  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:scale-110 transition cursor-pointer">
    <FaShoppingCart className="text-gray-700" />
    {totalItems > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full">
        {totalItems}
      </span>
    )}
  </div>
</Link>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:scale-110 transition cursor-pointer">
            <FaUser className="text-gray-700" />
          </div>
        </div>
      </div>
      <Divider />
    </header>
  );
};

export default Header;
