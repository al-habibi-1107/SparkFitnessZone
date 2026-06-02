import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options",    value: "nosniff" },
  // Block clickjacking
  { key: "X-Frame-Options",           value: "DENY" },
  // Enable browser XSS filter (legacy browsers)
  { key: "X-XSS-Protection",          value: "1; mode=block" },
  // Only send origin in referrer
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  // Restrict browser features
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(self)" },
  // Enforce HTTPS (2 years, include subdomains)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [128, 256, 384, 512],
  },

  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
