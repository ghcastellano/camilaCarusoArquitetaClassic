'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '13%']);
  const copyOpacity = useTransform(scrollYProgress, [0, .82], [1, 0]);

  return (
    <section id="home" ref={root} className="noise relative mt-[72px] h-[calc(92svh-72px)] min-h-[500px] max-h-[800px] overflow-hidden bg-ink text-white lg:mt-[84px] lg:h-[calc(94svh-84px)] lg:min-h-[640px] lg:max-h-[920px]">
      <div className="absolute inset-0">
        <Image src="/assets/home/banner-homepage-1.jpg" alt="Suíte contemporânea projetada pelo escritório Camila Caruso" fill preload quality={90} sizes="100vw" className="object-cover object-[58%_center] sm:object-center" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,10,.88)_0%,rgba(10,11,10,.58)_42%,rgba(10,11,10,.08)_76%,rgba(10,11,10,.20)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      <div className="container-shell relative z-10 flex h-full items-end pb-8 pt-24 sm:pb-12 lg:items-center lg:pb-0 lg:pt-0">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="max-w-[760px] lg:-translate-y-2">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .15 }} className="eyebrow text-brass">Arquitetura & interiores</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .24, ease: [0.22,1,.36,1] }} className="mt-5 font-display text-[clamp(4rem,9vw,8.25rem)] leading-[.78] sm:mt-7">
            Camila<br /><span className="ml-[.38em] italic text-ivory">Caruso</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .9, delay: .7 }} className="mt-5 flex max-w-2xl flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <p className="max-w-md text-[13px] leading-6 text-white/78 sm:text-base sm:leading-7">Há 20 anos criando espaços que transformam vidas. Projetos residenciais, comerciais e especializados para saúde.</p>
            <Link href="#projetos" className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.16em]">Conhecer projetos <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-4 xl:flex">
        <span className="h-px w-12 bg-white/35" />
        <span className="vertical-label text-[9px] uppercase tracking-[.2em] text-white/55">Mogi das Cruzes · SP</span>
      </div>

      <Link href="#sobre" aria-label="Conhecer Camila Caruso" className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 lg:flex lg:right-10">
        <span className="text-[10px] uppercase tracking-[.18em] text-white/60">Conheça o escritório</span>
        <span className="grid h-10 w-10 place-items-center border border-white/30"><ArrowDown className="h-4 w-4" /></span>
      </Link>
    </section>
  );
}
