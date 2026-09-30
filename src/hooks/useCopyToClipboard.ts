import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopyToClipboard(resetAfterMs = 1500) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)
  const timeoutRef = useRef<number | undefined>(undefined)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedValue(text)
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(
          () => setCopiedValue(null),
          resetAfterMs
        )
        return true
      } catch {
        return false // Permission denied or insecure context
      }
    },
    [resetAfterMs]
  )

  // Clear the pending timer if the component unmounts.
  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return { copiedValue, copy }
}