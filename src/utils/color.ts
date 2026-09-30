import type { HSL, RGB } from '../types/palette'

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Accepts "#abc", "abc", "#aabbcc", "aabbcc". Returns "#AABBCC" or null. */
export function normalizeHex(input: string): string | null {
  const value = input.trim()
  if (!HEX_PATTERN.test(value)) return null

  let digits = value.replace('#', '')
  if (digits.length === 3) {
    digits = digits
      .split('')
      .map(ch => ch + ch)
      .join('')
  }
  return `#${digits.toUpperCase()}`
}

export function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min
  const l = (max + min) / 2

  let h = 0
  let s = 0

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))
    if (max === rn) h = ((gn - bn) / delta) % 6
    else if (max === gn) h = (bn - rn) / delta + 2
    else h = (rn - gn) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100
  const light = l / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = sat * Math.min(light, 1 - light)
  const f = (n: number) =>
    light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) =>
    Math.round(x * 255).toString(16).padStart(2, '0')

  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase()
}

/** Random but pleasant: constrained saturation and lightness. */
export function randomHex(): string {
  const h = Math.floor(Math.random() * 360)
  const s = 45 + Math.floor(Math.random() * 46) // 45-90
  const l = 35 + Math.floor(Math.random() * 41) // 35-75
  return hslToHex(h, s, l)
}

export const formatRgb = ({ r, g, b }: RGB) => `rgb(${r}, ${g}, ${b})`
export const formatHsl = ({ h, s, l }: HSL) => `hsl(${h}, ${s}%, ${l}%)`

/** Pick black or white text for readable contrast on a given background. */
export function getReadableTextColor(hex: string): '#111111' | '#FFFFFF' {
  const { r, g, b } = hexToRgb(hex)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness >= 150 ? '#111111' : '#FFFFFF'
}