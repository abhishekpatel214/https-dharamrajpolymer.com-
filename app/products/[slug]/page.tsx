import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import Image from "next/image";
import { getProduct, productSlugs } from "@/lib/products";
import type { Metadata } from "next";

// Import your new components
import { GetQuoteButton } from "@/components/get-quote-button";
import { Breadcrumbs } from "@/components/breadcrumbs";

// Import icons for section headings
import { ListChecks, CheckSquare, Package } from "lucide-react";

export const dynamic = "error";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/products/${product.slug}`,
      images: [{ url: product.image }],
    },
  };
}

// Reusable component for a single specification item
function SpecificationItem({ label, value }: { label: string; value: string }) {
    if (!value) return null;
    return (
        <>
            <dt className="font-medium text-slate-600">{label}</dt>
            <dd>{value}</dd>
        </>
    );
}


export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);

  if (!product) {
    // ... (Your existing "Product Not Found" code remains the same)
    return (
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-12 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Product Not Found</h1>
            <p className="mt-2 text-slate-600">The product you are looking for does not exist.</p>
          </main>
          <Footer />
        </div>
      );
  }

  // Create a clean array of specifications to map over
  const specifications = [
    { label: "Polymer", value: product.specifications.polymer },
    { label: "Grade", value: product.specifications.grade },
    { label: "MFI", value: product.specifications.mfi },
    { label: "Density", value: product.specifications.density },
    { label: "Color Options", value: product.specifications.colorOptions },
    { label: "Recycling", value: product.specifications.recycling },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <Breadcrumbs productName={product.name} />

        <article className="grid gap-8 lg:grid-cols-2 lg:gap-12" itemScope itemType="https://schema.org/Product">
          {/* Product Image */}
          <div className="overflow-hidden rounded-xl border bg-white shadow-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={900}
              height={600}
              className="h-auto w-full object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" itemProp="name">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-slate-700" itemProp="description">
              {product.description}
            </p>
            
            {/* CTA Button is now prominent and placed high on the page */}
            <div className="mt-8">
              <GetQuoteButton productName={product.name} />
            </div>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <ListChecks className="h-5 w-5 text-blue-600" />
                  Specifications
                </h2>
                {/* Refactored specifications list for cleaner code */}
                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 text-base text-slate-700 sm:grid-cols-2">
                    {specifications.map(spec => (
                        <SpecificationItem key={spec.label} label={spec.label} value={spec.value} />
                    ))}
                </dl>
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <CheckSquare className="h-5 w-5 text-blue-600" />
                  Applications
                </h2>
                <ul className="mt-3 space-y-1 list-inside list-disc text-base text-slate-700">
                  {product.applications.map((app) => (
                    <li key={app}>{app}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Package className="h-5 w-5 text-blue-600" />
                  Packaging & Minimum Order
                </h2>
                <p className="mt-3 text-base text-slate-700">
                  {product.packaging}. Minimum Order Quantity (MOQ):{" "}
                  <strong className="font-semibold text-slate-900">{product.minOrderKg} kg</strong>.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      
      {/* Your ld+json scripts remain unchanged */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ /* Product Schema */ }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ /* Breadcrumb Schema */ }) }} />
    </div>
  );
}