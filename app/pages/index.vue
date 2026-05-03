<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { alliance } = useMailto()

usePageSeo({
  title: t('home.hero_title_1') + ' ' + t('home.hero_title_2'),
})

const problems = computed(() => [
  { icon: 'puzzle',     title: locale.value === 'en' ? 'Spec Fragmentation' : '規格分歧',
    desc: locale.value === 'en' ? 'AI/VR brands lock users into incompatible ecosystems'
                                 : 'AI/VR 各家硬體規格各自為政，互不相容' },
  { icon: 'lock',       title: locale.value === 'en' ? 'Software Lock-in' : '軟體閉鎖',
    desc: locale.value === 'en' ? 'Apps for Brand A cannot run on Brand B hardware'
                                 : 'A 品牌軟體無法在 B 品牌硬體上運行' },
  { icon: 'wallet',     title: locale.value === 'en' ? 'Wasted Spend' : '消費者重複付費',
    desc: locale.value === 'en' ? 'Consumers pay twice when switching hardware'
                                 : '更換硬體就要重買軟體，造成資源浪費' },
])

const solutions = computed(() => [
  { to: localePath('/solutions/golf'),
    icon: 'flag',
    tagline: locale.value === 'en' ? 'NICHE 01' : '利基市場 01',
    title: t('nav.solutions_golf'),
    description: locale.value === 'en'
      ? 'AI swing analysis and immersive VR practice for serious players'
      : 'AI 揮桿分析、沉浸式 VR 練習場，專為高消費力玩家打造' },
  { to: localePath('/solutions/ski'),
    icon: 'mountain',
    tagline: locale.value === 'en' ? 'NICHE 02' : '利基市場 02',
    title: t('nav.solutions_ski'),
    description: locale.value === 'en'
      ? 'Pre-season virtual training and on-slope AR coaching for skiers'
      : '雪季前虛擬訓練、雪道上 AR 教練輔助' },
  { to: localePath('/solutions/vision'),
    icon: 'eye',
    tagline: locale.value === 'en' ? 'NICHE 03' : '利基市場 03',
    title: t('nav.solutions_vision'),
    description: locale.value === 'en'
      ? 'Clinically-grounded myopia control system for children'
      : '結合臨床標準，給家長與兒童的近視矯正預防方案' },
])
</script>

<template>
  <div>
    <HeroBanner
      :title1="t('home.hero_title_1')"
      :title2="t('home.hero_title_2')"
      :subtitle="t('home.hero_subtitle')"
      :primary-cta-label="t('cta.alliance')"
      :primary-cta-href="alliance(locale)"
      :secondary-cta-label="t('cta.learn_platform')"
      :secondary-cta-to="localePath('/platform')"
    />

    <SectionContainer
      :title="t('home.problem_title')"
      :subtitle="t('home.problem_subtitle')"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard
          v-for="p in problems"
          :key="p.title"
          :icon="p.icon"
          :title="p.title"
          :description="p.desc"
        />
      </div>
    </SectionContainer>

    <SectionContainer
      :title="t('home.solutions_title')"
      :subtitle="t('home.solutions_subtitle')"
      variant="tech"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <SolutionCard
          v-for="s in solutions"
          :key="s.to"
          :to="s.to"
          :icon="s.icon"
          :tagline="s.tagline"
          :title="s.title"
          :description="s.description"
        />
      </div>
    </SectionContainer>

    <SectionContainer
      :title="t('home.ecosystem_title')"
      :subtitle="t('home.ecosystem_subtitle')"
      variant="tight"
    >
      <FadeInUp>
        <div class="flex justify-center py-8">
          <InfinityLogoSVG :size="240" />
        </div>
      </FadeInUp>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <FeatureCard
          icon="cpu"
          :title="locale === 'en' ? 'Hardware Makers' : '硬體製造商'"
          :description="locale === 'en' ? 'Adopt our standard, save R&D' : '採用我們的規範，降低研發成本'"
        />
        <FeatureCard
          icon="code"
          :title="locale === 'en' ? 'Software Developers' : '軟體開發商'"
          :description="locale === 'en' ? 'Build once, run on every brand' : '一次開發，跨硬體品牌運行'"
        />
        <FeatureCard
          icon="hospital"
          :title="locale === 'en' ? 'Sports & Medical' : '醫療運動機構'"
          :description="locale === 'en' ? 'Professional channel and validation' : '專業通路與背書合作'"
        />
      </div>
    </SectionContainer>

    <SectionContainer variant="tight">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 py-8">
        <StatNumber :value="3" suffix="+" :label="locale === 'en' ? 'Niche Markets' : '利基市場'" />
        <StatNumber :value="100" suffix="%" :label="locale === 'en' ? 'Open Standard' : '開放規範'" />
        <StatNumber :value="1" prefix="∞" suffix="" :label="locale === 'en' ? 'Ecosystem' : '生態系統'" />
      </div>
    </SectionContainer>

    <CTASection
      :title="t('home.aspiration_title')"
      :subtitle="t('home.aspiration_subtitle')"
      :cta-label="t('cta.alliance')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
