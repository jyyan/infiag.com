<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance } = useMailto()

const { data } = await useAsyncData(
  () => `vision-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/solutions/vision`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/solutions/vision#webpage',
    url: 'https://infiag.com/solutions/vision',
    name: () => t('schema.solutions.vision.name'),
    description: () => t('schema.solutions.vision.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/solutions/vision#service',
    name: () => t('schema.solutions.vision.name'),
    description: () => t('schema.solutions.vision.description'),
    serviceType: 'Pediatric Myopia Correction',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Business' },
  },
])
</script>

<template>
  <div v-if="data">
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />
    <SectionContainer variant="tight">
      <div class="max-w-4xl mx-auto">
        <VideoCard
          src="https://cdn.infiag.com/media/Children%20Myopia%20Control.mp4"
          :title="locale === 'en' ? 'Children Myopia Control Demo' : '兒童近視矯正示範'"
          :caption="locale === 'en'
            ? 'Clinically-grounded vision training delivered through child-friendly AR — designed for daily home use.'
            : '結合臨床標準的視覺訓練，透過親子友善的 AR 介面，設計給每日居家使用。'"
        />
      </div>
    </SectionContainer>
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
