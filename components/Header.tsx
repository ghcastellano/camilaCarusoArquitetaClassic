'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { messages, whatsappUrl } from '@/lib/content';

export type HeaderVariant = 'home' | 'residential' | 'health';

const homeLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Camila Caruso', href: '/#sobre' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Orçamento', href: '/#contato' },
  { label: 'Residencial', href: '/residencial' },
  { label: 'Saúde', href: '/saude' },
];

const residentialLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Processo', href: '#processo' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

const healthLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Processo', href: '#processo' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export default function Header({ variant = 'home' }: { variant?: HeaderVariant }) {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('home');
  const specialty = variant !== 'home';
  const links = useMemo(
    () => variant === 'residential' ? residentialLinks : variant === 'health' ? healthLinks : homeLinks,
    [variant],
  );
  const message = messages[variant === 'home' ? 'general' : variant];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!specialty) return;
    const ids = links.map((link) => link.href.slice(1));
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveHash(visible.target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, .1, .35] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [links, specialty]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/95 text-ink backdrop-blur-xl">
        <div className={`container-shell flex items-center justify-between ${specialty ? 'h-[76px] lg:h-[88px]' : 'h-[76px] lg:h-[92px]'}`}>
          <Link href="/" aria-label="Camila Caruso — página inicial" className="relative z-10 shrink-0">
            {specialty ? (
              <Image
                src="/assets/brand/logo-specialty-original.png"
                alt=""
                width={1312}
                height={276}
                className="h-auto w-[205px] object-contain sm:w-[235px] lg:w-[258px]"
                priority
              />
            ) : (
              <Image
                src="/assets/brand/logo-home-original.png"
                alt=""
                width={150}
                height={90}
                className="h-[56px] w-auto object-contain lg:h-[62px]"
                priority
              />
            )}
          </Link>

          <nav aria-label={specialty ? 'Navegação desta página' : 'Navegação principal'} className={`hidden items-center text-[10px] font-semibold uppercase tracking-[.13em] xl:flex ${specialty ? 'gap-5 2xl:gap-7' : 'gap-6'}`}>
            {links.map((link) => {
              const localId = link.href.startsWith('#') ? link.href.slice(1) : '';
              const active = specialty && localId === activeHash;
              return (
                <Link key={link.href} href={link.href} aria-current={active ? 'location' : undefined} className="group relative py-3">
                  {link.label}
                  <span className={`absolute bottom-1 left-0 h-px bg-brass transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
            {!specialty && (
              <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center gap-3 border border-ink bg-ink px-5 py-3 text-white transition-colors hover:border-brass hover:bg-brass hover:text-ink">
                Fale conosco <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </nav>

          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="relative z-10 grid h-11 w-11 place-items-center border border-ink/25 text-ink xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-[76px] z-[45] overflow-y-auto bg-paper pb-[max(20px,env(safe-area-inset-bottom))] pt-3"
          >
            <div className="container-shell flex min-h-full flex-col justify-between gap-7">
              <nav aria-label="Menu móvel" className="border-t border-ink/15">
                {links.map((link, index) => {
                  const localId = link.href.startsWith('#') ? link.href.slice(1) : '';
                  const active = specialty && localId === activeHash;
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .035 * index }}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'location' : undefined}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-12 items-center justify-between border-b border-ink/15 py-3 font-display leading-none ${specialty ? 'text-[clamp(1.55rem,7vw,2.25rem)]' : 'text-[clamp(1.8rem,8vw,2.7rem)]'} ${active ? 'text-brass' : 'text-ink'}`}
                      >
                        {link.label}<span className="font-sans text-[10px] tabular-nums text-ink/55">0{index + 1}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between bg-ink px-5 py-4 text-xs font-semibold uppercase tracking-[.16em] text-white">
                {variant === 'health' ? 'Analisar minha clínica' : variant === 'residential' ? 'Iniciar meu projeto' : 'Fale conosco'} <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
