export interface PaletteColor {
  id: string
  hex: string
  locked: boolean
}

export interface SavedPalette {
  id: string
  colors: string[] // hex values only
  createdAt: number
}

export type Theme = 'light' | 'dark'

export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}