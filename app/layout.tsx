import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indivisible LTEs",
  description:
    "A platform for managing LTEs (Letters to Editors) for the Indivisible movement.",
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
