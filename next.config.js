/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    REACT_APP_ZOOMBA_API_END_POINT: 'http://localhost:3000',
    REACT_APP_RAVE_KEY: 'FLWPUBK_TEST-19f613aab108c11705cb3ebd42b6b672-X'
  }
}

module.exports = nextConfig
