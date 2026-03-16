"use client"

import { Collapsible } from "@base-ui/react/collapsible"
import { Plus } from "lucide-react"
import { motion } from "motion/react"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import type { FaqContent } from "@/content/schema"

interface FaqSectionProps {
  content: FaqContent
}

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-2xl">
        {/* Left-aligned header */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-medium tracking-tight sm:text-4xl"
          >
            {content.heading}
          </motion.h2>
          {content.subheading && (
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground"
            >
              {content.subheading}
            </motion.p>
          )}
        </motion.div>

        {/* Staggered accordion list */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger(0.07)}
        >
          {content.items.map((item, index) => (
            <motion.div key={item.question} variants={fadeUp}>
              <Collapsible.Root className="border-t border-border">
                <Collapsible.Trigger className="group flex w-full items-start gap-6 py-6 text-left outline-none">
                  {/* Number */}
                  <span className="mt-px shrink-0 font-mono text-[11px] text-muted-foreground/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* Question */}
                  <span className="flex-1 text-sm font-medium leading-snug">
                    {item.question}
                  </span>
                  {/* Plus → × on open */}
                  <Plus
                    size={14}
                    strokeWidth={1.5}
                    className="mt-px shrink-0 text-muted-foreground transition-transform duration-200 group-data-[open]:rotate-45"
                  />
                </Collapsible.Trigger>
                <Collapsible.Panel className="overflow-hidden data-[ending-style]:animate-[collapsible-close_200ms_ease] data-[starting-style]:animate-[collapsible-open_200ms_ease]">
                  {/* Indent answer to align under question text */}
                  <p className="pb-6 pl-10 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </Collapsible.Panel>
              </Collapsible.Root>
            </motion.div>
          ))}
          {/* Closing rule */}
          <div className="border-t border-border" />
        </motion.div>
      </div>
    </section>
  )
}
