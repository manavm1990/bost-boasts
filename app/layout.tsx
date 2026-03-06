import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bost Watch Report",
  description:
    "A shadow bulletin newsletter keeping the 🐶 killer Congressman Mike Bost accountable and honest.",
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
