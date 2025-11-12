import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ReduxProvider } from "./configs/redux-provider";
import Script from "next/script";
import WhatsAppIcon from "./components/WhatsappIcon";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Joe Karter | Premium leather & active wears",
  description:
    "Discover Joe Karter's premium leather, and active wear products. Shop high-quality collections tailored for modern style and comfort.",
  keywords:
    "e-commerce, shop, leather, fitness, shoe, sportwears, Joe Karter, fashion, lifestyle, athleisure, shop online, Lagos, Nigeria",
  openGraph: {
    title: "Joe Karter | Premium leather & active wears",
    description:
      "Explore Joe Karter's exclusive range of leather and active wear collections designed for comfort and elegance.",
    url: "https://www.joekarter.com",
    siteName: "Joe Karter",
    images: [
      {
        url: "/Jk.png", // make sure this is in /public
        width: 1200,
        height: 630,
        alt: "Joe Karter - Premium leather & active wears",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://www.joekarter.com",
  },
  icons: {
    icon: "/favicon.ico", 
  },
  other: {
    "google-site-verification": "6UUZf6MnAn0myKAuwyfKApy81Mfu1aCWFC3jumb8Hp4", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
