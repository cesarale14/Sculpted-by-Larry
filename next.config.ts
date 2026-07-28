import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Orphaned v1 pages (old navy/gold identity, no longer linked from nav).
    // Redirected home so the dead brand is unreachable; the page files are
    // kept in the repo in case they're revived post-elevation.
    return [
      { source: "/about", destination: "/", permanent: false },
      { source: "/book", destination: "/", permanent: false },
      { source: "/results", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
