/** @type {import('next').NextConfig} */
const nextConfig = {
  // AIDEV-NOTE: Configurações de otimização de imagens
  images: {
    // Formatos de imagem otimizados
    formats: ['image/webp', 'image/avif'],
    
    // Tamanhos de dispositivo para responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Tamanhos de imagem para diferentes breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Domínios externos permitidos (se necessário)
    domains: [],
    
    // Configurações de cache
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 ano
    
    // Configurações de otimização
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // AIDEV-NOTE: Configurações de performance
  experimental: {
    // Otimizações experimentais
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  
  // AIDEV-NOTE: Configurações de build
  compiler: {
    // Remove console.log em produção
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // AIDEV-NOTE: Headers de segurança e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache estático para imagens
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache para assets do INDEX
        source: '/INDEX/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig