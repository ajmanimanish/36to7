const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/sign-in', destination: '/auth/sign-in', permanent: true },
      { source: '/sign-up', destination: '/auth/sign-up', permanent: true },
      { source: '/forgot-password', destination: '/auth/forgot-password', permanent: true },
    ];
  },
};

module.exports = nextConfig;

