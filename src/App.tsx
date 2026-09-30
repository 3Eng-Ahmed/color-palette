import { useCallback } from 'react'
import { Favorites } from './components/Favorites'
import { GenerateButton } from './components/GenerateButton'
import { Header } from './components/Header'
import { Palette } from './components/Palette'
import { SavePaletteButton } from './components/SavePaletteButton'
import { SavedPalettes } from './components/SavedPalettes'
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut'
import { useLocalStorage } from './hooks/useLocalStorage'
import { usePalette } from './hooks/usePalette'
import { useTheme } from './hooks/useTheme'
import type { SavedPalette } from './types/palette'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { palette, hexes, generate, toggleLock, setColorHex, loadPalette } =
    usePalette()
  const [saved, setSaved] = useLocalStorage<SavedPalette[]>('palette:saved', [])
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    'palette:favorites',
    []
  )

  useKeyboardShortcut(' ', generate)

  // Returns false if an identical palette is already saved
  const savePalette = useCallback((): boolean => {
    const key = hexes.join()
    if (saved.some(p => p.colors.join() === key)) return false
    setSaved(prev => [
      { id: crypto.randomUUID(), colors: hexes, createdAt: Date.now() },
      ...prev,
    ])
    return true
  }, [hexes, saved, setSaved])

  const deletePalette = useCallback(
    (id: string) => setSaved(prev => prev.filter(p => p.id !== id)),
    [setSaved]
  )

  const handleLoad = useCallback(
    (colors: string[]) => {
      loadPalette(colors)
      window.scrollTo({ top: 0, behavior: 'smooth' }) // bring the generator into view on mobile
    },
    [loadPalette]
  )

  // Doubles as "remove": toggling a favorite that exists removes it
  const toggleFavorite = useCallback(
    (hex: string) =>
      setFavorites(prev =>
        prev.includes(hex) ? prev.filter(h => h !== hex) : [hex, ...prev]
      ),
    [setFavorites]
  )

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6">
        <div className="space-y-6">
          <Palette
            colors={palette}
            favorites={favorites}
            onToggleLock={toggleLock}
            onEditHex={setColorHex}
            onToggleFavorite={toggleFavorite}
          />

          <div className="flex flex-wrap items-center gap-3">
            <GenerateButton onGenerate={generate} />
            <SavePaletteButton onSave={savePalette} />
            <p className="hidden text-sm text-zinc-500 sm:block dark:text-zinc-400">
              Press{' '}
              <kbd className="rounded border border-zinc-300 px-1.5 py-0.5 font-mono text-xs dark:border-zinc-700">
                Space
              </kbd>{' '}
              to generate
            </p>
          </div>
        </div>

        <SavedPalettes
          palettes={saved}
          onLoad={handleLoad}
          onDelete={deletePalette}
        />
        <Favorites favorites={favorites} onRemove={toggleFavorite} />
      </main>
    </div>
  )
}