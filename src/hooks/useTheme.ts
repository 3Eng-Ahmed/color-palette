import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { Theme } from '../types/palette'

function getInitialTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(
    'palette:theme',
    getInitialTheme
  )

  // Sync React state to the <html> class that Tailwind's dark: variant reads.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  return { theme, toggleTheme }
}