import { Header } from "@/components/site-header"
import { Footer } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { Section } from "@/components/section"
import { products } from "@/lib/products"
import { ProductsMarquee } from "@/components/products-marquee"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import RecycleProcess from "@/components/recycle-process"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main>
        <Hero />
       
        {/* <Section id="about" title="About Dharamraj Polymer" subtitle="Quality you can trust">
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="leading-relaxed">
              Based in Gandhinagar, Gujarat, India, Dharamraj Polymer is a leading manufacturer of high-quality HDPE and
              PP granules in all colors. We are committed to consistent quality, on-time delivery, and trusted
              relationships across industries.
            </p>
            <p className="leading-relaxed">
              We supply{" "}
              <strong>
                White Plastic Granules, PPCP Blue Granules, Colored Polypropylene Granules, Orange PPCP Granules, PPCP
                Black Granules, and Blue PPCP Granules
              </strong>{" "}
              with a focus on durability, color accuracy, and batch-to-batch consistency.
            </p>
          </div>
        </Section> */}

        <Section id="products" title="Our Products" subtitle="HDPE & PP Granules in all colors">
          <ProductsMarquee products={products.slice(0, 10)} />
        </Section>

         <Section
          id="process"
          title="Circular Recycling Process"
          subtitle="From waste plastic to high‑quality polymer granules"
        >
          <RecycleProcess />
        </Section>

        <Section id="contact" title="Contact Us" subtitle="We'd love to hear from you">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://wa.me/919316445402?text=Hello%20Dharamraj%20Polymer%2C%20I%27d%20like%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border bg-sky-50 p-3 hover:bg-sky-100"
                >
                  <MessageCircle className="h-5 w-5 text-sky-600" />
                  <div>
                    <div className="text-sm font-semibold">WhatsApp</div>
                    <div className="text-xs text-slate-600">Chat for quick quotes</div>
                  </div>
                </a>
                <a
                  href="tel:+919316445402"
                  className="flex items-center gap-3 rounded-lg border bg-sky-50 p-3 hover:bg-sky-100"
                >
                  <Phone className="h-5 w-5 text-sky-600" />
                  <div>
                    <div className="text-sm font-semibold">+91 9316445402</div>
                    <div className="text-xs text-slate-600">Call sales</div>
                  </div>
                </a>
                <a
                  href="mailto:dharamrajpolymer@gmail.com"
                  className="flex items-center gap-3 rounded-lg border bg-orange-50 p-3 hover:bg-orange-100"
                >
                  <Mail className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="text-sm font-semibold">dharamrajpolymer@gmail.com</div>
                    <div className="text-xs text-slate-600">Share requirements</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-lg border bg-slate-50 p-3">
                  <MapPin className="h-5 w-5 text-slate-600" />
                  <div>
                    <div className="text-sm font-semibold">Address</div>
                    <div className="text-xs text-slate-600">Gandhinagar, Gujarat, India</div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                For quotes and bulk orders, include your product requirements and monthly volume.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <iframe
                title="Map of Gandhinagar, Gujarat"
                src="https://www.google.com/maps?q=Gandhinagar%2C%20Gujarat%2C%20India&output=embed"
                className="h-72 w-full md:h-96"
                loading="lazy"
              />
            </div>
          </div>
        </Section>
      </main>
      <Footer />

      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Dharamraj Polymer",
            url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            logo: "/dharamraj-polymer-logo.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gandhinagar",
              addressRegion: "Gujarat",
              addressCountry: "IN",
            },
            contactPoint: [
              { "@type": "ContactPoint", telephone: "+91-00000-00000", contactType: "sales", areaServed: "IN" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Dharamraj Polymer",
            url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            potentialAction: {
              "@type": "SearchAction",
              target: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  )
}
