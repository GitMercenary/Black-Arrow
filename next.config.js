/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow devices on local network to access dev server
  allowedDevOrigins: [
    '192.168.1.42',  // Mobile device
    '192.168.68.112', // Other device
  ],

  // Allow cross-origin for mobile testing
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'osmvhuyiryxposllkicd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler options (removeConsole not supported by Turbopack)
  // Console logs will be automatically stripped in production builds
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production' ? {
  //     exclude: ['error', 'warn'],
  //   } : false,
  // },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Build optimizations
  productionBrowserSourceMaps: false,

  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Fix webpack cache ENOENT errors in development
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache instead of filesystem to prevent ENOENT errors
      config.cache = {
        type: 'memory',
      };
    }
    return config;
  },
}

module.exports = nextConfig
