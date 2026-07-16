import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { contact, messages, whatsappUrl } from '@/lib/content';
import type { HeaderVariant } from './Header';

const homeFooterLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Camila Caruso', href: '/#sobre' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Orçamento', href: '/#contato' },
  { label: 'Residencial', href: '/residencial' },
  { label: 'Saúde', href: '/saude' },
];

const residentialFooterLinks = [
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Processo', href: '#processo' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

const healthFooterLinks = [
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Processo', href: '#processo' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export default function Footer({ variant = 'home' }: { variant?: HeaderVariant }) {
  const specialty = variant !== 'home';
  const message = messages[variant === 'home' ? 'general' : variant];
  const links = variant === 'residential' ? residentialFooterLinks : variant === 'health' ? healthFooterLinks : homeFooterLinks;

  return (
    <footer className="bg-petrol text-white">
      <div className="container-shell py-16 lg:py-24">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:pb-20">
          <div>
            <p className="eyebrow text-brass">Agende uma reunião conosco</p>
            <h2 className="mt-7 max-w-4xl font-display text-[clamp(3.1rem,6vw,6.2rem)] leading-[.88]">
              Seu próximo espaço começa com uma boa conversa.
            </h2>
          </div>
          <div className="lg:flex lg:justify-end">
            <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 w-full items-center justify-between border border-white/30 p-5 text-xs font-semibold uppercase tracking-[.16em] transition-colors hover:border-brass hover:bg-brass hover:text-ink lg:max-w-sm">
              {variant === 'health' ? 'Solicitar análise' : 'Agendar conversa'} <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_.75fr_1fr_1fr]">
          <div>
            <Image
              src={specialty ? '/assets/brand/logo-specialty-footer-cropped.png' : '/assets/brand/logo-home-footer.png'}
              alt="Camila Caruso Arquitetura e Interiores"
              width={specialty ? 1563 : 220}
              height={specialty ? 278 : 50}
              className={specialty ? 'h-auto w-[250px] max-w-full' : 'h-auto w-[220px] max-w-full'}
            />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">Desenvolvemos projetos integrando ambientes, vivência e experiência humana. Ambientes humanizados, com atendimento personalizado e gestão integral.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[.2em] text-brass">Navegação</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
              {links.map((link) => <Link key={link.href} href={link.href} className="w-fit border-b border-transparent pb-1 transition-colors hover:border-brass hover:text-white">{link.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[.2em] text-brass">Contato</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
              <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">WhatsApp: {contact.primaryPhone}</a>
              <a href={`tel:${contact.officePhoneDigits}`}>Escritório: {contact.officePhone}</a>
              <a href={`mailto:${contact.email}`} className="break-all">{contact.email}</a>
              <a href="https://www.camilacarusoarquiteta.com.br" target="_blank" rel="noopener noreferrer">www.camilacarusoarquiteta.com.br</a>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[.2em] text-brass">Social e localização</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              <span>{contact.address}</span>
              <a href={`mailto:${contact.email}?subject=Assinar%20newsletter`} className="mt-2 w-fit border-b border-white/30 pb-1">Newsletter · assine e fique por dentro</a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[.15em] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Camila Caruso Arquitetura e Interiores</p>
          <p>Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}
