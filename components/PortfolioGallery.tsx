'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type Project = {
  src: string;
  title: string;
  location: string;
  ratio?: 'landscape' | 'portrait' | 'square';
  size?: 'feature' | 'standard' | 'compact';
  position?: string;
  lowResolution?: boolean;
};

const aspectClass = {
  landscape: 'aspect-[16/10]',
  portrait: 'aspect-[2/3]',
  square: 'aspect-square',
};

function gridClass(project: Project) {
  if (project.lowResolution) return 'col-span-6 sm:col-span-4 lg:col-span-3';
  if (project.size === 'feature') return 'col-span-12';
  if (project.ratio === 'portrait') return 'col-span-12 sm:col-span-6 lg:col-span-4';
  if (project.size === 'compact' || project.ratio === 'square') return 'col-span-12 sm:col-span-6 lg:col-span-4';
  return 'col-span-12 md:col-span-6';
}

export default function PortfolioGallery({ projects, dark = false }: { projects: Project[]; dark?: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((active + 1) % projects.length);
      if (event.key === 'ArrowLeft') setActive((active - 1 + projects.length) % projects.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [active, projects.length]);

  return (
    <>
      <div className="grid grid-flow-dense grid-cols-12 gap-x-4 gap-y-10 lg:gap-x-5 lg:gap-y-16">
        {projects.map((project, index) => {
          const ratio = project.ratio ?? 'landscape';
          const feature = project.size === 'feature';
          return (
            <motion.button
              key={`${project.src}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .08 }}
              transition={{ duration: .65, delay: Math.min(index, 3) * .035, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden text-left ${gridClass(project)}`}
              aria-label={`Ampliar projeto ${project.title}`}
            >
              <div className={`relative overflow-hidden bg-ivory ${feature ? 'aspect-[16/8.5]' : aspectClass[ratio]}`}>
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  quality={90}
                  unoptimized={project.lowResolution}
                  sizes={feature ? '100vw' : ratio === 'portrait' || project.size === 'compact' ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw' : '(max-width: 768px) 100vw, 50vw'}
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.025]"
                  style={{ objectPosition: project.position ?? 'center' }}
                />
                <span className={`absolute right-3 top-3 place-items-center bg-paper/95 text-ink opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 ${project.lowResolution ? 'grid h-9 w-9' : 'grid h-11 w-11'}`}>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className={`flex items-start justify-between gap-4 border-b py-4 ${dark ? 'border-white/15 text-white' : 'border-ink/15 text-ink'}`}>
                <h3 className={`font-display leading-none ${project.lowResolution ? 'text-base sm:text-xl' : 'text-2xl sm:text-[1.75rem]'}`}>{project.title}</h3>
                {!project.lowResolution && <p className={`max-w-[42%] pt-1 text-right text-[9px] uppercase tracking-[.15em] ${dark ? 'text-white/60' : 'text-ink/60'}`}>{project.location}</p>}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={projects[active].title} className="fixed inset-0 z-[80] grid place-items-center bg-black/95 p-4 sm:p-8">
            <motion.div initial={{ scale: .985, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .99, opacity: 0 }} className={`relative h-[76vh] w-full ${projects[active].lowResolution ? 'max-w-[560px]' : 'max-w-6xl'}`}>
              <Image src={projects[active].src} alt={projects[active].title} fill quality={90} unoptimized={projects[active].lowResolution} sizes="100vw" className="object-contain" priority />
            </motion.div>
            <button type="button" onClick={() => setActive(null)} aria-label="Fechar imagem" className="absolute right-3 top-3 grid h-12 w-12 place-items-center border border-white/35 text-white sm:right-8 sm:top-8"><X className="h-5 w-5" /></button>
            <button type="button" onClick={() => setActive((active - 1 + projects.length) % projects.length)} aria-label="Projeto anterior" className="absolute bottom-4 left-3 grid h-12 w-12 place-items-center border border-white/35 text-white sm:bottom-1/2 sm:left-8"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => setActive((active + 1) % projects.length)} aria-label="Próximo projeto" className="absolute bottom-4 right-3 grid h-12 w-12 place-items-center border border-white/35 text-white sm:bottom-1/2 sm:right-8"><ChevronRight className="h-5 w-5" /></button>
            <div className="absolute bottom-4 left-1/2 max-w-[60%] -translate-x-1/2 text-center text-white sm:bottom-8">
              <p className="font-display text-xl sm:text-2xl">{projects[active].title}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[.16em] text-white/65">{projects[active].location} · {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
