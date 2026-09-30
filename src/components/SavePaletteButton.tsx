import { useEffect, useRef, useState } from 'react'
import { BookmarkIcon, CheckIcon } from './icons'

interface SavePaletteButtonProps {
  onSave: () => boolean // true = saved, false = already exists
}

type Status = 'idle' | 'saved' | 'duplicate'

const LABELS: Record<Status, string> = {
  idle: 'Save palette',
  saved: 'Saved!',
  duplicate: 'Already saved',
}

export function SavePaletteButton({ onSave }: SavePaletteButtonProps) {
  const [status, setStatus] = useState<Status>('idle')
  const timeoutRef = useRef<number | undefined>(undefined)

  const handleClick = () => {
    setStatus(onSave() ? 'saved' : 'duplicate')
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setStatus('idle'), 1500)
  }

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:hover:bg-zinc-900"
    >
      {/* key={status} replays the pop animation on every state change */}
      <span key={status} className="inline-flex animate-pop items-center gap-2" aria-live="polite">
        {status === 'saved' ? (
          <CheckIcon className="size-4 text-green-500" />
        ) : (
          <BookmarkIcon className="size-4" />
        )}
        {LABELS[status]}
      </span>
    </button>
  )
}