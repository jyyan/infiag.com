<script setup lang="ts">
const { locale, t } = useI18n()
const { pitchDeck } = useMailto()

const { data } = await useAsyncData(
  () => `investors-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value.toLowerCase()}/investors`).first()
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

const isEn = computed(() => locale.value === 'en')
const isCN = computed(() => locale.value === 'zh-CN')

const visionLabel  = computed(() => isEn.value ? 'Investment thesis' : (isCN.value ? '投資主軸' : '投資主軸'))
const visionTitle  = computed(() => isEn.value
  ? 'Three layers of compounding value'
  : (isCN.value ? '三層複利價值' : '三層複利價值'))
const visionSubtitle = computed(() => isEn.value
  ? 'LUMI is the entry point — but the long-term thesis is a behavior-data flywheel that powers a multi-product, multi-market company.'
  : (isCN.value
    ? 'LUMI 是入口 — 但長期主軸是行為數據飛輪所驅動、跨產品跨市場的多軌成長。'
    : 'LUMI 是入口 — 但長期主軸是行為數據飛輪所驅動、跨產品跨市場的多軌成長。'))

const pillars = computed(() => [
  {
    icon: 'users',
    code: 'L1',
    title: isEn.value ? 'Consumer companion' : (isCN.value ? '消費者陪伴' : '消費者陪伴'),
    desc: isEn.value
      ? 'LUMI v1 ships as an on-screen companion. Studio (AR) and Effects (VR) extend the same companion across modalities.'
      : (isCN.value
        ? 'LUMI v1 率先上線螢幕陪伴。Studio (AR) 與 Effects (VR) 把同一個同伴延伸到不同模態。'
        : 'LUMI v1 率先上線螢幕陪伴。Studio (AR) 與 Effects (VR) 把同一個同伴延伸到不同模態。'),
  },
  {
    icon: 'database',
    code: 'L2',
    title: isEn.value ? 'Behavior data engine' : (isCN.value ? '行為數據引擎' : '行為數據引擎'),
    desc: isEn.value
      ? 'Every walked-through task contributes to a first-of-its-kind dataset of how humans actually do things — the asset that compounds.'
      : (isCN.value
        ? '每一次「陪做完」都在累積全球第一個人類操作行為資料集 — 這是真正會複利的資產。'
        : '每一次「陪做完」都在累積全球第一個人類操作行為資料集 — 這是真正會複利的資產。'),
  },
  {
    icon: 'building-2',
    code: 'L3',
    title: isEn.value ? 'Enterprise modules' : (isCN.value ? '企業模組變現' : '企業模組變現'),
    desc: isEn.value
      ? 'LUMI for Business licenses the engine to enterprises — support, training, brand IP. The B2B platform we already operate is the channel.'
      : (isCN.value
        ? 'LUMI for Business 把引擎授權給企業 — 客服、訓練、品牌 IP。我們既有的 B2B 開放平台就是落地通路。'
        : 'LUMI for Business 把引擎授權給企業 — 客服、訓練、品牌 IP。我們既有的 B2B 開放平台就是落地通路。'),
  },
])

const growthTitle = computed(() => isEn.value ? 'Five-year ambition' : (isCN.value ? '五年目標' : '五年目標'))
const growthSubtitle = computed(() => isEn.value
  ? 'A multi-fold ARR ambition between 2026 launch and 2030. Detailed financials shared under NDA.'
  : (isCN.value
    ? '從 2026 上線到 2030 的多倍 ARR 願景。詳細財務數字於 NDA 後分享。'
    : '從 2026 上線到 2030 的多倍 ARR 願景。詳細財務數字於 NDA 後分享。'))
const growthFromLabel = computed(() => isEn.value ? '2026 launch' : (isCN.value ? '2026 起點' : '2026 起點'))
const growthToLabel   = computed(() => isEn.value ? '2030 target' : (isCN.value ? '2030 願景' : '2030 願景'))
const growthNote      = computed(() => isEn.value
  ? 'Multiplier shown for direction, not as guidance. Request the deck for figures.'
  : (isCN.value
    ? '倍數僅示意方向，非營運指引。完整數字請索取 Pitch Deck。'
    : '倍數僅示意方向，非營運指引。完整數字請索取 Pitch Deck。'))
</script>

<template>
  <div v-if="data">
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />

    <!-- LUMI three-pillar vision -->
    <SectionContainer
      :title="visionTitle"
      :subtitle="visionSubtitle"
    >
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink text-center -mt-8 mb-10">
        {{ visionLabel }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FadeInUp v-for="(p, i) in pillars" :key="p.code" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full space-y-4 group hover:border-lumi-purple/40 transition-colors relative">
            <span class="absolute top-4 right-4 font-mono text-xs text-fg-muted">{{ p.code }}</span>
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center
                     border border-lumi-purple/30 group-hover:shadow-lumi-glow transition-shadow"
              style="background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.18), hsl(var(--lumi-pink) / 0.18));"
            >
              <Icon :name="`lucide:${p.icon}`" class="w-6 h-6 text-lumi-pink" />
            </div>
            <h3 class="text-xl font-display font-bold text-fg-primary">{{ p.title }}</h3>
            <p class="text-fg-secondary leading-relaxed">{{ p.desc }}</p>
          </div>
        </FadeInUp>
      </div>
    </SectionContainer>

    <!-- 30x growth visual -->
    <SectionContainer variant="tight">
      <div class="rounded-2xl border border-lumi-purple/30 bg-bg-glass backdrop-blur-glass p-8 lg:p-12 relative overflow-hidden">
        <div class="absolute inset-0 grid-tech opacity-25 pointer-events-none" />
        <div class="relative space-y-8">
          <div class="text-center space-y-3">
            <h3 class="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gradient">
              {{ growthTitle }}
            </h3>
            <p class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto">
              {{ growthSubtitle }}
            </p>
          </div>

          <!-- Bar visualization -->
          <div class="grid grid-cols-[1fr_auto_2fr] items-end gap-4 lg:gap-6 max-w-3xl mx-auto pt-4">
            <div class="space-y-2 text-right">
              <p class="font-mono text-xs uppercase tracking-wider text-fg-muted">{{ growthFromLabel }}</p>
              <div class="h-12 lg:h-14 rounded-md bg-lumi-purple/30 border border-lumi-purple/40 ml-auto" style="width: 30%;" />
              <p class="font-display text-2xl font-bold text-lumi-pink">1×</p>
            </div>
            <div class="flex flex-col items-center justify-end pb-12">
              <Icon name="lucide:arrow-right" class="w-8 h-8 text-lumi-pink animate-pulse" />
            </div>
            <div class="space-y-2">
              <p class="font-mono text-xs uppercase tracking-wider text-fg-muted">{{ growthToLabel }}</p>
              <div
                class="h-32 lg:h-40 rounded-md border border-lumi-pink shadow-lumi-glow"
                style="width: 100%; background: linear-gradient(180deg, hsl(var(--lumi-purple)) 0%, hsl(var(--lumi-pink)) 100%);"
              />
              <p class="font-display text-4xl lg:text-5xl font-bold text-lumi-gradient">30×</p>
            </div>
          </div>

          <p class="text-center text-xs text-fg-muted italic max-w-xl mx-auto">
            {{ growthNote }}
          </p>
        </div>
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
