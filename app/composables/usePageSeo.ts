interface PageSeoOptions {
  title?: string | null
  description?: string | null
  image?: string | null
}

export function usePageSeo(options: PageSeoOptions = {}) {
  const { t } = useI18n()
  const siteName = t('site.name')
  const siteTagline = t('site.tagline')

  const title = options.title ?? siteTagline
  const description = options.description ?? siteTagline
  const image = options.image ?? '/og-default.png'

  useSeoMeta({
    title: () => `${title} | ${siteName}`,
    description: () => description,
    ogTitle: () => `${title} | ${siteName}`,
    ogDescription: () => description,
    ogImage: () => image,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: () => `${title} | ${siteName}`,
    twitterDescription: () => description,
    twitterImage: () => image,
  })
}
