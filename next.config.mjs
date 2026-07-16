/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/residencial.html', destination: '/residencial', permanent: true },
      { source: '/saude.html', destination: '/saude', permanent: true },
    ];
  },
};

export default nextConfig;
