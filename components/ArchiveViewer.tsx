'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import PortfolioLightbox from './PortfolioLightbox';
import type { PortfolioProject } from './portfolio-types';

export default function ArchiveViewer({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const setLightboxIndex = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const root = rail.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-archive-card]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setMobileActive(Number((visible.target as HTMLElement).dataset.index));
      },
      { root, threshold: [.55, .8] },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [projects.length]);

  function moveMobile(direction: -1 | 1) {
    const next = (mobileActive + direction + projects.length) % projects.length;
    const card = rail.current?.querySelector<HTMLElement>(`[data-index="${next}"]`);
    rail.current?.scrollTo({ left: card?.offsetLeft ?? 0, behavior: 'smooth' });
    setMobileActive(next);
  }

  const project = projects[active];

  return (
    <>
      <div className="hidden min-w-0 border-y border-ink/20 py-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-12">
        <div className="lg:col-span-3">
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-brass-dark">Caderno visual</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={project.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .35 }}>
              <p aria-hidden="true" className="mt-8 font-display text-[clamp(5rem,8vw,8.5rem)] leading-[.72] text-ink/12">{String(active + 1).padStart(2, '0')}</p>
              <h3 className="mt-8 max-w-xs font-display text-[2.65rem] leading-[1.04] xl:text-5xl">{project.title}</h3>
              <p className="mt-5 text-[9px] font-semibold uppercase leading-5 tracking-[.16em] text-ink/70">{project.location}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-9 flex gap-2">
            <button type="button" onClick={() => setActive((active - 1 + projects.length) % projects.length)} aria-label="Projeto anterior" className="grid h-11 w-11 place-items-center border border-ink/20 transition-colors hover:border-brass hover:bg-brass"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => setActive((active + 1) % projects.length)} aria-label="Próximo projeto" className="grid h-11 w-11 place-items-center border border-ink/20 transition-colors hover:border-brass hover:bg-brass"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="flex justify-center lg:col-span-5">
          <button type="button" onClick={() => setLightbox(active)} aria-label={`Ampliar projeto ${project.title}`} className="group relative aspect-square w-full max-w-[472px] overflow-hidden bg-[#d8dcd9] text-left">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={project.src} initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                <Image src={project.src} alt={project.title} fill unoptimized sizes="472px" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute inset-0 border border-white/20" />
            <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center bg-paper text-ink transition-colors group-hover:bg-brass"><ArrowUpRight className="h-4 w-4" /></span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-5 lg:col-span-4" aria-label="Índice do acervo">
          {projects.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              aria-label={`Mostrar projeto ${item.title}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              className={`group grid min-h-[66px] grid-cols-[24px_minmax(0,1fr)] items-center gap-2 border-b border-ink/15 text-left transition-colors ${active === index ? 'text-ink' : 'text-ink/70 hover:text-ink'}`}
            >
              <span className={`text-[8px] tabular-nums ${active === index ? 'text-brass-dark' : ''}`}>{String(index + 1).padStart(2, '0')}</span>
              <span className="font-display text-lg leading-[1.02] xl:text-xl">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <div ref={rail} tabIndex={0} aria-label="Acervo de projetos; deslize para explorar" className="scrollbar-none -mr-[14px] grid snap-x snap-mandatory grid-flow-col auto-cols-[94%] gap-4 overflow-x-auto overscroll-x-contain pb-3 pr-[14px] sm:auto-cols-[70%] md:auto-cols-[52%]">
          {projects.map((item, index) => (
            <button key={`${item.src}-${index}`} type="button" data-archive-card data-index={index} onClick={() => setLightbox(index)} aria-label={`Ampliar projeto ${item.title}`} className="group grid snap-start grid-rows-[auto_104px] text-left">
              <div className="relative aspect-square overflow-hidden bg-[#d8dcd9]">
                <Image src={item.src} alt={item.title} fill unoptimized sizes="(max-width: 639px) 92vw, (max-width: 1023px) 52vw, 1px" className="object-cover transition-transform duration-700 group-active:scale-[1.015]" />
                <span className="absolute left-3 top-3 bg-petrol px-3 py-2 text-[9px] font-semibold tabular-nums tracking-[.12em] text-white">{String(index + 1).padStart(2, '0')}</span>
                <span className="absolute right-3 top-3 grid h-11 w-11 place-items-center bg-paper text-ink"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
              <div className="border-b border-ink/20 py-4">
                <h3 className="line-clamp-2 font-display text-[1.7rem] leading-[1.02]">{item.title}</h3>
                <p className="mt-2 text-[8px] font-semibold uppercase tracking-[.15em] text-ink/70">{item.location}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4">
          <p aria-live="polite" className="w-14 shrink-0 text-[10px] tabular-nums tracking-[.14em] text-ink/70">{String(mobileActive + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p>
          <div className="h-px flex-1 bg-ink/15"><motion.div className="h-px origin-left bg-brass-dark" animate={{ scaleX: (mobileActive + 1) / projects.length }} transition={{ duration: .35 }} /></div>
          <div className="flex gap-2">
            <button type="button" onClick={() => moveMobile(-1)} aria-label="Projeto anterior" className="grid h-11 w-11 place-items-center border border-ink/20"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => moveMobile(1)} aria-label="Próximo projeto" className="grid h-11 w-11 place-items-center border border-ink/20"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <PortfolioLightbox projects={projects} active={lightbox} onChange={setLightboxIndex} onClose={closeLightbox} />
    </>
  );
}
