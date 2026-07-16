import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://camilacaruso-arquiteta.vercel.app';
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/residencial`, changeFrequency: 'monthly', priority: .9 },
    { url: `${base}/saude`, changeFrequency: 'monthly', priority: .9 },
  ];
}
