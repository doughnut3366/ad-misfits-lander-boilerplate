"use client"

import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { fadeUp, stagger } from "@/lib/motion"
import type { HeroContent } from "@/content/schema"

const container = stagger(0.09, 0.1)
const item = fadeUp

interface HeroSectionProps {
  content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      {/* Top rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-border" />

      <motion.div
        className="flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {content.badge && (
          <motion.p
            variants={item}
            className="mb-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            {content.badge}
          </motion.p>
        )}

        <motion.h1
          variants={item}
          className="max-w-4xl whitespace-pre-line text-balance text-6xl font-medium leading-[1.04] tracking-tight sm:text-7xl lg:text-[5.5rem]"
        >
          {content.heading}
        </motion.h1>

        <motion.div variants={item} className="my-10 h-px w-12 bg-border" />

        <motion.p
          variants={item}
          className="max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {content.subheading}
        </motion.p>

        {content.buttons.length > 0 && (
          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {content.buttons.map((btn) => (
              <Button
                key={btn.label}
                variant={btn.variant ?? "default"}
                size={btn.size ?? "default"}
                render={<Link href={btn.href} />}
              >
                {btn.label}
              </Button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span>Scroll</span>
        <ArrowDown size={10} strokeWidth={1.5} />
      </motion.div>
    </section>
  )
}
