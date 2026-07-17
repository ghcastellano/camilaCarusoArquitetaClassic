import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Camila Caruso Arquitetura e Interiores',
    short_name: 'C. Caruso',
    description: 'Arquitetura residencial de alto padrão e projetos especializados para saúde.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f6f1',
    theme_color: '#161714',
    icons: [{ src: '/assets/brand/favicon.png?v=2', sizes: '512x512', type: 'image/png' }],
  };
}
