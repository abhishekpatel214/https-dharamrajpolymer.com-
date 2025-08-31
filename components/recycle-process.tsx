"use client"

import { useReducedMotion, motion, Transition } from "framer-motion"
import {
  Recycle,
  Trash2,
  Filter,
  Scissors,
  Droplets,
  Flame,
  PackageCheck,
  Sparkles,
} from "lucide-react"
import type React from "react"

// --- Define the steps for the process ---
const steps = [
  { label: "Collect", Icon: Trash2 },
  { label: "Sort", Icon: Filter },
  { label: "Shred", Icon: Scissors },
  { label: "Wash", Icon: Droplets },
  { label: "Dry & Melt", Icon: Flame },
  { label: "Extrude & Pack", Icon: PackageCheck },
]

// --- Detailed descriptions for the list view ---
const copySteps = [
  {
    Icon: Trash2,
    title: "1. Collection",
    desc: "We start by gathering post-consumer and post-industrial plastic waste from trusted sources.",
  },
  {
    Icon: Filter,
    title: "2. Sorting",
    desc: "Materials are meticulously sorted by type (PP, PE, HDPE) to ensure the highest quality output.",
  },
  {
    Icon: Scissors,
    title: "3. Shredding",
    desc: "The sorted plastic is shredded into small, uniform flakes, preparing it for a deep clean.",
  },
  {
    Icon: Droplets,
    title: "4. Washing",
    desc: "A multi-stage washing process removes all contaminants like labels, dirt, and residue.",
  },
  {
    Icon: Flame,
    title: "5. Drying & Melting",
    desc: "The clean flakes are dried, then melted down under controlled temperatures into a molten polymer.",
  },
  {
    Icon: PackageCheck,
    title: "6. Extrusion & Packaging",
    desc: "Finally, the molten plastic is extruded, cooled into granules, and packed in 25kg bags.",
  },
]

export default function RecycleProcess() {
  const shouldReduceMotion = useReducedMotion()

  // --- SVG Geometry ---
  const size = 420
  const center = size / 2
  const radius = 150
  const iconCircleRadius = 30

  // --- Calculate positions for each step on the circle ---
  const positions = steps.map((_, i) => {
    const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2 // Start at the top
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    return { x, y }
  })

  // --- Animation Variants ---
  const groupAnimation = shouldReduceMotion ? {} : { rotate: 360 }

  const loopingTransition: Transition = {
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
    duration: 30,
  }

  const groupTransition = shouldReduceMotion ? {} : loopingTransition

  return (
    <section aria-labelledby="recycle-process-title" className="relative mx-auto w-full max-w-6xl overflow-hidden px-4 py-16 md:py-24">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-3xl" />

      {/* --- Section Header --- */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1 text-sm font-semibold text-teal-800 ring-1 ring-inset ring-teal-200"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Our Circular Process
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="recycle-process-title"
          className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Transforming Waste into Value
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-pretty text-lg text-slate-600"
        >
          We turn post-consumer and industrial plastic into high-quality polymer granules through a clean, efficient, and
          fully traceable system.
        </motion.p>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
        
        {/* --- Left Side: Animated Diagram --- */}
        <div className="relative flex h-full min-h-[420px] w-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <svg
              viewBox={`0 0 ${size} ${size}`}
              width={size}
              height={size}
              role="img"
              aria-label="An animated circular diagram illustrating the 6 stages of the plastic recycling process."
              className="max-w-full overflow-visible"
            >
              <defs>
                <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                {/* FIX: Using a proper drop-shadow filter for SVG */}
                <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0d9488" floodOpacity="0.2" />
                </filter>
              </defs>

              {/* Base track circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(203, 213, 225, 0.5)"
                strokeWidth="2"
                strokeDasharray="4 8"
              />

              {/* FIX: Central Icon rendered reliably inside foreignObject */}
              <foreignObject x={center - 50} y={center - 50} width="100" height="100" style={{ filter: "url(#dropShadow)" }}>
                 <div className="flex h-full w-full items-center justify-center">
                    <Recycle
                      className="h-full w-full"
                      style={{ fill: "url(#iconGradient)", color: "white" }}
                    />
                 </div>
              </foreignObject>

              {/* Rotating group for icons */}
              <motion.g animate={groupAnimation} transition={groupTransition} style={{ originX: center, originY: center }}>
                {positions.map((pos, i) => {
                  const { Icon, label } = steps[i]
                  return (
                    // Use a group for each orbiting item
                    <g key={i} style={{ filter: "url(#dropShadow)" }}>
                      <circle cx={pos.x} cy={pos.y} r={iconCircleRadius} className="fill-white" />
                      <circle cx={pos.x} cy={pos.y} r={iconCircleRadius} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                      
                      {/* Counter-rotating icon */}
                      <motion.g
                        style={{ originX: pos.x, originY: pos.y }}
                        animate={shouldReduceMotion ? {} : { rotate: -360 }}
                        transition={groupTransition}
                      >
                        <foreignObject x={pos.x - 20} y={pos.y - 20} width="40" height="40">
                          <div className="flex h-full w-full items-center justify-center">
                            <Icon className="h-6 w-6 text-teal-600" aria-hidden="true" />
                          </div>
                        </foreignObject>
                      </motion.g>
                      
                      {/* Counter-rotating text label */}
                      <motion.g
                        style={{ originX: pos.x, originY: pos.y }}
                        animate={shouldReduceMotion ? {} : { rotate: -360 }}
                        transition={groupTransition}
                      >
                        <text
                          x={pos.x}
                          y={pos.y + iconCircleRadius + 18}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="select-none fill-slate-700 text-sm font-medium tracking-wide"
                        >
                          {label}
                        </text>
                      </motion.g>
                    </g>
                  )
                })}
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* --- Right Side: Description List --- */}
        <ul className="space-y-4">
          {copySteps.map((item, index) => (
            <motion.li
              key={item.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="flex items-start gap-4"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-white shadow-md">
                <item.Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-800">{item.title}</p>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}