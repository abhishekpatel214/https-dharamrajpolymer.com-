"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useMemo, useRef } from "react"
import type { Points as ThreePoints } from "three"
import { useReducedMotion } from "framer-motion"

function Particles({ count = 900, color }: { count?: number; color: string }) {
  const ref = useRef<ThreePoints>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // distribute points in a soft cube around origin
      arr[i * 3 + 0] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    // subtle rotation and bob
    ref.current.rotation.y = t * 0.03
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.08
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial color={color} size={0.02} sizeAttenuation transparent opacity={0.7} />
    </Points>
  )
}

export default function GranulesCanvas() {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) return null

  // Colors: keep within our 5-color palette; use teal-600 granules for a colorful feel
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Particles color="#0d9488" />
      </Canvas>
    </div>
  )
}
