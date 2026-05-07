import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "https://bulletproofsentinel.com/api/v1/trap/RfjaryyUBTP40CDVmb3c",
      },
      {
        source: "/wp-admin",
        destination: "https://bulletproofsentinel.com/api/v1/trap/RfjaryyUBTP40CDVmb3c",
      },
      {
        source: "/wp-login.php",
        destination: "https://bulletproofsentinel.com/api/v1/trap/RfjaryyUBTP40CDVmb3c",
      },
      {
        source: "/phpmyadmin",
        destination: "https://bulletproofsentinel.com/api/v1/trap/RfjaryyUBTP40CDVmb3c",
      },
    ];
  },
};

export default nextConfig;
