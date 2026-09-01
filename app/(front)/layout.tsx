import Footer from "@/components/footer";
import Header from "@/components/header";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SanityLive />
      <SpeedInsights />
    </>
  );
}
