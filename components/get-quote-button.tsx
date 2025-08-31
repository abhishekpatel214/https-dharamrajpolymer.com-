// components/get-quote-button.tsx
import Link from "next/link";
import { FileText } from "lucide-react";

export function GetQuoteButton({ productName }: { productName: string }) {
  return (
    <Link
      href={`/contact?product=${encodeURIComponent(productName)}`}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <FileText className="h-5 w-5" />
      Get Quote
    </Link>
  );
}