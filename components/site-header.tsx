"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="Dharamraj Polymer Home">
          <Image
            src="/dharamraj-polymer-logo.png"
            alt="Dharamraj Polymer logo"
            width={50}
            height={50}
            className="rounded"
            priority
          />
          <span className="font-semibold text-slate-900">Dharamraj Polymer</span>
        </Link>
        <nav aria-label="Primary" className="hidden gap-1 sm:flex">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-sky-50 text-sky-700" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <motion.div
        className="h-0.5 w-full bg-gradient-to-r from-sky-600 to-sky-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </header>
  )
}
