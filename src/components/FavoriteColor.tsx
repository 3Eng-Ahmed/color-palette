import { memo, useMemo } from 'react'
import { CloseIcon } from './icons'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { getReadableTextColor } from '../utils/color'

interface FavoriteColorProps {
  hex: string
  onRemove: (hex: string) => void
}

export const FavoriteColor = memo(function FavoriteColor({
  hex,
  onRemove,
}: FavoriteColorProps) {
  const { copiedValue, copy } = useCopyToClipboard()
  const textColor = useMemo(() => getReadableTextColor(hex), [hex])
  const copied = copiedValue === hex

  return (
    <li className="group relative animate-pop">
      <button
        type="button"
        onClick={() => copy(hex)}
        title="Copy HEX"
        style={{ backgroundColor: hex, color: textColor }}
        className="grid h-16 w-28 place-items-center rounded-xl font-mono text-xs font-semibold shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5 active:scale-95"
      >
        <span key={String(copied)} className={copied ? 'animate-pop' : ''}>
          {copied ? 'Copied!' : hex}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onRemove(hex)}
        aria-label={`Remove ${hex} from favorites`}
        title="Remove"
        className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-zinc-900 text-white transition hover:bg-red-600 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 dark:bg-white dark:text-zinc-900 dark:hover:bg-red-500 dark:hover:text-white"
      >
        <CloseIcon className="size-3" />
      </button>
    </li>
  )
})