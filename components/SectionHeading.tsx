import Reveal from './ui/Reveal';

export default function SectionHeading({ eyebrow, title, text, dark = false, align = 'left' }: { eyebrow: string; title: string; text?: string; dark?: boolean; align?: 'left' | 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-5xl'}>
      <Reveal><p className={`eyebrow ${dark ? 'text-brass' : 'text-brass'} ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p></Reveal>
      <Reveal delay={.06}><h2 className={`mt-6 display-title text-[clamp(2.85rem,6vw,6rem)] ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2></Reveal>
      {text && <Reveal delay={.12}><p className={`mt-6 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8 ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-white/65' : 'text-ink/65'}`}>{text}</p></Reveal>}
    </div>
  );
}
