import Reveal from './ui/Reveal';

export default function ProcessTimeline({ steps, dark = false }: { steps: { title: string; text: string }[]; dark?: boolean }) {
  return (
    <div className={`border-t ${dark ? 'border-white/20' : 'border-ink/20'}`}>
      {steps.map((step, index) => (
        <Reveal key={step.title} delay={index * .05}>
          <div className={`grid gap-4 border-b py-7 sm:grid-cols-[90px_1fr_1fr] sm:gap-8 sm:py-9 ${dark ? 'border-white/20' : 'border-ink/20'}`}>
            <span className={`text-xs tabular-nums tracking-[.18em] ${dark ? 'text-brass' : 'text-brass-dark'}`}>0{index + 1}</span>
            <h3 className="font-display text-2xl leading-[1.05] sm:text-3xl">{step.title}</h3>
            <p className={`text-sm leading-7 ${dark ? 'text-white/60' : 'text-ink/60'}`}>{step.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
