import { ThemeToggle } from './ThemeToggle'
import type { Theme } from '../types/palette'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

const LOGO_COLORS = ['#FF0000', '#00FF00', '#0000FF']

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div aria-hidden="true" className="flex h-9 overflow-hidden rounded-md">
            {LOGO_COLORS.map(color => (
              <span key={color} className="w-2" style={{ backgroundColor: color }} />
            ))}
          </div>
          <div>
            <h1 className="font-mono text-lg font-semibold leading-tight tracking-tight">
              huelab
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Generate, lock, and save color palettes.
            </p>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}