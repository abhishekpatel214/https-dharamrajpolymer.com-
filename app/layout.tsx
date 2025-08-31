import type React from "react"
import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import BackgroundGranules from "@/components/background-granules"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Dharamraj Polymer | HDPE & PP Granules Manufacturer",
    template: "%s | Dharamraj Polymer",
  },
  description:
    "Dharamraj Polymer is a leading manufacturer of HDPE and PP granules in all colors based in Gandhinagar, Gujarat, India. High-quality plastic granules for diverse industries.",
  keywords: [
    "HDPE granules",
    "PP granules",
    "PPCP granules",
    "plastic granules manufacturer",
    "Gandhinagar",
    "Gujarat",
    "India",
    "polypropylene",
    "polyethylene",
    "colored plastic granules",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Dharamraj Polymer | HDPE & PP Granules Manufacturer",
    description: "High-quality HDPE & PP granules in all colors manufactured in Gandhinagar, Gujarat.",
    siteName: "Dharamraj Polymer",
    images: [
      {
        url: "/dharamraj-polymer-granules-og-image.png",
        width: 1200,
        height: 630,
        alt: "Dharamraj Polymer - HDPE & PP Granules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharamraj Polymer | HDPE & PP Granules Manufacturer",
    description: "High-quality HDPE & PP granules in all colors manufactured in Gandhinagar, Gujarat.",
    images: ["/dharamraj-polymer-granules-og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
} satisfies import("next").Metadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable, "antialiased")}>
      <body className="min-h-dvh bg-background text-foreground">
        <BackgroundGranules />
        {children}
      </body>
    </html>
  )
}
