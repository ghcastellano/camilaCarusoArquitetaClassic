'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const HeroCanvas = dynamic(() => import('./three/HeroCanvas'), { ssr: false });

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const [desktop3D, setDesktop3D] = useState(false);
  const [interactive3D, setInteractive3D] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const copyOpacity = useTransform(scrollYProgress, [0, .82], [1, 0]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 769px)');
    const sync = () => setDesktop3D(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!interactive3D) return;
    const timeout = window.setTimeout(() => setCanvasVisible(true), 900);
    return () => window.clearTimeout(timeout);
  }, [interactive3D]);

  return (
    <section id="home" ref={root} onPointerMove={() => { if (desktop3D && !interactive3D) setInteractive3D(true); }} className="noise relative mt-[76px] h-[calc(100svh-76px)] min-h-[500px] max-h-[920px] overflow-hidden bg-ink text-white lg:mt-[92px] lg:h-[calc(100svh-92px)] lg:min-h-[650px]">
      <Image src="/assets/home/banner-homepage-1.jpg" alt="Suíte contemporânea projetada pelo escritório Camila Caruso" fill priority quality={90} sizes="100vw" className="object-cover object-[58%_center] sm:object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,10,.90)_0%,rgba(10,11,10,.67)_42%,rgba(10,11,10,.20)_74%,rgba(10,11,10,.36)_100%)]" />

      <div className="absolute right-[-11%] top-[7%] h-[43%] w-[72%] opacity-90 sm:right-[-3%] sm:top-[10%] sm:h-[48%] sm:w-[58%] md:right-[1.5%] md:top-[16%] md:h-[62%] md:w-[48%] lg:right-[2.5%] lg:top-[14%] lg:h-[67%] lg:w-[42%] xl:w-[40%]">
        <Image src="/assets/home/architectural-model.webp" alt="" fill sizes="(max-width: 767px) 72vw, 42vw" className={`model-static object-contain transition-opacity duration-700 ${canvasVisible ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`absolute inset-0 transition-opacity duration-700 ${canvasVisible ? 'opacity-100' : 'opacity-0'}`}>
          {desktop3D && interactive3D && <HeroCanvas />}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />

      <div className="container-shell relative z-10 flex h-full items-end pb-7 pt-24 sm:pb-12 lg:items-center lg:pb-0 lg:pt-0">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="max-w-[760px] lg:-translate-y-2">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .15 }} className="eyebrow text-brass">Arquitetura & interiores</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .24, ease: [0.22,1,.36,1] }} className="mt-5 font-display text-[clamp(4rem,9vw,8.25rem)] leading-[.78] sm:mt-7">
            Camila<br /><span className="ml-[.38em] italic text-ivory">Caruso</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .9, delay: .7 }} className="mt-5 flex max-w-2xl flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <p className="max-w-md text-[13px] leading-6 text-white/75 sm:text-base sm:leading-7">Há 20 anos criando espaços que transformam vidas. Projetos residenciais, comerciais e especializados para saúde.</p>
            <Link href="#projetos" className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.16em]">Conhecer projetos <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
          </motion.div>
        </motion.div>
      </div>

      <Link href="#projetos" aria-label="Ir para os projetos" className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 lg:flex lg:right-10">
        <span className="text-[10px] uppercase tracking-[.18em] text-white/55">Deslize para descobrir</span>
        <span className="grid h-10 w-10 place-items-center border border-white/25"><ArrowDown className="h-4 w-4" /></span>
      </Link>
    </section>
  );
}
