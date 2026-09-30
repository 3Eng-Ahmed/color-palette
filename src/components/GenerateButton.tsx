import { RefreshIcon } from './icons'

interface GenerateButtonProps {
  onGenerate: () => void
}

export function GenerateButton({ onGenerate }: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onGenerate}
      className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-700 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      <RefreshIcon className="size-4 transition-transform duration-500 group-active:rotate-180" />
      Generate
    </button>
  )
}