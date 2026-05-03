<script setup lang="ts">
const { t, locale } = useI18n()

const titleByLocale = computed(() => ({
  'zh-TW': '關於 Infinity Agentic',
  'zh-CN': '关于 Infinity Agentic',
  'en':    'About Infinity Agentic',
}[locale.value] ?? '關於 Infinity Agentic'))

const introByLocale = computed(() => ({
  'zh-TW': '我們是一個專注於 AI/VR 開放生態系的平台公司。透過開放專利與技術規範，打破當前市場的閉鎖生態，讓硬體廠、軟體商與消費者三方共贏。',
  'zh-CN': '我们是一个专注于 AI/VR 开放生态系的平台公司。透过开放专利与技术规范，打破当前市场的闭锁生态，让硬件厂、软件商与消费者三方共赢。',
  'en':    'We are a platform company focused on the open AI/VR ecosystem. Through open patents and technical standards, we break the current locked ecosystem and create a win-win for hardware makers, software developers, and consumers.',
}[locale.value] ?? ''))

const soar = computed(() => [
  { letter: 'S', title: locale.value === 'en' ? 'Strengths' : '優勢',
    desc: locale.value === 'en' ? 'Open VR/AI tech foundation, precise niche entry'
                                 : '開放技術底座、精準利基切入' },
  { letter: 'O', title: locale.value === 'en' ? 'Opportunities' : '機會',
    desc: locale.value === 'en' ? 'Eliminate consumer pain points, AI wearable boom'
                                 : '消除消費者痛點、AI 穿戴爆發期' },
  { letter: 'A', title: locale.value === 'en' ? 'Aspirations' : '抱負',
    desc: locale.value === 'en' ? 'Become the Qualcomm/Android of AI/VR'
                                 : '成為 AI/VR 界的「高通」與「安卓」' },
  { letter: 'R', title: locale.value === 'en' ? 'Results' : '結果',
    desc: locale.value === 'en' ? 'Ecosystem expansion + niche penetration metrics'
                                 : '生態系擴張指標、利基市場滲透率' },
])

usePageSeo({ title: titleByLocale.value, description: introByLocale.value })

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@type': 'AboutPage',
    '@id': 'https://infiag.com/about#webpage',
    url: 'https://infiag.com/about',
    name: () => t('nav.about'),
    description: () => t('schema.org.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])
</script>

<template>
  <div>
    <SectionContainer :title="titleByLocale" :subtitle="introByLocale" variant="tech" />
    <SectionContainer
      :title="locale === 'en' ? 'SOAR Strategic Framework' : 'SOAR 策略框架'"
      :subtitle="locale === 'en'
        ? 'Strengths · Opportunities · Aspirations · Results'
        : '優勢 · 機會 · 抱負 · 結果'"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          v-for="s in soar"
          :key="s.letter"
          :icon="'star'"
          :title="`${s.letter} — ${s.title}`"
          :description="s.desc"
        />
      </div>
    </SectionContainer>
  </div>
</template>
