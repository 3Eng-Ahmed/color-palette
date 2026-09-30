import { memo, useEffect, useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ColorDetails } from './ColorDetails'
import { CheckIcon, CopyIcon, HeartIcon, LockIcon, UnlockIcon } from './icons'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { getReadableTextColor } from '../utils/color'
import type { PaletteColor } from '../types/palette'

interface ColorCardProps {
  color: PaletteColor
  index: number
  isFavorite: boolean
  onToggleLock: (id: string) => void
  onEditHex: (id: string, input: string) => boolean
  onToggleFavorite: (hex: string) => void
}

const buttonClass = (active = false) =>
  `grid size-9 place-items-center rounded-full transition active:scale-90 hover:bg-current/20 focus-visible:outline-2 focus-visible:outline-current ${
    active ? 'bg-current/25' : 'bg-current/10'
  }`

export const ColorCard = memo(function ColorCard({
  color,
  index,
  isFavorite,
  onToggleLock,
  onEditHex,
  onToggleFavorite,
}: ColorCardProps) {
  const { id, hex, locked } = color
  const textColor = useMemo(() => getReadableTextColor(hex), [hex])
  const { copiedValue, copy } = useCopyToClipboard()

  // Local, temporary input state: the palette only changes once the value is valid
  const [draft, setDraft] = useState(hex)
  const [hasError, setHasError] = useState(false)

  // When the color changes from outside (generate, load), reset the input
  useEffect(() => {
    setDraft(hex)
    setHasError(false)
  }, [hex])

  const applyDraft = () => {
    const ok = onEditHex(id, draft)
    setHasError(!ok)
    return ok
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (applyDraft()) event.currentTarget.blur()
    } else if (event.key === 'Escape') {
      setDraft(hex)
      setHasError(false)
    }
  }

  const handleBlur = () => {
    if (!applyDraft()) {
      setDraft(hex)
      setHasError(false)
    }
  }

  const copied = copiedValue === hex

  return (
    <article
      style={{
        backgroundColor: hex,
        color: textColor,
        transitionDelay: `${index * 40}ms`, // subtle left-to-right wave
      }}
      className={`flex flex-1 flex-col gap-4 p-4 transition-colors duration-500 lg:min-h-[26rem] lg:justify-between lg:p-5 ${
        locked ? 'ring-2 ring-inset ring-current/40' : ''
      }`}
    >
      <div className="flex justify-end gap-1.5">
        <button
          type="button"
          onClick={() => onToggleLock(id)}
          aria-pressed={locked}
          aria-label={locked ? 'Unlock color' : 'Lock color'}
          title={locked ? 'Unlock' : 'Lock'}
          className={buttonClass(locked)}
        >
          <span key={String(locked)} className="inline-flex animate-pop">
            {locked ? <LockIcon className="size-5" /> : <UnlockIcon className="size-5" />}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onToggleFavorite(hex)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={buttonClass(isFavorite)}
        >
          <span key={String(isFavorite)} className="inline-flex animate-pop">
            <HeartIcon className="size-5" filled={isFavorite} />
          </span>
        </button>

        <button
          type="button"
          onClick={() => copy(hex)}
          aria-label="Copy HEX"
          title="Copy HEX"
          className={buttonClass()}
        >
          <span key={String(copied)} className="inline-flex animate-pop">
            {copied ? <CheckIcon className="size-5" /> : <CopyIcon className="size-5" />}
          </span>
        </button>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <input
            value={draft}
            onChange={event => setDraft(event.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            maxLength={7}
            spellCheck={false}
            aria-label={`Edit HEX for color ${index + 1}`}
            aria-invalid={hasError}
            title="Type a HEX value, then press Enter"
            className="-mx-1 w-full rounded bg-transparent px-1 font-mono text-2xl font-semibold uppercase tracking-tight outline-none transition hover:bg-current/10 focus:bg-current/15 lg:text-3xl"
          />
          {hasError && (
            <p
              role="alert"
              className="inline-block animate-shake rounded bg-black/70 px-1.5 py-0.5 text-xs text-white"
            >
              Invalid HEX, try #1A2B3C
            </p>
          )}
        </div>

        <ColorDetails hex={hex} copiedValue={copiedValue} onCopy={copy} />
      </div>
    </article>
  )
})