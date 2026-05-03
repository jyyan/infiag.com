<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance } = useMailto()

const titleMap = { 'zh-TW': '開發者 / SDK', 'zh-CN': '开发者 / SDK', 'en': 'Developers / SDK' }
const subtitleMap = {
  'zh-TW': '一次開發，跨所有採用 Infinity 規範的硬體運行',
  'zh-CN': '一次开发，跨所有采用 Infinity 规范的硬件运行',
  'en':    'Build once, run on every device with the Infinity standard',
}

const benefits = computed(() => locale.value === 'en' ? [
  { icon: 'code',     title: 'Single Codebase',      desc: 'Same code runs across all compatible AI/VR glasses' },
  { icon: 'package',  title: 'Free SDK',             desc: 'Open SDK + comprehensive samples and tutorials' },
  { icon: 'wallet',   title: 'Low Royalty',          desc: 'Reduced or waived initial royalties to lower your risk' },
  { icon: 'users',    title: 'Big User Base',        desc: 'Tap into our growing niche audiences (golf, ski, vision)' },
  { icon: 'line-chart',    title: 'Revenue Share',        desc: 'Transparent monetization with platform analytics' },
  { icon: 'megaphone',title: 'Marketing Co-op',      desc: 'Featured placement in launch campaigns' },
] : [
  { icon: 'code',     title: '單一程式碼基底',        desc: '同一份程式碼在所有相容硬體上運行' },
  { icon: 'package',  title: '免費 SDK',              desc: '開放 SDK + 完整範例與教學' },
  { icon: 'wallet',   title: '低權利金',              desc: '降低或免除初期權利金，降低風險' },
  { icon: 'users',    title: '龐大用戶基數',          desc: '直接接觸高爾夫、滑雪、兒童近視等利基受眾' },
  { icon: 'line-chart',    title: '透明分潤',              desc: '透明的變現機制與平台分析' },
  { icon: 'megaphone',title: '聯合行銷',              desc: '上線活動聯合推廣' },
])

usePageSeo({ title: titleMap[locale.value] ?? titleMap['zh-TW'] })
</script>

<template>
  <div>
    <SectionContainer
      :title="titleMap[locale] ?? titleMap['zh-TW']"
      :subtitle="subtitleMap[locale] ?? subtitleMap['zh-TW']"
      variant="tech"
    />
    <SectionContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="b in benefits" :key="b.title" :icon="b.icon" :title="b.title" :description="b.desc" />
      </div>
    </SectionContainer>
    <CTASection
      :title="locale === 'en' ? 'Ready to start building?' : '準備好開始開發了嗎？'"
      :subtitle="locale === 'en' ? 'Get early access to our SDK and developer program.' : '取得 SDK 與開發者計畫的早期存取權'"
      :cta-label="t('cta.contact')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
