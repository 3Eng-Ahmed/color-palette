import { useId } from 'react'
import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  count: number
  emptyMessage: string
  children: ReactNode
}

export function Section({ title, count, emptyMessage, children }: SectionProps) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 id={headingId} className="text-lg font-semibold tracking-tight">
          {title}
        </h2>
        <span className="rounded-full bg-zinc-200 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {count}
        </span>
      </div>

      {count > 0 ? (
        children
      ) : (
        <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          {emptyMessage}
        </p>
      )}
    </section>
  )
}