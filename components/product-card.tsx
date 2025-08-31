"use client"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { motion } from "framer-motion" // new import

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      className="group overflow-hidden rounded-xl border bg-white shadow-sm"
      itemScope
      itemType="https://schema.org/Product"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <Image
          src={product.image || "/placeholder.svg?height=400&width=600&query=plastic%20granules"}
          alt={product.name}
          width={600}
          height={400}
          className="h-44 w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
          sizes="(min-width: 1024px) 300px, 100vw"
          decoding="async"
        />
        <div className="p-4">
          <h3 className="text-base font-semibold text-slate-900" itemProp="name">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600" itemProp="description">
            {product.description}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Polymer: <span className="font-medium text-slate-700">{product.specifications.polymer}</span> • MOQ:{" "}
            <span className="font-medium text-slate-700">{product.minOrderKg} kg</span>
          </p>
          <span className="mt-3 inline-block text-sm font-medium text-sky-600">
            View details →<span className="block h-0.5 w-14 bg-teal-600/80"></span>
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
