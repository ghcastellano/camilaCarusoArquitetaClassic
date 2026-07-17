'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Reveal from './ui/Reveal';

const ArchitecturalCanvas = dynamic(() => import('./three/HeroCanvas'), { ssr: false });

const stages = [
  { number: '01', title: 'Imersão', text: 'Escuta, repertório e leitura precisa da rotina.' },
  { number: '02', title: 'Projeto', text: 'Forma, matéria e técnica resolvidas em conjunto.' },
  { number: '03', title: 'Gestão integral', text: 'Acompanhamento próximo até a entrega final.' },
];

export default function ModelExperience() {
  const root = useRef<HTMLElement>(null);
  const model = useRef<HTMLDivElement>(null);
  const nearViewport = useInView(model, { once: true, margin: '320px 0px' });
  const reducedMotion = useReducedMotion();
  const [desktopWebGL, setDesktopWebGL] = useState(false);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start end', 'end start'] });
  const modelY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    const update = () => setDesktopWebGL(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <section ref={root} aria-labelledby="model-experience-title" className="noise relative overflow-hidden bg-ink py-20 text-white sm:py-28 lg:min-h-[780px] lg:py-0">
      <div className="pointer-events-none absolute inset-0 editorial-grid opacity-[.09] mix-blend-screen" />
      <div className="container-shell relative grid min-h-full gap-12 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="relative z-10 lg:col-span-5 xl:col-span-4">
          <Reveal>
            <p className="eyebrow text-brass">Do conceito à obra</p>
            <h2 id="model-experience-title" className="mt-7 max-w-xl font-display text-[clamp(3.3rem,5.6vw,6.2rem)] leading-none">
              Ideias ganham forma <span className="italic text-[#b7ad9c]">antes da matéria.</span>
            </h2>
          </Reveal>
          <Reveal delay={.08}>
            <p className="mt-8 max-w-lg text-sm leading-8 text-white/65">
              Cada escolha é antecipada, testada e coordenada para que a obra traduza o projeto com fidelidade, controle e tranquilidade.
            </p>
          </Reveal>
        </div>

        <motion.div
          ref={model}
          style={reducedMotion ? undefined : { y: modelY }}
          className="relative h-[360px] sm:h-[500px] lg:absolute lg:inset-y-0 lg:left-[39%] lg:right-0 lg:h-auto"
        >
          <Image
            src="/assets/home/architectural-model.webp"
            alt="Maquete arquitetônica tridimensional de uma residência contemporânea"
            fill
            quality={90}
            sizes="(max-width: 899px) 100vw, 65vw"
            className={`model-static object-contain p-3 transition-opacity duration-700 lg:p-8 ${nearViewport && desktopWebGL ? 'lg:opacity-0' : 'opacity-100'}`}
          />
          {nearViewport && desktopWebGL && <ArchitecturalCanvas />}
          <div className="pointer-events-none absolute inset-x-[9%] bottom-[8%] h-px bg-gradient-to-r from-transparent via-brass/45 to-transparent" />
        </motion.div>

        <div className="relative z-10 grid border-t border-white/20 sm:grid-cols-3 lg:col-span-12 lg:mt-[500px] xl:col-span-7 xl:col-start-1">
          {stages.map((stage, index) => (
            <Reveal key={stage.title} delay={index * .06} className="h-full">
              <article className="group flex h-full min-h-[150px] gap-5 border-b border-white/15 py-6 sm:block sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                <span className="font-display text-2xl text-brass">{stage.number}</span>
                <div className="flex-1 sm:mt-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl">{stage.title}</h3>
                    <ArrowDownRight className="h-4 w-4 text-white/35 transition-colors group-hover:text-brass" />
                  </div>
                  <p className="mt-3 text-xs leading-6 text-white/55">{stage.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
