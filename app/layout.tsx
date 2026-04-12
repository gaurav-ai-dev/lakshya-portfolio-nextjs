import type { Metadata } from "next";
import { DM_Sans, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { defaultMetadata, siteConfig } from "@/lib/seo.config";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...defaultMetadata,
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    alternates: {
      canonical: siteConfig.url,
    },
    verification: {
      google: "f_NxhmP7fkRcylrWP2tKgoShk93sY5kSvD8a193Spdo",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${dmSans.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
