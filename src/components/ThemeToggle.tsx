import { MoonIcon, SunIcon } from './icons'
import type { Theme } from '../types/palette'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 active:scale-90 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
    >
      {/* key={theme} remounts the span, which replays the pop animation */}
      <span key={theme} className="inline-flex animate-pop">
        {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
      </span>
    </button>
  )
}