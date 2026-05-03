// app/composables/useSiteSchema.ts
// Builds the site-wide Organization + WebSite schema for the current locale.
// Called once from app.vue. Returns plain objects ready to pass into useSchemaOrg().
//
// Note on i18n: vue-i18n v9+ uses tm() to access non-string messages (arrays /
// nested objects). t() coerces to string and would return "[object Object]"
// or stringify the array, which is wrong for schema fields.

export function useSiteSchema() {
  const { t, tm, locale } = useI18n()

  const localeToBcp47: Record<string, string> = {
    'zh-TW': 'zh-Hant',
    'zh-CN': 'zh-Hans',
    'en': 'en-US',
  }
  const lang = localeToBcp47[locale.value] ?? 'en-US'

  const organization = defineOrganization({
    '@id': 'https://infiag.com/#organization',
    name: t('site.name'),
    legalName: t('site.company'),
    alternateName: ['Infinity Agentic', '無限智能'],
    url: 'https://infiag.com',
    logo: 'https://infiag.com/logo.png',
    description: t('schema.org.description'),
    slogan: t('site.tagline'),
    foundingDate: '2026-05-02',
    founder: {
      '@type': 'Organization',
      name: 'BSE#91 營銷一組 董事會',
    },
    address: {
      '@type': 'PostalAddress',
      name: 'BSE#91 營銷一組',
      streetAddress: '21, Jalan Tasik Permaisuri 2',
      addressLocality: 'Bandar Tun Razak',
      postalCode: '56000',
      addressRegion: 'Wilayah Persekutuan Kuala Lumpur',
      addressCountry: 'MY',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'jeff@infiag.com',
        availableLanguage: ['zh-Hant', 'zh-Hans', 'en'],
        areaServed: ['TW', 'CN', 'MY', 'Global'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'investor relations',
        email: 'jeff@infiag.com',
        availableLanguage: ['zh-Hant', 'zh-Hans', 'en'],
      },
    ],
    knowsAbout: tm('schema.org.knowsAbout') as string[],
  })

  const website = defineWebSite({
    '@id': 'https://infiag.com/#website',
    url: 'https://infiag.com',
    name: t('site.name'),
    inLanguage: lang,
    publisher: { '@id': 'https://infiag.com/#organization' },
  })

  return { organization, website, lang }
}
