import type { MetadataRoute } from "next"
import { products } from "@/lib/products"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()
  const basePaths = ["/", "/about", "/products", "/contact"]
  const paths = [...basePaths, ...products.map((p) => `/products/${p.slug}`)]

  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }))
}
