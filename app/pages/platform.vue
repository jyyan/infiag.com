<script setup lang="ts">
const { t, locale } = useI18n()
const { alliance } = useMailto()

const titleMap = {
  'zh-TW': '開放平台與技術規範',
  'zh-CN': '开放平台与技术规范',
  'en':    'Open Platform & Standards',
}
const subtitleMap = {
  'zh-TW': '開源 LMM 大運動模型 + VR/AI 專利授權',
  'zh-CN': '开源 LMM 大运动模型 + VR/AI 专利授权',
  'en':    'Open-source LMM (Large Motion Model) + VR/AI patent licensing',
}

const features = computed(() => locale.value === 'en' ? [
  { icon: 'brain',    title: 'Open-source LMM',     desc: 'A large motion model trained for sports and movement, freely available to ecosystem members' },
  { icon: 'shield',   title: 'Patent Licensing',     desc: 'Capture-period clauses ensure licensees access future patents at the same rate' },
  { icon: 'package',  title: 'Bundled IP Package',   desc: 'Third-party patents bundled in one license to lower integration complexity' },
  { icon: 'plug',     title: 'Hardware Compliance',  desc: 'Manufacturing standards make any device on our spec interoperable' },
  { icon: 'layers',   title: 'SDK & Tooling',        desc: 'A unified SDK so apps run cross-brand without re-engineering' },
  { icon: 'handshake',title: 'No Hardware Compete',  desc: 'We license tech, we do not compete with manufacturers — building trust' },
] : [
  { icon: 'brain',    title: '開源 LMM 大運動模型',  desc: '針對運動動作訓練的大模型，開放給生態系夥伴使用' },
  { icon: 'shield',   title: '專利授權方案',          desc: '「捕獲期」條款保證授權廠商在標準產品週期內可使用未來專利，費率不變' },
  { icon: 'package',  title: '第三方專利打包授權',    desc: '一站式打包必需的第三方專利，降低整合難度' },
  { icon: 'plug',     title: '硬體製造規範',          desc: '採用本規範的設備天生跨品牌相容' },
  { icon: 'layers',   title: 'SDK 與工具鏈',          desc: '統一 SDK 讓應用一次開發、跨硬體運行' },
  { icon: 'handshake',title: '不與硬體廠競爭',        desc: '我們提供技術不做硬體，建立廠商信任' },
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
        <FeatureCard
          v-for="f in features"
          :key="f.title"
          :icon="f.icon"
          :title="f.title"
          :description="f.desc"
        />
      </div>
    </SectionContainer>
    <CTASection
      :title="locale === 'en' ? 'Ready to integrate?' : '準備好接入了嗎？'"
      :subtitle="locale === 'en' ? 'Join our growing ecosystem of hardware and software partners.' : '加入我們不斷成長的硬體與軟體合作夥伴生態系。'"
      :cta-label="t('cta.alliance')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
