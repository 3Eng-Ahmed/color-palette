import { useCallback } from 'react'
import { GenerateButton } from './components/GenerateButton'
import { Header } from './components/Header'
import { Palette } from './components/Palette'
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut'
import { useLocalStorage } from './hooks/useLocalStorage'
import { usePalette } from './hooks/usePalette'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { palette, generate, toggleLock, setColorHex } = usePalette()
  const [favorites, setFavorites] = useLocalStorage<string[]>('palette:favorites', [])

  const toggleFavorite = useCallback(
    (hex: string) => {
      setFavorites(prev =>
        prev.includes(hex) ? prev.filter(h => h !== hex) : [...prev, hex]
      )
    },
    [setFavorites]
  )

  useKeyboardShortcut(' ', generate)

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <Palette
          colors={palette}
          favorites={favorites}
          onToggleLock={toggleLock}
          onEditHex={setColorHex}
          onToggleFavorite={toggleFavorite}
        />
        <div className="flex flex-wrap items-center gap-4">
          <GenerateButton onGenerate={generate} />
          <p className="hidden text-sm text-zinc-500 sm:block dark:text-zinc-400">
            Press{' '}
            <kbd className="rounded border border-zinc-300 px-1.5 py-0.5 font-mono text-xs dark:border-zinc-700">
              Space
            </kbd>{' '}
            to generate
          </p>
        </div>
      </main>
    </div>
  )
}