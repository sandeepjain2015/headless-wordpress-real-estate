
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sandeepjain.in",
        port: "",
        pathname: "/tikamgarh-properties/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/tikamgarh_properties/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],

    // Serve modern image formats when supported by the browser
    formats: ["image/avif", "image/webp"],

    // Allow the quality values used by your Image components
    qualities: [65, 75],
  },
};

module.exports = nextConfig;
