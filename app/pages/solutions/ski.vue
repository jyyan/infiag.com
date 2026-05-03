<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance } = useMailto()

const { data } = await useAsyncData(
  () => `ski-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value.toLowerCase()}/solutions/ski`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/solutions/ski#webpage',
    url: 'https://infiag.com/solutions/ski',
    name: () => t('schema.solutions.ski.name'),
    description: () => t('schema.solutions.ski.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/solutions/ski#service',
    name: () => t('schema.solutions.ski.name'),
    description: () => t('schema.solutions.ski.description'),
    serviceType: 'Ski Training Platform',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Business' },
  },
])
</script>

<template>
  <div v-if="data">
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />
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
    <CTASection :title="t('cta.alliance')" :cta-label="t('cta.contact')" :cta-href="alliance(locale)" />
  </div>
</template>
