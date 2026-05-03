<script setup lang="ts">
const { locale } = useI18n()
const { alliance } = useMailto()
const { t } = useI18n()

const { data } = await useAsyncData(
  () => `golf-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value.toLowerCase()}/solutions/golf`).first()
)

const videoTitleMap = {
  'zh-TW': 'Golf AI 訓練示範',
  'zh-CN': 'Golf AI 训练示范',
  'en':    'Golf AI Training Demo',
}
const videoCaptionMap = {
  'zh-TW': 'AI 揮桿分析 + VR 沉浸練習：玩家在室內就能取得轉播級的即時回饋。',
  'zh-CN': 'AI 挥杆分析 + VR 沉浸练习：玩家在室内就能取得转播级的实时反馈。',
  'en':    'AI swing analysis with VR practice — see how players train indoors with broadcast-grade feedback.',
}

usePageSeo({
  title: data.value?.title,
  description: data.value?.description,
})

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/solutions/golf#webpage',
    url: 'https://infiag.com/solutions/golf',
    name: () => t('schema.solutions.golf.name'),
    description: () => t('schema.solutions.golf.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/solutions/golf#service',
    name: () => t('schema.solutions.golf.name'),
    description: () => t('schema.solutions.golf.description'),
    serviceType: 'Golf Simulation Platform',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Business' },
  },
])
</script>

<template>
  <div v-if="data">
    <SectionContainer
      :title="data.title"
      :subtitle="data.description"
      variant="tech"
    />
    <SectionContainer variant="tight">
      <div class="max-w-4xl mx-auto">
        <VideoCard
          src="https://cdn.infiag.com/media/Golf%20AI%20Training.mp4"
          :title="videoTitleMap[locale] ?? videoTitleMap['zh-TW']"
          :caption="videoCaptionMap[locale] ?? videoCaptionMap['zh-TW']"
        />
      </div>
    </SectionContainer>
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard
          v-for="f in data.features"
          :key="f.title"
          :icon="f.icon"
          :title="f.title"
          :description="f.desc"
        />
      </div>
    </SectionContainer>
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>
    <CTASection
      :title="t('cta.alliance')"
      :cta-label="t('cta.contact')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
