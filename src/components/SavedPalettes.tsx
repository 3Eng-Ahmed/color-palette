import { Section } from './Section'
import { SavedPaletteCard } from './SavedPaletteCard'
import type { SavedPalette } from '../types/palette'

interface SavedPalettesProps {
  palettes: SavedPalette[]
  onLoad: (colors: string[]) => void
  onDelete: (id: string) => void
}

export function SavedPalettes({ palettes, onLoad, onDelete }: SavedPalettesProps) {
  return (
    <Section
      title="Saved palettes"
      count={palettes.length}
      emptyMessage="No saved palettes yet. Hit “Save palette” to keep one."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {palettes.map(palette => (
          <SavedPaletteCard
            key={palette.id}
            palette={palette}
            onLoad={onLoad}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </Section>
  )
}