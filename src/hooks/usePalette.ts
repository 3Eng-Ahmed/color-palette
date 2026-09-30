import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { normalizeHex, randomHex } from '../utils/color'
import type { PaletteColor } from '../types/palette'

const PALETTE_SIZE = 5

function createInitialPalette(): PaletteColor[] {
  return Array.from({ length: PALETTE_SIZE }, () => ({
    id: crypto.randomUUID(),
    hex: randomHex(),
    locked: false,
  }))
}

export function usePalette() {
  const [palette, setPalette] = useLocalStorage<PaletteColor[]>(
    'palette:current',
    createInitialPalette
  )

  // Locked colors keep the exact same object; unlocked ones get a new hex.
  const generate = useCallback(() => {
    setPalette(prev =>
      prev.map(color => (color.locked ? color : { ...color, hex: randomHex() }))
    )
  }, [setPalette])

  const toggleLock = useCallback(
    (id: string) => {
      setPalette(prev =>
        prev.map(color =>
          color.id === id ? { ...color, locked: !color.locked } : color
        )
      )
    },
    [setPalette]
  )

  // Returns false when the input isn't a valid HEX so the UI can show an error.
  const setColorHex = useCallback(
    (id: string, input: string): boolean => {
      const hex = normalizeHex(input)
      if (!hex) return false
      setPalette(prev =>
        prev.map(color => (color.id === id ? { ...color, hex } : color))
      )
      return true
    },
    [setPalette]
  )

  // Reuse existing ids so cards transition smoothly instead of remounting.
  const loadPalette = useCallback(
    (hexes: string[]) => {
      setPalette(prev =>
        prev.map((color, i) => ({
          ...color,
          hex: hexes[i] ?? color.hex,
          locked: false,
        }))
      )
    },
    [setPalette]
  )

  // What "Save palette" stores: just the hex strings.
  const hexes = useMemo(() => palette.map(color => color.hex), [palette])

  return { palette, hexes, generate, toggleLock, setColorHex, loadPalette }
}