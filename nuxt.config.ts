// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-05-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      htmlAttrs: { lang: 'zh-TW' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&family=JetBrains+Mono:wght@400;700&display=swap' },
      ],
    },
  },
  modules: [
    // additions in later tasks: '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/i18n',
    // '@nuxt/content', '@vueuse/motion/nuxt', '@nuxtjs/seo', '@nuxt/image', '@nuxt/icon',
  ],
})
