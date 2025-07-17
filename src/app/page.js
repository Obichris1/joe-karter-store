// app/page.tsx
import HeroBanner from "./components/Banner";
import { client } from "@/sanity/lib/client";
import HeroCategories from "./components/HeroCategories";
import SupportCards from "./components/SupportCard";
import ProductSections from "./components/Products";
import NewsletterModal from "./components/NewsletterModal"; // ✅ Import modal

const Home = async () => {
  const { banners } = await getData();

  return (
    <>
      <HeroCategories />
      <SupportCards />
      <NewsletterModal /> {/* ✅ This runs client-side */}
    </>
  );
};

export const getData = async () => {
  const bannerQuery = `*[_type == "banner" && category == "leather"]{ title, image, ctaText, ctaLink, category }`;
  const banners = await client.fetch(bannerQuery);
  return { banners };
};

export default Home;
