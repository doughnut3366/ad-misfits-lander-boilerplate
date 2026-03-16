import type { Variants } from "motion/react"

// Bezier curve as a const tuple so Motion's type checker accepts it
const EASE = [0.16, 1, 0.3, 1] as const

// Shared fade-up variant used across all sections
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

// Parent variant that staggers children — pair with fadeUp on children
export function stagger(delay = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: delay, delayChildren } },
  }
}

// Shared viewport config for whileInView
export const viewport = { once: true, margin: "-80px" } as const
