import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "IL-12 Dispatch",
    template: "%s | IL-12 Dispatch",
  },
  description:
    "Newsletters and dispatches for Illinois's 12th Congressional District.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "IL-12 Dispatch",
    title: "IL-12 Dispatch",
    description:
      "Newsletters and dispatches for Illinois's 12th Congressional District.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IL-12 Dispatch",
    description:
      "Newsletters and dispatches for Illinois's 12th Congressional District.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${sourceSerif.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
