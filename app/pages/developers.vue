<script setup lang="ts">
const { locale, t } = useI18n()
const { support } = useMailto()

const titleMap = { 'zh-TW': '開發者 / SDK', 'zh-CN': '开发者 / SDK', 'en': 'Developers / SDK' }
const subtitleMap = {
  'zh-TW': '一次開發，跨所有採用 Infinity 規範的硬體運行',
  'zh-CN': '一次开发，跨所有采用 Infinity 规范的硬件运行',
  'en':    'Build once, run on every device with the Infinity standard',
}

const videoTitleMap = {
  'zh-TW': '學習任何技術',
  'zh-CN': '学习任何技术',
  'en':    'Learn Any Technical Skill',
}
const videoCaptionMap = {
  'zh-TW': '一窺開發者能在 Infinity SDK 上打造的應用：沉浸式、實作導向的技術學習場景。',
  'zh-CN': '一窥开发者能在 Infinity SDK 上打造的应用：沉浸式、实作导向的技术学习场景。',
  'en':    'A glimpse of what developers can build on the Infinity SDK — immersive, hands-on technical learning.',
}

const ctaTitleMap = {
  'zh-TW': '準備好開始開發了嗎？',
  'zh-CN': '准备好开始开发了吗？',
  'en':    'Ready to start building?',
}
const ctaSubtitleMap = {
  'zh-TW': '取得 SDK 與開發者計畫的早期存取權',
  'zh-CN': '获取 SDK 与开发者计划的早期存取权',
  'en':    'Get early access to our SDK and developer program.',
}

const benefitsByLocale = {
  'zh-TW': [
    { icon: 'code',       title: '單一程式碼基底', desc: '同一份程式碼在所有相容硬體上運行' },
    { icon: 'package',    title: '免費 SDK',       desc: '開放 SDK + 完整範例與教學' },
    { icon: 'wallet',     title: '低權利金',        desc: '降低或免除初期權利金，降低風險' },
    { icon: 'users',      title: '龐大用戶基數',    desc: '直接接觸高爾夫、滑雪、兒童近視等利基受眾' },
    { icon: 'line-chart', title: '透明分潤',        desc: '透明的變現機制與平台分析' },
    { icon: 'megaphone',  title: '聯合行銷',        desc: '上線活動聯合推廣' },
  ],
  'zh-CN': [
    { icon: 'code',       title: '单一代码库',      desc: '同一份代码在所有相容硬件上运行' },
    { icon: 'package',    title: '免费 SDK',        desc: '开放 SDK + 完整范例与教学' },
    { icon: 'wallet',     title: '低权利金',        desc: '降低或免除初期权利金，降低风险' },
    { icon: 'users',      title: '庞大用户基数',    desc: '直接接触高尔夫、滑雪、儿童近视等利基受众' },
    { icon: 'line-chart', title: '透明分润',        desc: '透明的变现机制与平台分析' },
    { icon: 'megaphone',  title: '联合营销',        desc: '上线活动联合推广' },
  ],
  'en': [
    { icon: 'code',       title: 'Single Codebase', desc: 'Same code runs across all compatible AI/VR glasses' },
    { icon: 'package',    title: 'Free SDK',        desc: 'Open SDK + comprehensive samples and tutorials' },
    { icon: 'wallet',     title: 'Low Royalty',     desc: 'Reduced or waived initial royalties to lower your risk' },
    { icon: 'users',      title: 'Big User Base',   desc: 'Tap into our growing niche audiences (golf, ski, vision)' },
    { icon: 'line-chart', title: 'Revenue Share',   desc: 'Transparent monetization with platform analytics' },
    { icon: 'megaphone',  title: 'Marketing Co-op', desc: 'Featured placement in launch campaigns' },
  ],
} as const

const benefits = computed(() => benefitsByLocale[locale.value as keyof typeof benefitsByLocale] ?? benefitsByLocale['zh-TW'])

usePageSeo({ title: titleMap[locale.value] ?? titleMap['zh-TW'] })

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/developers#webpage',
    url: 'https://infiag.com/developers',
    name: () => t('nav.developers'),
    description: () => t('schema.org.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])
</script>

<template>
  <div>
    <SectionContainer
      :title="titleMap[locale] ?? titleMap['zh-TW']"
      :subtitle="subtitleMap[locale] ?? subtitleMap['zh-TW']"
      variant="tech"
    />
    <SectionContainer variant="tight">
      <div class="max-w-4xl mx-auto">
        <VideoCard
          src="https://cdn.infiag.com/media/Learn%20Any%20Technical.mp4"
          :title="videoTitleMap[locale] ?? videoTitleMap['zh-TW']"
          :caption="videoCaptionMap[locale] ?? videoCaptionMap['zh-TW']"
        />
      </div>
    </SectionContainer>
    <SectionContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="b in benefits" :key="b.title" :icon="b.icon" :title="b.title" :description="b.desc" />
      </div>
    </SectionContainer>
    <CTASection
      :title="ctaTitleMap[locale] ?? ctaTitleMap['zh-TW']"
      :subtitle="ctaSubtitleMap[locale] ?? ctaSubtitleMap['zh-TW']"
      :cta-label="t('cta.contact')"
      :cta-href="support(locale)"
    />
  </div>
</template>
