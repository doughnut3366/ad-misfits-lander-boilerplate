"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import type { CtaSectionContent } from "@/content/schema"

interface CtaSectionProps {
  content: CtaSectionContent
}

export function CtaSection({ content }: CtaSectionProps) {
  return (
    <section
      id="cta"
      className="border-t border-border bg-primary text-primary-foreground"
    >
      <motion.div
        className="mx-auto max-w-5xl px-6 py-28"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.1)}
      >
        {/* Split layout: heading left, description + CTA right */}
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-20">
          <motion.h2
            variants={fadeUp}
            className="max-w-xs text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex max-w-sm flex-col items-start gap-8 md:items-end md:text-right"
          >
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              {content.description}
            </p>
            <Button
              variant={content.button.variant ?? "secondary"}
              size={content.button.size ?? "lg"}
              render={<Link href={content.button.href} />}
            >
              {content.button.label}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
