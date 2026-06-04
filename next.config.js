/** @type {import('next').NextConfig} */
const nextConfig = {
  // これが今回のエラー（Typed Routes）の犯人です。一旦オフにします。
  typedRoutes: false,
}

module.exports = nextConfig