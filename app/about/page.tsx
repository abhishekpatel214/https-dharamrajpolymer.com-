import { Header } from "@/components/site-header"
import { Footer } from "@/components/site-footer"
import type { Metadata } from "next"

// Import icons from lucide-react
import { ShieldCheck, Truck, Handshake, Factory, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Dharamraj Polymer",
  description:
    "Dharamraj Polymer is a leading manufacturer and exporter of high-quality HDPE & PP granules in all colors. Based in Gandhinagar, Gujarat.",
  alternates: { canonical: "/about" },
}

// A reusable component for feature cards
function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full  text-blue-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-slate-600">{children}</p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col ">
      <Header />
      <main>
        {/* Section 1: Hero */}
        <section className=" py-16 text-center md:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              About Dharamraj Polymer
            </h1>
            <p className="mt-4 text-lg font-semibold text-blue-600 sm:text-xl">
              Quality • Reliability • Trust
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700">
              Dharamraj Polymer is a trusted manufacturer and exporter of plastic granules with a strong presence in
              Gandhinagar, Gujarat. We specialize in HDPE and PP granules in a vast range of colors, serving diverse
              industrial applications.
            </p>
          </div>
        </section>

        {/* Section 2: Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
            <div className="prose prose-slate max-w-none text-slate-700">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Our Story</h2>
              <p>
                Dharamraj Polymer was founded by <strong>Mr. Kishan Gurjar</strong> with a humble beginning as a{" "}
                <em>waste collector</em>, learning material behavior at the grassroots level.
              </p>
              <p>
                With unwavering dedication and a customer-first focus, the company evolved into a reliable manufacturer of HDPE & PP granules, now serving clients across India and beyond. We ensure our customers receive the right material, on time, every time.
              </p>
            </div>
            {/* You can add an image of the founder or factory here */}
            <div className="flex h-80 items-center justify-center rounded-lg ">
              <Factory className="h-24 w-24 text-slate-400" />
            </div>
          </div>
        </section>

        {/* Section 3: What We Stand For */}
        <section className=" py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">What We Stand For</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                Our principles guide every batch we produce and every client we serve.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <FeatureCard icon={ShieldCheck} title="Consistent Quality">
                We enforce tight control on shade accuracy and mechanical properties for dependable performance.
              </FeatureCard>
              <FeatureCard icon={Truck} title="On-Time Delivery">
                With reliable logistics and planned inventories, we ensure your production never stops.
              </FeatureCard>
              <FeatureCard icon={Handshake} title="Partnership Mindset">
                We work with you to match the perfect material to your application, not the other way around.
              </FeatureCard>
            </div>
          </div>
        </section>
        
        {/* Section 4: Capabilities & Contact */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Manufacturing & Capability</h2>
                    <p className="mt-4 text-lg text-slate-700">
                        We are the manufacturers of HDPE & PP granules in all colours. We offer color-matched granules with customizable MFI and grades for injection and extrusion molding. Our minimum order quantity (MOQ) is <strong>25 kg</strong>, making us a flexible partner for projects from prototyping to bulk production.
                    </p>
                </div>
                <div className="rounded-lg  p-6">
                    <h3 className="flex items-center text-2xl font-bold text-slate-800">
                        <MapPin className="mr-3 h-7 w-7 text-blue-600" />
                        Visit Us
                    </h3>
                    <address className="mt-4 text-lg text-slate-700 not-italic">
                        Dharamraj Polymer<br />
                        Mota Chiloda, Himatnagar Highway,<br />
                        Near Krishna Hotel, N.H. 8,<br />
                        Gandhinagar, Gujarat - 382355
                    </address>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}