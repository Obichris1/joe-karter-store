import React from "react";
import HeroBanner from "./components/Banner";
import { client } from "@/sanity/lib/client";
import HeroCategories from "./components/HeroCategories";
// import Product from "@/components/Product";
import SupportCards from "./components/SupportCard";
import ProductSections from "./components/Products";


const Home = async () => {

  const { banners } = await getData();
  console.log(banners);
  return (
    <>
      <HeroCategories />
      {/* <HeroBanner heroBanner={bannerData?.length && bannerData[0]} /> */}
   
      {/* <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Very affordable phones and laptops</p>
      </div> */}
      <SupportCards />

      {/* <div className="products-container">{products?.map((product) => (<Product key={product._id} product={product}  />))}</div> */}
    </>
  );
};

export const getData = async () => {
  // const query = '*[_type == "product"]';
  // const products = await client.fetch(query);
  const bannerQuery = `*[_type == "banner" && category == "leather"]{ title, image, ctaText, ctaLink, category }`;

  const banners= await client.fetch(bannerQuery);

  return { banners };
};

export default Home;
