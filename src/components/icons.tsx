interface IconProps {
  className?: string
  filled?: boolean
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export const LockIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" />
    <path d="M8 11V8a4 4 0 018 0v3" />
  </svg>
)

export const UnlockIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 017.5-2" />
  </svg>
)

export const HeartIcon = ({ className, filled }: IconProps) => (
  <svg {...base} className={className} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" />
  </svg>
)

export const CopyIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 012-2h9" />
  </svg>
)

export const CheckIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 13l4 4L19 7" />
  </svg>
)

export const RefreshIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006.3 5.7L4 10M4 15a8 8 0 0013.7 3.3L20 14" />
  </svg>
)

export const SunIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const MoonIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
  </svg>
)
export const BookmarkIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6 4h12v17l-6-4-6 4z" />
  </svg>
)

export const TrashIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
)

export const CloseIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)