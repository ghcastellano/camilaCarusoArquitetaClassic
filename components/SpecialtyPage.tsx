import Image from 'next/image';
import { ArrowUpRight, Check, Star } from 'lucide-react';
import Header from './Header';
import SpecialtyHero from './SpecialtyHero';
import SpecialtySubnav from './SpecialtySubnav';
import SectionHeading from './SectionHeading';
import Reveal from './ui/Reveal';
import ParallaxImage from './ui/ParallaxImage';
import ProcessTimeline from './ProcessTimeline';
import PortfolioGallery, { type Project } from './PortfolioGallery';
import Accordion from './Accordion';
import ContactForm from './ContactForm';
import Footer from './Footer';
import WhatsAppFab from './WhatsAppFab';
import { health, messages, residential, whatsappUrl } from '@/lib/content';

type ResidentialData = typeof residential;
type HealthData = typeof health;

export default function SpecialtyPage({ variant }: { variant: 'residential' | 'health' }) {
  const isHealth = variant === 'health';
  const data = isHealth ? health : residential;
  const message = messages[variant];
  const projects = data.projects as Project[];

  return (
    <>
      <a href="#main" className="skip-link">Ir para o conteúdo</a>
      <Header variant={variant} />
      <main id="main">
        <SpecialtyHero
          variant={variant}
          image={isHealth ? '/assets/health/hero.jpg' : '/assets/residential/casa-horizontes-04.jpg'}
          eyebrow={data.hero.eyebrow}
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          message={message}
        />
        <SpecialtySubnav variant={variant} />

        <section id="diferenciais" className={`specialty-anchor editorial-grid py-24 sm:py-32 lg:py-40 ${isHealth ? 'bg-paper' : 'bg-ivory'}`}>
          <div className="container-shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7"><SectionHeading eyebrow="Diferenciais" title={data.intro.title} /></div>
              <Reveal delay={.14} className="lg:col-span-4 lg:col-start-9"><p className="text-sm leading-8 text-ink/65">{data.intro.text}</p></Reveal>
            </div>
            <div className={`mt-16 grid border-t border-ink/20 md:grid-cols-2 ${data.differentiators.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} lg:mt-24`}>
              {data.differentiators.map((item, index) => (
                <Reveal key={item.title} delay={index * .07} className="h-full">
                  <article className="flex h-full min-h-[280px] flex-col justify-between border-b border-ink/20 p-6 md:border-r lg:p-8">
                    <span className="font-display text-3xl text-brass-dark">0{index + 1}</span>
                    <div><h3 className="font-display text-3xl leading-none">{item.title}</h3><p className="mt-5 text-sm leading-7 text-ink/60">{item.text}</p></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={`${isHealth ? 'bg-petrol text-white' : 'bg-ink text-white'}`}>
          <div className="grid min-h-[78svh] min-w-0 lg:grid-cols-2">
            <ParallaxImage
              src={isHealth ? '/assets/health/detail.jpg' : '/assets/residential/apto-passeo-escritorio.jpg'}
              alt={isHealth ? 'Detalhe de clínica projetada por Camila Caruso' : 'Detalhe de arquitetura residencial'}
              sizes="(max-width:1024px) 100vw, 50vw"
              className="min-h-[58svh] lg:min-h-full"
              imageClassName="object-cover"
            />
            <div className="flex min-w-0 items-center p-7 sm:p-12 lg:p-16 xl:p-24">
              <div className="min-w-0 max-w-full">
                <p className="eyebrow text-brass">Visão</p>
                <h2 className="mt-7 max-w-full break-words font-display text-[clamp(2.85rem,5.5vw,6rem)] leading-[.92]">{data.manifesto.title}</h2>
                {isHealth ? (
                  <>
                    <p className="mt-7 text-sm leading-8 text-white/65">{(data as HealthData).manifesto.text}</p>
                    <div className="mt-7 space-y-4">
                      {(data as HealthData).manifesto.points.map((point) => <div key={point} className="flex gap-3 border-b border-white/15 pb-4 text-sm text-white/75"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" />{point}</div>)}
                    </div>
                    <p className="mt-7 font-display text-2xl italic text-brass">{(data as HealthData).manifesto.closing}</p>
                  </>
                ) : (
                  <div className="mt-7 space-y-5">{(data as ResidentialData).manifesto.paragraphs.map((paragraph) => <p key={paragraph} className="text-sm leading-8 text-white/65">{paragraph}</p>)}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="processo" className="specialty-anchor bg-[#dfe4e1] py-24 text-ink sm:py-32 lg:py-40">
          <div className="container-shell">
            <SectionHeading eyebrow="Processo" title={isHealth ? 'Da análise regulatória à clínica pronta.' : 'Da ideia à realidade, com maestria.'} text={isHealth ? 'Nosso método garante segurança técnica e excelência no design.' : 'Nosso processo é estruturado, transparente e focado em sua satisfação.'} />
            <div className="mt-16 lg:mt-24"><ProcessTimeline steps={data.process} /></div>
            <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="group mt-10 inline-flex items-center gap-4 border-b border-brass-dark pb-2 text-xs font-semibold uppercase tracking-[.16em] text-brass-dark">{isHealth ? 'Quero minha clínica 100% aprovada' : 'Entender nossa metodologia'}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
          </div>
        </section>

        <section id="portfolio" className="specialty-anchor bg-paper py-24 sm:py-32 lg:py-40">
          <div className="container-shell">
            <SectionHeading eyebrow="Portfólio" title={isHealth ? 'Clínicas que geram confiança e bem-estar.' : 'Espaços que transformam vidas.'} text={isHealth ? 'Conheça os ambientes que projetamos para líderes da saúde.' : 'Veja alguns dos sonhos que tivemos a honra de realizar.'} />
            <div className="mt-16 lg:mt-24"><PortfolioGallery projects={projects} /></div>
          </div>
        </section>

        {!isHealth && (
          <section id="depoimentos" className="specialty-anchor bg-ivory py-24 sm:py-32 lg:py-40">
            <div className="container-shell">
              <SectionHeading eyebrow="Depoimentos" title="Histórias de clientes satisfeitos." text="Veja o impacto que a arquitetura personalizada tem na vida das pessoas." />
              <div tabIndex={0} aria-label="Depoimentos de clientes; deslize para ver mais" className="scrollbar-none mt-14 grid snap-x snap-mandatory grid-flow-col auto-cols-[88%] gap-4 overflow-x-auto pb-4 sm:auto-cols-[48%] lg:mt-20 lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible lg:pb-0">
                {(data as ResidentialData).testimonials.map((item, index) => (
                  <Reveal key={item.name} delay={index * .05} className="h-full snap-start">
                    <figure className="flex h-full min-h-[410px] flex-col border border-ink/12 border-l-2 border-l-brass bg-paper p-6 sm:p-7">
                      <figcaption className="flex min-h-[58px] items-center gap-4">
                        <Image src={item.avatar} alt="" width={56} height={56} unoptimized className="h-14 w-14 shrink-0 rounded-full border border-brass/60 object-cover" />
                        <div><p className="text-xs font-semibold leading-5">{item.name}</p><p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[.15em] text-brass-dark">{item.type}</p></div>
                      </figcaption>
                      <div role="img" className="mt-7 flex gap-1 text-[#d8a13f]" aria-label="5 de 5 estrelas">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="h-4 w-4 fill-current" aria-hidden="true" />)}</div>
                      <blockquote className="mt-6 text-sm italic leading-8 text-ink/64">“{item.text}”</blockquote>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="sobre" className="specialty-anchor editorial-grid bg-[#e7e9e5] py-24 text-ink sm:py-32 lg:py-36">
          <div className="container-shell grid gap-14 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center lg:gap-20 xl:grid-cols-[minmax(0,620px)_minmax(0,1fr)] xl:gap-28">
            <Reveal>
              <ParallaxImage
                src="/assets/profile/camila-portrait.jpeg"
                alt="Camila Caruso, arquiteta"
                sizes="(max-width:1023px) 100vw, 620px"
                className="mx-auto aspect-[4/5] w-full max-w-[620px]"
                imageClassName="object-cover object-top"
              />
            </Reveal>
            <div className="min-w-0">
              <SectionHeading eyebrow="Camila Caruso" title={data.about.title} />
              {isHealth && <Reveal delay={.12}><blockquote className="mt-8 border-l border-brass pl-6 font-display text-2xl italic leading-snug text-petrol sm:text-3xl">“{(data as HealthData).about.quote}”</blockquote></Reveal>}
              <div className="mt-8 space-y-5">{data.about.paragraphs.map((paragraph, index) => <Reveal key={paragraph} delay={.12 + index * .05}><p className="text-sm leading-8 text-ink/65">{paragraph}</p></Reveal>)}</div>
            </div>
          </div>
        </section>

        {!isHealth && (
          <section id="faq" className="specialty-anchor bg-paper py-24 sm:py-32 lg:py-40">
            <div className="container-shell grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Perguntas frequentes." text="Dúvidas comuns sobre nosso processo, investimento e projetos." /></div>
              <div className="lg:col-span-7 lg:col-start-6"><Accordion items={(data as ResidentialData).faqs} /></div>
            </div>
          </section>
        )}

        <section id="contato" className={`specialty-anchor ${isHealth ? 'bg-[#132f35]' : 'bg-ink'} py-24 text-white sm:py-32 lg:py-40`}>
          <div className="container-shell grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5"><SectionHeading dark eyebrow="Próximo passo" title={isHealth ? 'Sua clínica está pronta para o próximo nível?' : 'Vamos dar vida ao lar que você merece?'} text={isHealth ? 'Não deixe que um espaço inadequado limite seu potencial. Agende uma consulta e descubra o impacto de um projeto arquitetônico especializado.' : 'Agende uma conversa com Camila Caruso e dê o primeiro passo para transformar seu espaço.'} /></div>
            <div className="lg:col-span-6 lg:col-start-7"><ContactForm variant={variant} dark /></div>
          </div>
        </section>
      </main>
      <Footer variant={variant} />
      <WhatsAppFab message={message} />
    </>
  );
}
