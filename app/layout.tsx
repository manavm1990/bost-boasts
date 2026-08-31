import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "IL-12 Dispatch",
  description:
    "Newsletters and dispatches for Illinois's 12th Congressional District.",
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
