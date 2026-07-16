import type { Metadata } from 'next';
import SpecialtyPage from '@/components/SpecialtyPage';

export const metadata: Metadata = {
  title: 'Arquitetura Residencial de Alto Padrão',
  description: 'Projetos residenciais exclusivos, do conceito à entrega, com 20 anos de experiência, atendimento personalizado e gestão integral.',
  alternates: { canonical: '/residencial' },
  openGraph: { images: ['/assets/residential/hero.jpg'] },
};

export default function ResidentialPage() { return <SpecialtyPage variant="residential" />; }
