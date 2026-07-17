import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import HomeHero from '@/components/HomeHero';
import ModelExperience from '@/components/ModelExperience';
import PortfolioShowcase, { type Project } from '@/components/PortfolioShowcase';
import ArchiveViewer from '@/components/ArchiveViewer';
import Reveal from '@/components/ui/Reveal';
import ParallaxImage from '@/components/ui/ParallaxImage';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import { contact, homeArchiveProjects, homeFeaturedProjects, homeStory } from '@/lib/content';

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'Architect', name: 'Camila Caruso Arquitetura e Interiores',
    url: 'https://camilacarusoarquiteta.com.br', email: contact.email,
    telephone: contact.primaryPhone, image: '/assets/profile/camila-portrait.jpeg',
    sameAs: [contact.instagram, contact.facebook], areaServed: 'São Paulo, Brasil',
  };

  return (
    <>
      <a href="#main" className="skip-link">Ir para o conteúdo</a>
      <Header variant="home" />
      <main id="main">
        <HomeHero />

        <section className="editorial-grid bg-ivory py-16 sm:py-20 lg:py-24">
          <div className="container-shell grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow text-brass-dark">Experiência Camila Caruso</p>
              <h2 className="mt-6 max-w-5xl font-display text-[clamp(2.8rem,5.6vw,5.8rem)] leading-[1.02]">Trazendo uma experiência para você, transformando o seu ambiente.</h2>
            </Reveal>
            <Reveal delay={.08} className="lg:col-span-3 lg:col-start-10 lg:pb-2">
              <p className="text-sm leading-7 text-ink/65">Projetos de Arquitetura Residenciais e Comerciais.</p>
            </Reveal>
          </div>
        </section>

        <section id="sobre" className="editorial-grid bg-paper py-20 sm:py-28 lg:py-32">
          <div className="container-shell grid gap-14 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center lg:gap-20 xl:grid-cols-[minmax(0,620px)_minmax(0,1fr)] xl:gap-28">
            <Reveal>
              <ParallaxImage
                src="/assets/profile/camila-portrait.jpeg"
                alt="Camila Caruso, arquiteta"
                sizes="(max-width: 480px) 85vw, (max-width: 1023px) 100vw, 620px"
                quality={88}
                className="mx-auto aspect-[4/5] w-full max-w-[620px]"
                imageClassName="object-cover object-top"
              />
            </Reveal>
            <div className="min-w-0">
              <Reveal><p className="eyebrow text-brass-dark">Sobre Camila Caruso</p></Reveal>
              <Reveal delay={.06}><h2 className="mt-7 font-display text-[clamp(3.4rem,5.6vw,6.2rem)] leading-[1.02]">Cada projeto importa.<br /><span className="italic text-sage">Cada cliente é único.</span></h2></Reveal>
              <Reveal delay={.1}><p className="mt-8 max-w-xl text-sm leading-8 text-ink/70">Estamos no mercado há 20 anos trabalhando com atendimento personalizado. Sabemos que, a cada novo projeto, estamos lidando com sonhos, expectativas e realizações. Por isso, cada cliente se torna nosso objetivo pessoal.</p></Reveal>
              <Reveal delay={.14}>
                <div className="mt-9 border-t border-ink/20 pt-7">
                  <p className="font-signature text-[2.25rem] leading-none sm:text-[2.65rem]">Camila Caruso</p>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[.18em] text-ink/60">CEO & Fundadora</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="container-shell mt-20 grid gap-10 border-t border-ink/20 pt-12 md:grid-cols-3 lg:mt-28 lg:gap-14 lg:pt-16">
            {homeStory.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * .05}>
                <div className="flex gap-5 md:block">
                  <span className="font-display text-3xl text-brass-dark">0{index + 1}</span>
                  <p className="mt-1 text-sm leading-8 text-ink/70 md:mt-6">{paragraph}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <ModelExperience />

        <section id="projetos" className="bg-ivory py-20 sm:py-28 lg:py-36">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8"><SectionHeading eyebrow="Projetos selecionados" title="Arquitetura para ser vivida." text="Uma seleção de projetos residenciais, interiores e espaços dedicados à saúde." /></div>
              <p className="text-sm leading-7 text-ink/65 lg:col-span-3 lg:col-start-10 lg:pb-2">Projetos autorais desenvolvidos com precisão técnica, atendimento personalizado e gestão integral.</p>
            </div>
            <div className="mt-14 lg:mt-20"><PortfolioShowcase projects={homeFeaturedProjects as Project[]} /></div>
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="grid lg:grid-cols-3">
            {[
              { href: '/residencial', src: '/assets/residential/casa-horizontes-04.jpg', number: '01', label: 'Alto padrão', title: 'Residencial', text: 'Lares autorais, atemporais e conectados à sua forma de viver.' },
              { href: '/#contato', src: '/assets/home/banner-homepage-2.jpg', number: '02', label: 'Arquitetura & gestão', title: 'Comercial e público', text: 'Espaços funcionais, humanos e coerentes com cada operação.' },
              { href: '/saude', src: '/assets/health/hero.jpg', number: '03', label: 'Especialização', title: 'Saúde', text: 'Clínicas humanizadas, eficientes e em conformidade com as normas.' },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group relative min-h-[54svh] overflow-hidden border-b border-white/15 sm:min-h-[58svh] lg:border-b-0 lg:border-r lg:last:border-r-0">
                <Image src={item.src} alt="" fill quality={90} sizes="(max-width:1024px) 100vw, 34vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/15" />
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9 xl:p-11">
                  <p className="text-[10px] uppercase tracking-[.18em] text-brass">{item.number} · {item.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-4"><h2 className="font-display text-5xl leading-[1.02] xl:text-6xl">{item.title}</h2><ArrowUpRight className="mb-1 h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#e4e8e5] py-20 sm:py-28 lg:py-36">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7"><SectionHeading eyebrow="Acervo do escritório" title="Duas décadas de projetos." text="Mantemos aqui o acervo visual apresentado no site original, respeitando a escala dos arquivos disponíveis." /></div>
              <p className="text-[10px] uppercase tracking-[.17em] text-ink/70 lg:col-span-3 lg:col-start-10 lg:pb-2">Arquivo · 01—12</p>
            </div>
            <div className="mt-14 lg:mt-20"><ArchiveViewer projects={homeArchiveProjects as Project[]} /></div>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28 lg:py-32">
          <div className="container-shell">
            <SectionHeading eyebrow="Interiores" title="Ambientes pensados por inteiro." text="Do fluxo à luz, da marcenaria ao encontro entre materiais: cada decisão sustenta beleza, conforto e permanência." />
            <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2">
              {[
                { src: '/assets/home/cozinha-compartilhada1.jpg', title: 'Cozinha integrada' },
                { src: '/assets/home/sala-de-estar-e-jantar.jpg', title: 'Sala de estar + sala de jantar' },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * .06}>
                  <div className="grid items-center gap-6 sm:grid-cols-[285px_1fr]">
                    <div className="relative mx-auto aspect-square w-full max-w-[285px] overflow-hidden bg-paper">
                      <Image src={item.src} alt={item.title} fill unoptimized sizes="285px" className="object-cover" />
                    </div>
                    <div className="border-t border-ink/20 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                      <p className="text-[10px] uppercase tracking-[.18em] text-brass-dark">0{index + 1} · Detalhe</p>
                      <h3 className="mt-3 font-display text-3xl leading-tight">{item.title}</h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="bg-petrol py-20 text-white sm:py-28 lg:py-32">
          <div className="container-shell grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5"><SectionHeading dark eyebrow="Entre em contato" title="Solicite um orçamento." text="Entre em contato conosco e conte o que deseja transformar. Nossa equipe retornará em até 24 horas." /></div>
            <div className="lg:col-span-6 lg:col-start-7"><ContactForm dark /></div>
          </div>
        </section>

        <section aria-label="Localização do escritório" className="h-[360px] bg-paper sm:h-[440px]">
          <iframe
            title="Localização do escritório Camila Caruso"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14634.525092380698!2d-46.1933144!3d-23.5097871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7b3c990295d2d442!2sARQUITETA%20CAMILA%20CARUSO!5e0!3m2!1spt-BR!2sbr!4v1638366971970!5m2!1spt-BR!2sbr"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale-[.15]"
            allowFullScreen
          />
        </section>
      </main>
      <Footer variant="home" />
      <WhatsAppFab />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
