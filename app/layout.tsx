import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
