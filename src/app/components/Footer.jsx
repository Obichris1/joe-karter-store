// components/Footer.js
import Image from "next/image";
import { TextField, Typography, Button,Divider } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white pt-10">
      {/* Newsletter */}
      <div
        className="bg-cover bg-black bg-center rounded-xl mx-4 md:mx-20 p-7 text-white  text-center"
        style={{ backgroundImage: "url('/images/newsletter-bg.png')" }}
      >
        <h2 className="text-sm md:text-2xl font-bold mb-3 md:mb-4">
          SUBSCRIBE TO OUR NEWSLETTER
        </h2>
        <p className="text-xs md:text-base mb-6 max-w-2xl leading-6 md:leading-7  mx-auto">
          {/* Discover fashion that speaks your vibe. Curated trends, timeless
          pieces, and effortless style—because you deserve to stand out. */}
          Stay updated with Joe Karter's latest leather and athleisure releases, new design concepts, upcoming events and lifestyle tips.
        </p>

        <form className="flex flex-col  justify-center items-center gap-4">
          <input
            label="Kindly enter your email"
            type="email"
            placeholder="Please enter your email"
            className="!rounded-full md:px-8 px-6 py-4  bg-white !text-black font-bold w-full md:!w-2xl text-xs md:text-base"
          />
          <button
            variant="outlined"
            type="submit"
            // color='white'
            className="px-8 py-3 bg-white text-black  text-xs md:text-sm rounded-full capitalize  font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 px-6 md:px-20 py-10 text-sm justify-center  text-black">
        <div className="flex flex-col items-center text-xs md:text-sm  gap-3">
          <a href="#">Home</a>
          <a href="#">Who we are</a>
          <a href="/terms">Terms /Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </div>

        <div className="flex flex-col items-center text-xs md:text-sm  gap-3">
          <a href="#">Linkedin</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
        </div>
      </div>
       <Divider />
      {/* JK Logo */}
      <div className="flex md:flex-col">
    

      <div className="py-4 w-[95%] m-auto text-white flex flex-col md:flex-row justify-between items-center gap-2">
       
      <Typography className="!text-xs !hidden md:!flex  md:!text-sm !text-black text-center">
          Copyright &copy; 2025 Joe Karter. All rights reserved
        </Typography>

        <div className="md:mr-12 justify-center  ">
        <Image
          src="/Jk.png"
          alt="Joe Karter Logo"
          width={60}
          height={60}
        />
      </div>
         

      <Typography className="!text-xs md:!text-sm !text-black md:!hidden !text-center">
          Copyright &copy; 2025 Joe Karter. All rights reserved
        </Typography>
        <div className="flex items-center justify-center md:flex-row gap-1">
          <Typography className="!text-xs md:!text-sm  !text-black text-center">
            Designed by
          </Typography>
          <Typography className="!text-xs md:!text-sm !underline  !text-black text-center">
            <Link href="https://www.oxrissolutions.com/" target="_blank">
              Oxris Solutions
            </Link>
          </Typography>

          
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
