'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import PortfolioLightbox from './PortfolioLightbox';
import type { PortfolioProject } from './portfolio-types';

export type { PortfolioProject as Project } from './portfolio-types';

export default function PortfolioShowcase({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  const setLightboxIndex = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const root = rail.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-portfolio-card]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setMobileActive(Number((visible.target as HTMLElement).dataset.index));
      },
      { root, threshold: [.55, .72, .9] },
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
      <div className="hidden min-w-0 grid-cols-[minmax(280px,.7fr)_minmax(0,1.55fr)] gap-10 lg:grid xl:gap-16">
        <div className="flex min-w-0 flex-col justify-between border-y border-ink/20 py-5">
          <div>
            <div className="mb-3 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[.17em] text-ink/70">
              <span>Índice de projetos</span>
              <span className="tabular-nums">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            </div>
            <div aria-label="Selecionar projeto">
              {projects.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  aria-label={`Mostrar projeto ${item.title}`}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className={`group grid w-full grid-cols-[32px_minmax(0,1fr)_16px] items-center gap-3 border-t border-ink/12 py-3.5 text-left transition-colors first:border-t-0 ${active === index ? 'text-ink' : 'text-ink/70 hover:text-ink'}`}
                >
                  <span className={`text-[9px] tabular-nums transition-colors ${active === index ? 'text-brass-dark' : 'text-ink/70'}`}>{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 truncate font-display text-[1.35rem] leading-tight xl:text-2xl">{item.title}</span>
                  <ArrowUpRight className={`h-3.5 w-3.5 transition-all ${active === index ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-ink/15 pt-5">
            <p className="text-[9px] font-semibold uppercase tracking-[.16em] text-brass-dark">{project.location}</p>
            <p className="mt-2 font-display text-3xl leading-tight xl:text-[2.35rem]">{project.title}</p>
          </div>
        </div>

        <div className="min-w-0">
          <button type="button" onClick={() => setLightbox(active)} aria-label={`Ampliar projeto ${project.title}`} className="group relative block aspect-[16/10] w-full overflow-hidden bg-[#ddd9d0] text-left">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={project.src}
                initial={{ opacity: 0, clipPath: 'inset(0 0 0 8%)', scale: 1.018 }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)', scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .62, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {project.lowResolution ? (
                  <div className="flex h-full w-full items-center justify-center bg-[#ddd9d0] p-5">
                    <Image src={project.src} alt={project.title} width={479} height={479} unoptimized className="h-auto max-h-full w-full max-w-[472px] object-contain" />
                  </div>
                ) : (
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    quality={92}
                    sizes="(max-width: 1279px) 67vw, 980px"
                    className="object-cover"
                    style={{ objectPosition: project.position ?? 'center' }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
            <span className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[.17em] text-white/80 xl:bottom-7 xl:left-7">Abrir projeto</span>
            <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center bg-paper text-ink transition-colors group-hover:bg-brass xl:bottom-6 xl:right-6"><ArrowUpRight className="h-4 w-4" /></span>
          </button>

          <div className="mt-4 flex items-center justify-between border-b border-ink/20 pb-4">
            <p aria-live="polite" className="max-w-[70%] truncate text-[10px] uppercase tracking-[.16em] text-ink/70">{project.title} · {project.location}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setActive((active - 1 + projects.length) % projects.length)} aria-label="Projeto anterior" className="grid h-10 w-10 place-items-center border border-ink/20 transition-colors hover:border-brass hover:bg-brass"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => setActive((active + 1) % projects.length)} aria-label="Próximo projeto" className="grid h-10 w-10 place-items-center border border-ink/20 transition-colors hover:border-brass hover:bg-brass"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div
          ref={rail}
          data-portfolio-rail
          tabIndex={0}
          aria-label="Portfólio de projetos; deslize para explorar"
          className="scrollbar-none -mr-[14px] grid snap-x snap-mandatory grid-flow-col auto-cols-[94%] gap-4 overflow-x-auto overscroll-x-contain pb-3 pr-[14px] sm:auto-cols-[74%] md:auto-cols-[58%]"
        >
          {projects.map((item, index) => (
            <motion.button
              key={`${item.src}-${index}`}
              type="button"
              data-portfolio-card
              data-index={index}
              aria-label={`Ampliar projeto ${item.title}`}
              onClick={() => setLightbox(index)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: rail, amount: .25 }}
              transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
              className="group grid snap-start grid-rows-[auto_104px] text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ddd9d0]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  quality={88}
                  unoptimized={item.lowResolution}
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 58vw, 1px"
                  className="object-cover transition-transform duration-700 group-active:scale-[1.015]"
                  style={{ objectPosition: item.position ?? 'center' }}
                />
                <span className="absolute left-3 top-3 bg-ink px-3 py-2 text-[9px] font-semibold tabular-nums tracking-[.12em] text-white">{String(index + 1).padStart(2, '0')}</span>
                <span className="absolute right-3 top-3 grid h-11 w-11 place-items-center bg-paper text-ink"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
              <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-ink/20 py-4">
                <h3 className="line-clamp-2 font-display text-[1.7rem] leading-[1.02]">{item.title}</h3>
                <p className="max-w-[110px] pt-1 text-right text-[8px] font-semibold uppercase leading-4 tracking-[.14em] text-ink/70">{item.location}</p>
              </div>
            </motion.button>
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
