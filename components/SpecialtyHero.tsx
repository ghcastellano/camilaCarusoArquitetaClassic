'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '@/lib/content';

export default function SpecialtyHero({ variant, image, eyebrow, title, subtitle, message }: { variant: 'residential' | 'health'; image: string; eyebrow: string; title: string; subtitle: string; message: string }) {
  const health = variant === 'health';
  return (
    <section id="home" className={`noise relative mt-[72px] min-h-[620px] overflow-hidden text-white lg:mt-[84px] lg:h-[calc(94svh-84px)] lg:min-h-[640px] lg:max-h-[920px] ${health ? 'bg-petrol' : 'bg-ink'}`}>
      <Image src={image} alt="" fill preload quality={90} sizes="100vw" className={`object-cover ${health ? 'object-[64%_center] sm:object-center' : 'object-[60%_center] sm:object-center'}`} />
      <div className={`absolute inset-0 ${health ? 'bg-[linear-gradient(90deg,rgba(17,47,53,.97)_0%,rgba(17,47,53,.78)_48%,rgba(17,47,53,.26)_100%)]' : 'bg-[linear-gradient(90deg,rgba(12,12,11,.95)_0%,rgba(12,12,11,.72)_50%,rgba(12,12,11,.22)_100%)]'}`} />
      <div className="absolute inset-0 editorial-grid opacity-[.18] mix-blend-screen" />
      <div className="container-shell relative z-10 flex min-h-[620px] items-end py-10 sm:py-14 lg:h-full lg:min-h-0 lg:items-center lg:py-0">
        <div className="max-w-[1040px]">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .15 }} className="eyebrow text-brass">{eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .23, ease: [0.22,1,.36,1] }} className="mt-5 max-w-5xl font-display text-[clamp(2.55rem,6vw,6.15rem)] leading-[.91] sm:mt-7">{title}</motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .9, delay: .66 }} className="mt-8 flex max-w-4xl flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-white/76 sm:text-base">{subtitle}</p>
            <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 w-fit shrink-0 items-center gap-3 border border-white/40 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.16em] transition-colors hover:border-brass hover:bg-brass hover:text-ink">
              {health ? 'Solicitar análise de viabilidade' : 'Iniciar meu projeto'} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>
      </div>
      <a href="#diferenciais" className="absolute bottom-8 right-7 z-10 hidden items-center gap-3 text-white/60 lg:flex"><span className="text-[10px] uppercase tracking-[.16em]">Explorar</span><span className="grid h-10 w-10 place-items-center border border-white/25"><ArrowDown className="h-4 w-4" /></span></a>
    </section>
  );
}
