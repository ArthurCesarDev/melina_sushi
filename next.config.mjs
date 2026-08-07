/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permite validar o build sem disputar a pasta `.next` com o servidor local.
  distDir: process.env.NEXT_DIST_DIR || ".next",
}

export default nextConfig
