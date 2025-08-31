import type React from "react"
export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="mb-6">
        <h2 className="text-balance text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-slate-600">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}
