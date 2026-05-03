// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-05-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  // Force pure static SSG even when building inside Cloudflare's environment.
  // Without this, Nitro auto-switches to 'cloudflare-module' (a Worker that
  // SSRs at runtime), generates its own wrangler.json that overrides ours,
  // and breaks the static-assets deploy flow defined in /wrangler.jsonc.
  nitro: {
    preset: 'static',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-TW' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&family=JetBrains+Mono:wght@400;700&display=swap' },
      ],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@vueuse/motion/nuxt',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/icon',
  ],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts',
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  site: {
    url: 'https://infiag.com',
    name: 'Infinity Agentic 無限智能',
    description: '打造 AI/VR 開放生態合作平台',
    defaultLocale: 'zh-TW',
  },
  icon: {
    serverBundle: 'local',
  },
  image: {
    format: ['webp', 'avif', 'jpg'],
  },
  ogImage: {
    zeroRuntime: true,
  },
  i18n: {
    defaultLocale: 'zh-TW',
    strategy: 'prefix',
    langDir: 'locales',
    locales: [
      { code: 'zh-TW', language: 'zh-TW', name: '繁體中文', file: 'zh-TW.json', dir: 'ltr' },
      { code: 'zh-CN', language: 'zh-CN', name: '简体中文', file: 'zh-CN.json', dir: 'ltr' },
      { code: 'en',    language: 'en-US', name: 'English',  file: 'en.json',    dir: 'ltr' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'zh-TW',
    },
  },
})
