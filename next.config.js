/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig:{
    bodyParser:{
      sizeLimit:"10mb"
    },
  },
}

module.exports = nextConfig

