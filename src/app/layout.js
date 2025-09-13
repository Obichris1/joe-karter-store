import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ReduxProvider } from "./configs/redux-provider";
import Script from "next/script";
import WhatsAppIcon from "./components/WhatsappIcon";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Joe Karter | Premium leather & active wears",
  description:
    "Discover Joe Karter's premium leather, and active wear products. Shop high-quality collections tailored for modern style and comfort.",
  keywords: "e-commerce, shop, leather, fitness, shoe, sportwears, Joe Karter, fashion, lifestyle, athleisure, shop online, Lagos, Nigeria",
  openGraph: {
    title: "Joe Karter | Premium leather & active wears",
    description:
      "Explore Joe Karter's exclusive range of leather and active wear collections designed for comfort and elegance.",
    url: "https://www.joekarter.com",
    siteName: "Joe Karter",
    images: [
      {
        url: "/Jk.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Joe Karter - Premium leather & active wears",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <meta name="google-site-verification" content="6UUZf6MnAn0myKAuwyfKApy81Mfu1aCWFC3jumb8Hp4" />
        {/* Basic SEO */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* OpenGraph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />

        {/* Canonical */}
        <link rel="canonical" href="https://www.joekarter.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Joe Karter",
              url: "https://joekarter.com",
              logo: "https://joekarter.com/logo.png", // update with your actual logo
              description:
                "Joe Karter brings premium leather, lifestyle, and active wear products.",
              sameAs: [
                "https://www.instagram.com/joekarter_",
                "https://www.instagram.com/nbd.athleisure/",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos",
                addressCountry: "Nigeria",
              },
            }),
          }}
        />
      </Head>
      <body className={`${poppins.variable} antialiased`}>
        <ReduxProvider>
          <Header />
          {children}
          <WhatsAppIcon />
        </ReduxProvider>
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
        <Footer />
      </body>
    </html>
  );
}
