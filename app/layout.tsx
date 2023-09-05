import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KRLO",
  description: "CREATED BY AQIB FOR THE FAM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">{children}</body>
    </html>
  );
}
