import { useMemo } from 'react'
import { formatHsl, formatRgb, hexToRgb, rgbToHsl } from '../utils/color'

interface ColorDetailsProps {
  hex: string
  copiedValue: string | null
  onCopy: (text: string) => void
}

export function ColorDetails({ hex, copiedValue, onCopy }: ColorDetailsProps) {
  // RGB and HSL are derived from HEX, never stored
  const rows = useMemo(() => {
    const rgb = hexToRgb(hex)
    return [
      { label: 'HEX', value: hex },
      { label: 'RGB', value: formatRgb(rgb) },
      { label: 'HSL', value: formatHsl(rgbToHsl(rgb)) },
    ]
  }, [hex])

  return (
    <ul className="grid gap-1 md:grid-cols-3 lg:grid-cols-1">
      {rows.map(({ label, value }) => {
        const copied = copiedValue === value
        return (
          <li key={label}>
            <button
              type="button"
              onClick={() => onCopy(value)}
              title={`Copy ${label}`}
              className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left font-mono text-xs transition hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-current"
            >
              <span className="opacity-60">{label}</span>
              <span key={String(copied)} className={copied ? 'animate-pop font-semibold' : ''}>
                {copied ? 'Copied!' : value}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}