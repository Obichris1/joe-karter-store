import React from 'react'
import HeroBanner from '../components/Banner'
import { client } from '@/sanity/lib/client';
import ProductSections from '../components/Products';
import AboutBanner from '../components/AboutBanner';
import { Divider } from '@mui/material';

const LeatherProducts = async () => {

    const { banners } = await getData();
    const { products} = await fetchProducts();
  
  return (
    <div className='space-y-12'>
       <HeroBanner banners={banners.length && banners}   /> 
       <ProductSections products={products} />
       <Divider className='md:!mb-10 md:!mt-10 !mb-5 !mt-5'/>
       <AboutBanner />
       <Divider className='md:!mb-10 md:!mt-10 !mb-5 !mt-5'/>
    </div>
  )
}


export const getData = async () => {
  const bannerQuery = `*[_type == "banner" && category == "leather"]{
    _id,
    title,
    subTitle,
    image,
    video {
      asset->{
        _id,
        url,
        _ref
      }
    },
    ctaText,
    ctaLink
  }`;

  const banners = await client.fetch(bannerQuery);

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