import withPWA from "next-pwa";

const withPWAModule = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  turbopack: {}, // 👈 重點：避免 Next 16 error
};

export default withPWAModule(nextConfig);
