'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowUpRight, Mail, Menu, Phone, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contact, messages, whatsappUrl } from '@/lib/content';

export type HeaderVariant = 'home' | 'residential' | 'health';

const links = [
  { label: 'Home', href: '/#home', section: 'home' },
  { label: 'Camila Caruso', href: '/#sobre', section: 'sobre' },
  { label: 'Projetos', href: '/#projetos', section: 'projetos' },
  { label: 'Orçamento', href: '/#contato', section: 'contato' },
  { label: 'Residencial', href: '/residencial', route: '/residencial' },
  { label: 'Saúde', href: '/saude', route: '/saude' },
];

export default function Header({ variant = 'home' }: { variant?: HeaderVariant }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const message = messages[variant === 'home' ? 'general' : variant];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (pathname !== '/') return;
    const nodes = links
      .filter((link) => link.section)
      .map((link) => document.getElementById(link.section!))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, .08, .25] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  function isActive(link: (typeof links)[number]) {
    if (link.route) return pathname === link.route;
    return pathname === '/' && link.section === activeSection;
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white text-ink">
        <div className="container-shell flex h-[72px] items-center justify-between lg:h-[84px]">
          <Link href="/" aria-label="Camila Caruso — página inicial" className="relative z-10 shrink-0">
            <Image
              src="/assets/brand/logo-specialty-transparent.png"
              alt=""
              width={248}
              height={52}
              sizes="(max-width: 639px) 204px, (max-width: 1023px) 228px, 248px"
              className="h-auto w-[204px] object-contain sm:w-[228px] lg:w-[248px]"
              priority
            />
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-[.11em] xl:flex 2xl:gap-7 2xl:text-[13px]">
            {links.map((link) => {
              const active = isActive(link);
              return (
                <Link key={link.href} href={link.href} aria-current={active ? (link.route ? 'page' : 'location') : undefined} className="group relative py-3">
                  {link.label}
                  <span className={`absolute bottom-1 left-0 h-px bg-brass transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
            <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex min-h-11 items-center gap-3 border border-ink bg-ink px-5 py-3 text-[10px] text-white transition-colors hover:border-brass hover:bg-brass hover:text-ink 2xl:text-[11px]">
              Fale conosco <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
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
        <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brass" style={{ scaleX: scrollYProgress }} />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: .25 }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-[45] overflow-y-auto bg-white pb-[max(20px,env(safe-area-inset-bottom))] pt-3"
          >
            <div className="container-shell flex min-h-full flex-col gap-5">
              <nav aria-label="Menu móvel" className="border-t border-ink/15">
                {links.map((link, index) => {
                  const active = isActive(link);
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .035 * index }}>
                      <Link
                        href={link.href}
                        aria-current={active ? (link.route ? 'page' : 'location') : undefined}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-12 items-center justify-between border-b border-ink/15 py-3 font-display text-[clamp(1.75rem,7.6vw,2.55rem)] leading-none ${active ? 'text-brass-dark' : 'text-ink'}`}
                      >
                        {link.label}<span className="font-sans text-[10px] tabular-nums text-ink/55">0{index + 1}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="mt-auto">
                <div role="group" aria-label="Contato rápido" className="border-y border-ink/15 py-3">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[.17em] text-brass-dark">Contato rápido</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-ink/70">
                    <a href={`tel:${contact.primaryPhoneDigits}`} className="inline-flex min-h-8 items-center gap-2"><Phone className="h-3.5 w-3.5 text-brass-dark" />{contact.primaryPhone.replace('+55 11 ', '(11) ')}</a>
                    <a href={`mailto:${contact.email}`} className="inline-flex min-h-8 items-center gap-2"><Mail className="h-3.5 w-3.5 text-brass-dark" />E-mail</a>
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-2">Instagram<ArrowUpRight className="h-3.5 w-3.5 text-brass-dark" /></a>
                    <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-2">Facebook<ArrowUpRight className="h-3.5 w-3.5 text-brass-dark" /></a>
                  </div>
                </div>
                <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-12 items-center justify-between bg-ink px-5 py-4 text-xs font-semibold uppercase tracking-[.16em] text-white">
                  {variant === 'health' ? 'Analisar minha clínica' : variant === 'residential' ? 'Iniciar meu projeto' : 'Fale conosco'} <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
