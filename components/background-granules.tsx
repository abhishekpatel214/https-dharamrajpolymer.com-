/* eslint-disable react/no-unknown-property */
"use client"

// Lightweight site-wide 3D "granules" background.
// Honors prefers-reduced-motion and sits behind all content.
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])
  return reduced
}

function Particles({ count = 650 }: { count?: number }) {
  const reduced = usePrefersReducedMotion()
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.cbrt(Math.random()) * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      arr.set([x, y, z], i * 3)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (!points.current) return
    const speed = reduced ? 0.02 : 0.06
    points.current.rotation.y += delta * speed
    points.current.rotation.x += delta * (speed * 0.5)
  })

  // Palette within 5 colors site-wide: white, slate-900, sky-600, teal-600, orange-500
  const color = new THREE.Color("#0284c7") // sky-600
  const color2 = new THREE.Color("#0d9488") // teal-600

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.85}
        color={color.lerp(color2, 0.35)}
      />
    </points>
  )
}

export default function BackgroundGranules() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50" aria-hidden="true">
      <Canvas
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
        camera={{ position: [0, 0, 9], fov: 60 }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" color="#ffffff" near={18} far={28} />
          <Particles count={650} />
        </Suspense>
      </Canvas>
    </div>
  )
}
