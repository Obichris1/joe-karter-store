'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.productData);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="px-6 py-2 flex md:w-[95%] w-full  m-auto justify-between items-center bg-white">
        {/* Logo (visible on all screens) */}
        <Link href="/" className="text-xl md:text-2xl font-bold text-black">
          Joe Karter
        </Link>
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
              ${pathname.startsWith('/athleisure') ? 'bg-gray-100 text-black font-semibold ' : ''}`}
          >
            Shop Nobody Dies
          </Link>

          <Link
            href="/playground"
            className={`px-3 py-4 rounded-xl transition-colors duration-200
              hover:text-black hover:bg-gray-50
              ${pathname.startsWith('/athleisure') ? 'bg-gray-100 text-black font-semibold ' : ''}`}
          >
            The playground
          </Link>
        </nav>

        {/* Cart icon - visible on all screens */}
        <div className="flex items-center gap-3">

       
            {/* Desktop Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block w-[300px]">
          <input
            type="text"
            placeholder="Search (e.g. men, women, shoes)"
            className="w-full pl-4 pr-0 py-3 rounded-full text-sm text-gray-700 bg-gray-100 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <MdSearch className="absolute right-2 text-2xl top-2.5 text-gray-600 hover:scale-110 transition cursor-pointer" />
          </button>
        </form>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-3 ml-4">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:scale-110 transition">
            <Image
              src="/naija.png"
              alt="Nigeria Flag"
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>

          <Link href="/wishlist">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:scale-110 transition cursor-pointer">
              <FaHeart className="text-red-500" />
            </div>
          </Link>

          </div>
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

          {/* Hamburger toggle (mobile only) */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="block md:hidden ml-2">
            {mobileOpen ? <FaTimes size={20}/> : <FaBars size={20}/>}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with animation */}
      <AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden bg-white px-6 py-4 space-y-8 shadow-md overflow-hidden"
    >

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search tags..."
          className="flex-1 px-4 py-2 rounded-full  text-sm text-gray-700 border-1 border-black focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <MdSearch className="text-2xl text-gray-600" />
        </button>
      </form>

      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 text-sm mb-10 text-gray-800 font-bold"
      >
      
        <span> Home</span>
      </Link>


      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 text-sm mb-10 text-gray-80 font-bold"
      >
    
        <span> About Us</span>
      </Link>

      {/* SHOP Dropdown */}
      <div
        onClick={() => setShopOpen(!shopOpen)}
        className="flex items-center cursor-pointer gap-3 text-sm text-gray-800 font-bold"
      >
        <span>Shop</span>
        <FaChevronDown className={`transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {shopOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pl-4 flex flex-col gap-8 text-sm text-gray-700"
          >
            <Link href="/leather" onClick={() => setMobileOpen(false)}>
              Shop Leather Goods
            </Link>
            <Link href="/athleisure" onClick={() => setMobileOpen(false)}>
              Shop Nobody Dies
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

     

      {/* Wishlist */}
      <Link
        href="/wishlist"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 text-sm mb-10 text-gray-800 font-bold"
      >
        <FaHeart className="text-red-500" />
        <span> My Wishlist</span>
      </Link>

      <Link
        href="/playground"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 text-sm mb-10 text-gray-800 font-bold"
      >
      
        <span>The playground</span>
      </Link>

      <Link
        href="/contact"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 text-sm mb-10 text-gray-80 font-bold"
      >
    
        <span>Contact Us</span>
      </Link>

  
    </motion.div>
  )}
</AnimatePresence>


      <Divider />
    </header>
  );
};

export default Header;
