import { Header } from "@/components/header";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <SanityLive />
    </>
  );
}
