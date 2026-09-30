import { useEffect } from 'react'

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  )
}

export function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== key || event.repeat || isTypingTarget(event.target)) {
        return
      }
      event.preventDefault() // stops Space from scrolling the page
      callback()
    }

    // A focused <button> is "clicked" on keyup for Space, so cancel that too.
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === key && !isTypingTarget(event.target)) {
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [key, callback])
}