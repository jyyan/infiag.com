<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const titleMap = {
  'zh-TW': '解決方案',
  'zh-CN': '解决方案',
  'en':    'Solutions',
}
const subtitleMap = {
  'zh-TW': '三大利基市場：高消費力、高需求、高技術依賴',
  'zh-CN': '三大利基市场：高消费力、高需求、高技术依赖',
  'en':    'Three niches: high spend, high demand, high technical dependency',
}

const cards = computed(() => [
  { to: localePath('/solutions/golf'),  icon: 'flag',     title: t('nav.solutions_golf'),
    tagline: locale.value === 'en' ? 'Sports' : '運動',
    desc: locale.value === 'en' ? 'AI swing analysis + immersive VR range' : 'AI 揮桿分析 + VR 沉浸式練習場' },
  { to: localePath('/solutions/ski'),   icon: 'mountain', title: t('nav.solutions_ski'),
    tagline: locale.value === 'en' ? 'Sports' : '運動',
    desc: locale.value === 'en' ? 'Pre-season virtual training + on-slope AR' : '雪季前虛擬訓練 + 雪道 AR 教練' },
  { to: localePath('/solutions/vision'), icon: 'eye',     title: t('nav.solutions_vision'),
    tagline: locale.value === 'en' ? 'Healthcare' : '醫療',
    desc: locale.value === 'en' ? 'Clinically-grounded myopia control for children' : '結合臨床標準的兒童近視矯正預防系統' },
])

usePageSeo({ title: titleMap[locale.value] ?? titleMap['zh-TW'] })
</script>

<template>
  <div>
    <SectionContainer
      :title="titleMap[locale] ?? titleMap['zh-TW']"
      :subtitle="subtitleMap[locale] ?? subtitleMap['zh-TW']"
      variant="tech"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8">
        <SolutionCard
          v-for="c in cards"
          :key="c.to"
          :to="c.to"
          :icon="c.icon"
          :tagline="c.tagline"
          :title="c.title"
          :description="c.desc"
        />
      </div>
    </SectionContainer>
  </div>
</template>
