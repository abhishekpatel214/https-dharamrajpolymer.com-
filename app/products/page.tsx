import { Header } from "@/components/site-header"
import { Footer } from "@/components/site-footer"
import { Section } from "@/components/section"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our HDPE & PP granules: White Plastic Granule, PPCP Blue Granules, Colored Polypropylene Granules, Orange PPCP Granules, PPCP Black Granules, and Blue PPCP Granules.",
  alternates: { canonical: "/products" },
}

export default function ProductsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main>
        <Section title="Products" subtitle="HDPE & PP Granules in various colors">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
