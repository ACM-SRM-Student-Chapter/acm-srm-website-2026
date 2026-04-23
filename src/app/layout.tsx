import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/ui/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.acmsrm.in"),
  title: {
    default: "ACM SRM Student Chapter | Association for Computing Machinery",
    template: "%s | ACM SRMIST",
  },
  description:
    "The official Association for Computing Machinery (ACM) Student Chapter at SRM Institute of Science and Technology, Kattankulathur. We build, innovate, and grow the tech community.",
  keywords: [
    "ACM SRM",
    "ACM SRMIST",
    "SRM University tech club",
    "Association for Computing Machinery SRM",
    "Hackathons at SRM",
  ],
  authors: [{ name: "ACM SRMIST" }],
  creator: "ACM SRMIST",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.acmsrm.in",
    title: "ACM SRM Student Chapter",
    description:
      "Official website of the ACM Student Chapter at SRMIST Kattankulathur.",
    siteName: "ACM SRMIST",
    images: [
      {
        url: "/acm-logo.webp",
        width: 1200,
        height: 630,
        alt: "ACM SRMIST Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACM SRM Student Chapter",
    description: "Official website of the ACM Student Chapter at SRMIST.",
    creator: "@acmsrm",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://www.acmsrm.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.className} antialiased selection:bg-acm-electric selection:text-black overflow-x-hidden`}
      >
        <CustomCursor />
        <Navbar />

        {/* Main Content */}
        <main className="relative min-h-screen">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
