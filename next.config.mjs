import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

// ─── OWASP A05: Security Headers ────────────────────────────────────────────
const securityHeaders = [
  {
    // Prevents clickjacking attacks (iframing your site)
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    // Prevents MIME-type sniffing (content-type attacks)
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Forces HTTPS for 2 years — protects against protocol downgrade
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Controls what info is sent in the Referer header
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Disables microphone, camera, geolocation unless explicitly needed
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Legacy XSS filter for older browsers
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    // Content Security Policy — controls allowed script/style sources
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live https://trusting-cougar-73039.upstash.io",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Apply security headers to ALL routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "flagcdn.com" },
    ],
  },
};

export default withPWA(nextConfig);
