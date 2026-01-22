// Client hook to add 'enter' class when element intersects viewport.
// Usage: const ref = useRef(null); useReveal(ref);
'use client'
import { useEffect, RefObject } from 'react'

export default function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('enter')
      return
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('enter')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}