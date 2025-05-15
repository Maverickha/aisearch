/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'assets-global.website-files.com' },
      { protocol: 'https', hostname: 'www.gstatic.com' },
      { protocol: 'https', hostname: 'ssl.gstatic.com' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'static.grammarly.com' },
      { protocol: 'https', hostname: 'cdn.midjourney.com' },
      { protocol: 'https', hostname: 'runwayml.com' },
      { protocol: 'https', hostname: 'app.runwayml.com' },
      { protocol: 'https', hostname: 'www.descript.com' },
      { protocol: 'https', hostname: 'copilot.microsoft.com' },
      { protocol: 'https', hostname: 'otter.ai' },
      { protocol: 'https', hostname: 'github.githubassets.com' },
      { protocol: 'https', hostname: 'www.cursor.so' },
      { protocol: 'https', hostname: 'www.tabnine.com' },
      { protocol: 'https', hostname: 'www.perplexity.ai' },
      { protocol: 'https', hostname: 'www.fromly.ai' },
      { protocol: 'https', hostname: 'www.jasper.ai' },
      { protocol: 'https', hostname: 'www.copy.ai' },
      { protocol: 'https', hostname: 'rytr.me' },
      { protocol: 'https', hostname: 'www.frase.io' },
      { protocol: 'https', hostname: 'quillbot.com' },
      { protocol: 'https', hostname: 'static.canva.com' },
      { protocol: 'https', hostname: 'leonardo.ai' },
      { protocol: 'https', hostname: 'pika.art' },
      { protocol: 'https', hostname: 'www.synthesia.io' },
      { protocol: 'https', hostname: 'www.heygen.com' },
      { protocol: 'https', hostname: 'lumen5.com' },
      { protocol: 'https', hostname: 'codeium.com' },
      { protocol: 'https', hostname: 'qwen.aliyun.com' },
      { protocol: 'https', hostname: 'www.midjourney.com' },
      { protocol: 'https', hostname: 'openai.com' },
      { protocol: 'https', hostname: 'writesonic.com' },
      { protocol: 'https', hostname: 'www.tiro.ai' },
      { protocol: 'https', hostname: 'claude.ai' },
      { protocol: 'https', hostname: 'gemini.google.com' },
      { protocol: 'https', hostname: 'llama.meta.com' },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        pathname: '/**',
      },
    ],
    domains: [
      "upload.wikimedia.org",
      "www.gstatic.com",
      "assets-global.website-files.com",
      "www.midjourney.com",
      "openai.com",
      "leonardo.ai",
      "www.canva.com",
      "app.runwayml.com",
      "pika.art",
      "www.synthesia.io",
      "www.heygen.com",
      "www.descript.com",
      "lumen5.com",
      "www.perplexity.ai",
      "www.tiro.ai",
      "www.fromly.ai",
      "www.copy.ai",
      "rytr.me",
      "static.grammarly.com",
      "writesonic.com",
      "www.frase.io",
      "quillbot.com",
      "github.githubassets.com",
      "codeium.com",
      "claude.ai",
      "gemini.google.com",
      "www.cursor.so",
      "llama.meta.com",
      "qwen.aliyun.com"
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' https:;
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https:;
              style-src 'self' 'unsafe-inline' https:;
              img-src 'self' data: https:;
              font-src 'self' https:;
              connect-src 'self' https:;
              frame-src 'self' https:;
              object-src 'none';
              base-uri 'self';
              form-action 'self' https:;
              frame-ancestors 'self';
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 