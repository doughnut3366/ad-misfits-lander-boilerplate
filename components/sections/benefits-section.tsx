"use client"

import * as LucideIcons from "lucide-react"
import type { LucideProps } from "lucide-react"
import { motion } from "motion/react"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import type { BenefitsContent } from "@/content/schema"

// ─── Icon lookup ──────────────────────────────────────────────────────────────

type LucideIconName = keyof typeof LucideIcons

function BenefitIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = LucideIcons[name as LucideIconName] as
    | React.ComponentType<LucideProps>
    | undefined
  if (!Icon || typeof Icon !== "function") return null
  return <Icon {...props} />
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BenefitsSectionProps {
  content: BenefitsContent
}

export function BenefitsSection({ content }: BenefitsSectionProps) {
  return (
    <section id="benefits" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Split header */}
        <motion.div
          className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.h2
            variants={fadeUp}
            className="max-w-xs text-3xl font-medium tracking-tight sm:text-4xl"
          >
            {content.heading}
          </motion.h2>
          {content.subheading && (
            <motion.p
              variants={fadeUp}
              className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-right"
            >
              {content.subheading}
            </motion.p>
          )}
        </motion.div>

        {/* Open grid with internal dividers + staggered items */}
        <motion.div
          className="grid divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger(0.1)}
        >
          {content.items.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex cursor-default flex-col gap-6 px-0 py-10 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="flex items-center justify-between">
                <BenefitIcon
                  name={item.icon}
                  size={18}
                  strokeWidth={1.5}
                  className="text-foreground"
                />
                <span className="font-mono text-[11px] text-muted-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
