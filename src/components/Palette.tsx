import { ColorCard } from './ColorCard'
import type { PaletteColor } from '../types/palette'

interface PaletteProps {
  colors: PaletteColor[]
  favorites: string[]
  onToggleLock: (id: string) => void
  onEditHex: (id: string, input: string) => boolean
  onToggleFavorite: (hex: string) => void
}

export function Palette({
  colors,
  favorites,
  onToggleLock,
  onEditHex,
  onToggleFavorite,
}: PaletteProps) {
  return (
    <section
      aria-label="Current palette"
      className="flex flex-col overflow-hidden rounded-2xl border border-black/10 shadow-xl dark:border-white/10 lg:flex-row"
    >
      {colors.map((color, index) => (
        <ColorCard
          key={color.id}
          color={color}
          index={index}
          isFavorite={favorites.includes(color.hex)}
          onToggleLock={onToggleLock}
          onEditHex={onEditHex}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}