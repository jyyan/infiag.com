<script setup lang="ts">
const { locale, t } = useI18n()
const { pitchDeck } = useMailto()

const { data } = await useAsyncData(
  () => `investors-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/investors`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/investors#webpage',
    url: 'https://infiag.com/investors',
    name: () => t('nav.investors'),
    description: () => t('schema.org.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
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
    <CTASection
      :title="t('cta.request_deck')"
      :subtitle="locale === 'en'
        ? 'Receive our full materials under NDA.'
        : '我們會在保密協議下分享完整資料'"
      :cta-label="t('cta.request_deck')"
      :cta-href="pitchDeck(locale)"
    />
  </div>
</template>
