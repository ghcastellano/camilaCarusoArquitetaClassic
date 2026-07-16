'use client';

import { Check, ArrowUpRight } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { messages, whatsappUrl } from '@/lib/content';

type Variant = 'general' | 'residential' | 'health';

export default function ContactForm({ variant = 'general', dark = false }: { variant?: Variant; dark?: boolean }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', message: '' });
  const baseMessage = messages[variant];
  const finalMessage = useMemo(() => `${baseMessage}\n\nNome: ${form.name}\nWhatsApp: ${form.phone}\nE-mail: ${form.email}${form.type ? `\nTipo / Especialidade: ${form.type}` : ''}${form.message ? `\n\n${form.message}` : ''}`, [baseMessage, form]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const anchor = document.createElement('a');
    anchor.href = whatsappUrl(finalMessage);
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
    setSent(true);
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits ? `(${digits}` : '';
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  const field = `min-w-0 w-full border-b bg-transparent py-4 text-base outline-none transition-colors sm:text-sm ${dark ? 'border-white/25 text-white placeholder:text-white/35 focus:border-brass' : 'border-ink/25 text-ink placeholder:text-ink/35 focus:border-brass'}`;

  if (sent) {
    return (
      <div role="status" className={`flex min-h-[360px] flex-col items-center justify-center border p-7 text-center sm:min-h-[390px] sm:p-8 ${dark ? 'border-white/20' : 'border-ink/20'}`}>
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brass text-ink"><Check className="h-7 w-7" /></span>
        <h3 className="mt-6 font-display text-4xl">Tudo certo, {form.name.split(' ')[0]}.</h3>
        <p className={`mt-3 max-w-sm text-sm leading-7 ${dark ? 'text-white/60' : 'text-ink/60'}`}>Abrimos uma conversa no WhatsApp com seus dados preenchidos. Basta confirmar o envio.</p>
        <a href={whatsappUrl(finalMessage)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 bg-brass px-6 py-4 text-xs font-semibold uppercase tracking-[.15em] text-ink">Abrir conversa <ArrowUpRight className="h-4 w-4" /></a>
        <button type="button" onClick={() => setSent(false)} className={`mt-5 text-xs underline underline-offset-4 ${dark ? 'text-white/60' : 'text-ink/60'}`}>Enviar outra mensagem</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-x-7 sm:grid-cols-2">
      <label className="block min-w-0"><span className="text-[10px] uppercase tracking-[.16em]">Nome completo</span><input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Seu nome" /></label>
      <label className="block min-w-0"><span className="text-[10px] uppercase tracking-[.16em]">WhatsApp</span><input required inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })} className={field} placeholder="(11) 98765-4321" /></label>
      <label className="block min-w-0"><span className="text-[10px] uppercase tracking-[.16em]">E-mail</span><input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="voce@email.com" /></label>
      {variant === 'residential' ? (
        <label className="block min-w-0"><span className="text-[10px] uppercase tracking-[.16em]">Tipo de projeto</span><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={`${field} [&>option]:text-ink`}><option value="">Selecione uma opção</option><option>Casa</option><option>Apartamento</option><option>Reforma</option><option>Decoração</option></select></label>
      ) : (
        <label className="block min-w-0"><span className="text-[10px] uppercase tracking-[.16em]">{variant === 'health' ? 'Especialidade médica' : 'Tipo de projeto'}</span><input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={field} placeholder={variant === 'health' ? 'Ex.: odontologia' : 'Casa, apartamento, reforma...'} /></label>
      )}
      <label className="mt-5 block min-w-0 sm:col-span-2"><span className="text-[10px] uppercase tracking-[.16em]">{variant === 'health' ? 'Maior desafio do espaço atual' : variant === 'residential' ? 'Mensagem (opcional)' : 'Conte-nos sobre seu projeto'}</span><textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} placeholder="Compartilhe sua ideia, momento ou necessidade." /></label>
      <div className="mt-7 sm:col-span-2">
        <button type="submit" className={`group flex w-full items-center justify-between px-6 py-5 text-xs font-semibold uppercase tracking-[.16em] transition-colors ${dark ? 'bg-brass text-ink hover:bg-white' : 'bg-ink text-white hover:bg-brass hover:text-ink'}`}>
          {variant === 'health' ? 'Agendar consulta de viabilidade' : 'Iniciar meu projeto'} <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
        <p className={`mt-4 text-center text-[11px] ${dark ? 'text-white/65' : 'text-ink/65'}`}>Seus dados estão seguros. Responderemos em até 24h.</p>
      </div>
    </form>
  );
}
