import type { Metadata } from 'next';
import SpecialtyPage from '@/components/SpecialtyPage';

export const metadata: Metadata = {
  title: 'Arquitetura para Clínicas e Saúde',
  description: 'Arquitetura especializada para saúde: design humanizado, fluxo eficiente e conformidade ANVISA / RDC 50.',
  alternates: { canonical: '/saude' },
  openGraph: { images: ['/assets/health/hero.jpg'] },
};

export default function HealthPage() { return <SpecialtyPage variant="health" />; }
