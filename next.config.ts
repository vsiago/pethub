/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.localhost', // Admin subdomain
          },
        ],
        destination: '/admin/:path*', // Admin routes
      },
    ];
  },

  eslint: {
    // Ignora erros de lint no build (Vercel ou local)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
