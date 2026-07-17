'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';
import type { PortfolioProject } from './portfolio-types';

type PortfolioLightboxProps = {
  projects: PortfolioProject[];
  active: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

export default function PortfolioLightbox({ projects, active, onChange, onClose }: PortfolioLightboxProps) {
  const titleId = useId();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((active + 1) % projects.length);
      if (event.key === 'ArrowLeft') onChange((active - 1 + projects.length) % projects.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    requestAnimationFrame(() => closeButton.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [active, onChange, onClose, projects.length]);

  return (
    <AnimatePresence>
      {active !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .28 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
          className="fixed inset-0 z-[80] grid grid-rows-[auto_minmax(0,1fr)_auto] bg-[#0c0d0c]/[.98] p-4 text-white sm:p-7 lg:p-9"
        >
          <header className="flex items-start justify-between gap-6 border-b border-white/15 pb-4 sm:pb-5">
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-brass">
                Projeto {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </p>
              <h2 id={titleId} className="mt-2 truncate font-display text-2xl leading-tight sm:text-3xl">
                {projects[active].title}
              </h2>
            </div>
            <button ref={closeButton} type="button" onClick={onClose} aria-label="Fechar imagem" className="grid h-11 w-11 shrink-0 place-items-center border border-white/30 transition-colors hover:border-brass hover:bg-brass hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="grid min-h-0 place-items-center py-5 sm:py-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={projects[active].src}
                initial={{ opacity: 0, scale: .985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .992 }}
                transition={{ duration: .38, ease: [0.22, 1, 0.36, 1] }}
                className={projects[active].lowResolution
                  ? 'relative aspect-square w-full max-w-[472px]'
                  : 'relative h-full max-h-[76svh] w-full max-w-7xl'}
              >
                <Image
                  src={projects[active].src}
                  alt={projects[active].title}
                  fill
                  quality={92}
                  unoptimized={projects[active].lowResolution}
                  sizes={projects[active].lowResolution ? '(max-width: 520px) 92vw, 472px' : '100vw'}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="flex items-center justify-between gap-4 border-t border-white/15 pt-4 sm:pt-5">
            <button type="button" onClick={() => onChange((active - 1 + projects.length) % projects.length)} aria-label="Projeto anterior" className="inline-flex min-h-11 items-center gap-2 border border-white/25 px-3 text-[9px] font-semibold uppercase tracking-[.14em] transition-colors hover:border-brass hover:text-brass sm:px-5">
              <ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline">Anterior</span>
            </button>
            <p className="max-w-[48%] truncate text-center text-[9px] uppercase tracking-[.15em] text-white/55">{projects[active].location}</p>
            <button type="button" onClick={() => onChange((active + 1) % projects.length)} aria-label="Próximo projeto" className="inline-flex min-h-11 items-center gap-2 border border-white/25 px-3 text-[9px] font-semibold uppercase tracking-[.14em] transition-colors hover:border-brass hover:text-brass sm:px-5">
              <span className="hidden sm:inline">Próximo</span><ChevronRight className="h-4 w-4" />
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
