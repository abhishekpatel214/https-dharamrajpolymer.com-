"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Package, FileText } from "lucide-react" // Import icons

export function Hero() {
  // Animation variants for a staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each child will animate 0.2s after the previous one
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative h-[calc(100vh-80px)] isolate overflow-hidden" aria-label="Hero">
      {/* Background Video */}
      <video
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        src="/Video_Ready_for_Website_Hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/animated-plastic-granules-loop.png"
        aria-hidden="true"
      />
      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="mx-auto flex h-full max-w-6xl items-center justify-center px-4 py-10 sm:py-16">
        {/* Centered content with text-center */}
        <motion.div
          className="grid items-center gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h1
              className="text-balance text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl"
              variants={itemVariants}
            >
              Leading Manufacturer of HDPE & PP Granules
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-slate-200 sm:text-xl"
              variants={itemVariants}
            >
              Trusted by industries across India for unparalleled quality, consistency, and color accuracy in every batch.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <Package className="h-5 w-5" />
                View Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300/40 bg-white/10 px-6 py-3 text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <FileText className="h-5 w-5" />
                Get a Quote
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}