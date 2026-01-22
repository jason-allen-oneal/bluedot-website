'use client'
import { useRef, type ReactNode } from 'react'
import useReveal from '@/hooks/useReveal'

type RevealProps = {
  children: ReactNode
  className?: string
}

export default function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  useReveal(ref)

  const cls = ['reveal', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  )
}
