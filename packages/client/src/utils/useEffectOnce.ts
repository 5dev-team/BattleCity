import { useRef, useEffect } from 'react'

export default function useEffectOnce(fn: () => unknown) {
  const ref = useRef(false)
  useEffect(() => {
    if (ref.current) {
      fn()
    }
    return () => {
      ref.current = true
    }
  }, [])
}