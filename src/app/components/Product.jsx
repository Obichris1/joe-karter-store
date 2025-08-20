import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

const Product = ({ product }) => {
  const { images, name, slug, price } = product;
//   
  

  const imageUrl = images?.length ? urlFor(images[0]).url() : '/placeholder.png'; // ← use fallback

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={imageUrl}
            width={350}
            height={350}
            alt=''
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">₦{Number(price).toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
