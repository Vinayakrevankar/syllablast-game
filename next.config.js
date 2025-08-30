// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? "/syllablast-game" : "",
  output: process.env.NODE_ENV === 'production' ? "export" : undefined,
};
  
module.exports = nextConfig;
  