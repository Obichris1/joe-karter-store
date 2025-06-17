import React from 'react'
import HeroBanner from '../components/Banner'
import { client } from '@/sanity/lib/client';
import ProductSections from '../components/Products';

const LeatherProducts = async () => {

    const { banners } = await getData();
    const { products} = await fetchProducts();
    console.log(banners);
    console.log(products);
  return (
    <div className='space-y-12'>
       <HeroBanner banners={banners.length && banners}   /> 
       <ProductSections products={products} />
    </div>
  )
}


export const getData = async () => {
    // const query = '*[_type == "product"]';
    // const products = await client.fetch(query);
    const bannerQuery = `*[_type == "banner" && category == "leather"]{ title, image, ctaText, ctaLink }`;
  
    const banners= await client.fetch(bannerQuery);
  
    return { banners };
  };

  const fetchProducts = async () => {
    const query = `*[_type == "product" && category == "leather"]{
      _id,
      title,
      slug,
      price,
      label,
      category,
     images[]{ asset->{ url } } 
    }`;
    try {
      const products= await client.fetch(query);
  
      return {products}
    } catch (error) {
      console.error("Sanity fetch error:", error);
    }
  };



export default LeatherProducts