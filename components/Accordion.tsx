'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-ink/20">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="border-b border-ink/20">
            <button type="button" id={`faq-trigger-${index}`} aria-expanded={expanded} aria-controls={`faq-panel-${index}`} onClick={() => setOpen(expanded ? -1 : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8">
              <span className="font-display text-2xl leading-tight sm:text-3xl">{item.q}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink/30">
                <Plus className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .35 }} className="overflow-hidden">
                  <p className="max-w-3xl pb-7 text-sm leading-7 text-ink/65 sm:text-base sm:leading-8">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
