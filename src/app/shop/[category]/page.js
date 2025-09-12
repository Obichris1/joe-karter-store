import React from "react";
import ShopPage from "../../components/ShopPage";
import { client } from "@/sanity/lib/client";
export default async function Shop({ params }) {
  const { category } = params;

  // ✅ Fetch on the server
  const tags = await client.fetch(
    `array::unique(*[_type == "product" && category == $category][]['tags'][] )`,
    { category }
  );

  const products = await client.fetch(
    `*[_type == "product" && category == $category]{
      _id, title, slug, price, category, label, tags,
      images[] { asset->{url} }
    }`,
    { category }
  );

  return (
    <div>
      <ShopPage category={category} products={products} allTags={tags} />
    </div>
  );
}
