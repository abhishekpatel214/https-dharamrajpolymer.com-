"use client"

import { useEffect, useRef, useState } from "react"
import { type Product, products as productsData } from "@/lib/products"
import { ProductCard } from "./product-card"
import { motion } from "framer-motion" // new import

type Props = {
  products?: Product[]
  speed?: number // pixels per frame
}

export function ProductsMarquee({ products = productsData.slice(0, 10), speed = 0.6 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const items = products.length >= 10 ? products.slice(0, 10) : products
  const loopItems = [...items, ...items] // duplicate for seamless loop

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let raf = 0
    const step = () => {
      if (!paused) {
        el.scrollLeft += speed
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) {
          el.scrollLeft = el.scrollLeft - half
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    const onEnter = () => setPaused(true)
    const onLeave = () => setPaused(false)
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)
    el.addEventListener("touchstart", onEnter, { passive: true })
    el.addEventListener("touchend", onLeave, { passive: true })
    el.addEventListener("wheel", onEnter, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
      el.removeEventListener("touchstart", onEnter)
      el.removeEventListener("touchend", onLeave)
      el.removeEventListener("wheel", onEnter)
    }
  }, [paused, speed])

  return (
    <div
      ref={containerRef}
      className="products-marquee relative -mx-4 overflow-x-auto px-4 py-2 [scrollbar-width:none] [-ms-overflow-style:none]"
      aria-label="Product carousel"
    >
      <style>{`.products-marquee::-webkit-scrollbar{display:none}`}</style>
      <div className="flex gap-4">
        {loopItems.map((p, idx) => (
          <motion.div
            key={`${p.slug}-${idx}`}
            className="min-w-[280px] max-w-[320px] flex-shrink-0"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: (idx % items.length) * 0.03 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
