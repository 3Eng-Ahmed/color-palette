import { memo, useMemo } from 'react'
import { TrashIcon } from './icons'
import type { SavedPalette } from '../types/palette'

interface SavedPaletteCardProps {
  palette: SavedPalette
  onLoad: (colors: string[]) => void
  onDelete: (id: string) => void
}

export const SavedPaletteCard = memo(function SavedPaletteCard({
  palette,
  onLoad,
  onDelete,
}: SavedPaletteCardProps) {
  const { id, colors, createdAt } = palette

  const date = useMemo(
    () =>
      new Date(createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
    [createdAt]
  )

  return (
    // animate-pop runs on mount, so a newly saved card pops into the grid
    <li className="group relative animate-pop overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => onLoad(colors)}
        aria-label={`Load palette ${colors.join(', ')}`}
        className="block w-full text-left"
      >
        <div className="flex h-20">
          {colors.map((hex, i) => (
            <span
              key={`${hex}-${i}`}
              className="flex-1"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between px-3 py-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Click to load</span>
          <span>{date}</span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onDelete(id)}
        aria-label="Delete saved palette"
        title="Delete"
        className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-black/60 text-white transition hover:bg-red-600 active:scale-90 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <TrashIcon className="size-4" />
      </button>
    </li>
  )
})