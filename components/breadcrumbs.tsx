// components/breadcrumbs.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ productName }: { productName: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-slate-600">
      <Link href="/" className="hover:underline">Home</Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/products" className="hover:underline">Products</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-slate-800">{productName}</span>
    </nav>
  );
}