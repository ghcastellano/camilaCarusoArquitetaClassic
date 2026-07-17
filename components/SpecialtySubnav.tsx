'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const residentialLinks = [
  { label: 'Início', href: '#home', id: 'home' },
  { label: 'Diferenciais', href: '#diferenciais', id: 'diferenciais' },
  { label: 'Processo', href: '#processo', id: 'processo' },
  { label: 'Portfólio', href: '#portfolio', id: 'portfolio' },
  { label: 'Depoimentos', href: '#depoimentos', id: 'depoimentos' },
  { label: 'Sobre', href: '#sobre', id: 'sobre' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
  { label: 'Contato', href: '#contato', id: 'contato' },
];

const healthLinks = [
  { label: 'Início', href: '#home', id: 'home' },
  { label: 'Diferenciais', href: '#diferenciais', id: 'diferenciais' },
  { label: 'Processo', href: '#processo', id: 'processo' },
  { label: 'Portfólio', href: '#portfolio', id: 'portfolio' },
  { label: 'Sobre', href: '#sobre', id: 'sobre' },
  { label: 'Contato', href: '#contato', id: 'contato' },
];

export default function SpecialtySubnav({ variant }: { variant: 'residential' | 'health' }) {
  const [active, setActive] = useState('diferenciais');
  const links = variant === 'residential' ? residentialLinks : healthLinks;

  useEffect(() => {
    const nodes = links.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -68% 0px', threshold: [0, .08, .25] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [links]);

  return (
    <div className="sticky top-[72px] z-30 border-y border-ink/10 bg-white lg:top-[84px]">
      <div className="scrollbar-none container-shell flex h-[54px] items-center gap-7 overflow-x-auto lg:h-[60px]">
        <p className="sticky left-0 z-10 shrink-0 border-r border-ink/15 bg-white pr-7 text-[11px] font-semibold uppercase tracking-[.14em] text-brass-dark lg:text-[12px]">
          {variant === 'health' ? 'Arquitetura para saúde' : 'Arquitetura residencial'}
        </p>
        <nav aria-label={`Seções de ${variant === 'health' ? 'Saúde' : 'Residencial'}`} className="flex shrink-0 items-center gap-6 pr-4 text-[11px] font-semibold uppercase tracking-[.11em] text-ink/65 lg:gap-8 lg:text-[12px] xl:text-[13px]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={active === link.id ? 'location' : undefined} className={`relative flex h-[54px] items-center whitespace-nowrap transition-colors lg:h-[60px] ${active === link.id ? 'text-ink' : 'hover:text-ink'}`}>
              {link.label}
              <span className={`absolute inset-x-0 bottom-0 h-px bg-brass transition-transform ${active === link.id ? 'scale-x-100' : 'scale-x-0'}`} />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
