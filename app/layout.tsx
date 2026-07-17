import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://camila-caruso-arquiteta-classic.vercel.app'),
  robots: { index: false, follow: false },
  title: {
    default: 'Camila Caruso — Arquitetura e Interiores',
    template: '%s | Camila Caruso',
  },
  description:
    'Há 20 anos criando espaços que transformam vidas. Arquitetura residencial de alto padrão e projetos especializados para saúde.',
  icons: {
    icon: [{ url: '/assets/brand/favicon.png?v=2', type: 'image/png', sizes: '512x512' }],
    shortcut: '/assets/brand/favicon.png?v=2',
    apple: '/assets/brand/favicon.png?v=2',
  },
  openGraph: {
    title: 'Camila Caruso — Arquitetura e Interiores',
    description: 'Projetos autorais, gestão rigorosa e espaços que transformam vidas.',
    images: ['/assets/home/banner-homepage-1.jpg'],
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#161714',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
