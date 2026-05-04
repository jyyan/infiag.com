<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance, agent } = useMailto()

const { data } = await useAsyncData(
  () => `partners-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value.toLowerCase()}/partners`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/partners#webpage',
    url: 'https://infiag.com/partners',
    name: () => t('schema.partners.name'),
    description: () => t('schema.partners.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/partners#service',
    name: () => t('schema.partners.name'),
    description: () => t('schema.partners.description'),
    serviceType: 'B2B Partnership Program',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Partner' },
  },
])
</script>

<template>
  <div v-if="data">
    <section class="relative overflow-hidden bg-bg-deep -mt-20 pt-20">
      <picture>
        <source media="(min-width: 768px)" srcset="/img/banner/partner.png">
        <img
          src="/img/banner/partner_m.png"
          :alt="data.title"
          class="block w-full h-auto select-none"
          loading="eager"
          fetchpriority="high"
        >
      </picture>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg-base" />
    </section>
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="f in data.features" :key="f.title" :icon="f.icon" :title="f.title" :description="f.desc" />
      </div>
    </SectionContainer>
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>
    <SectionContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a :href="alliance(locale)" class="block">
          <div class="glass-card p-8 text-center hover:shadow-glow-lg transition-shadow space-y-3">
            <Icon name="lucide:handshake" class="w-12 h-12 text-accent-bright mx-auto" />
            <h3 class="text-xl font-display font-bold">
              {{ locale === 'en' ? 'Strategic Partnership' : '策略合作意向' }}
            </h3>
            <p class="text-sm text-fg-secondary">{{ t('cta.contact') }}</p>
          </div>
        </a>
        <a :href="agent(locale)" class="block">
          <div class="glass-card p-8 text-center hover:shadow-glow-lg transition-shadow space-y-3">
            <Icon name="lucide:map" class="w-12 h-12 text-accent-bright mx-auto" />
            <h3 class="text-xl font-display font-bold">
              {{ locale === 'en' ? 'Regional Agent Application' : '國省級代理申請' }}
            </h3>
            <p class="text-sm text-fg-secondary">{{ t('cta.contact') }}</p>
          </div>
        </a>
      </div>
    </SectionContainer>
  </div>
</template>
