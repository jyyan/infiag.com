<script setup lang="ts">
const { t, tm, rt, locale } = useI18n()
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

// L1/L2/L3 vision pillars (LUMI 主軸)
const visionLabel = computed(() => isEn.value ? 'INVESTMENT THESIS' : (isCN.value ? '投资主轴' : '投資主軸'))
const visionTitle = computed(() => isEn.value
  ? 'Three layers of compounding value'
  : (isCN.value ? '三层复利价值' : '三層複利價值'))
const visionSubtitle = computed(() => isEn.value
  ? 'LUMI is the entry point — the long-term thesis is a behavior-data flywheel that powers a multi-product, multi-market company.'
  : (isCN.value
    ? 'LUMI 是入口 — 但长期主轴是行为数据飞轮所驱动、跨产品跨市场的多轨成长。'
    : 'LUMI 是入口 — 但長期主軸是行為數據飛輪所驅動、跨產品跨市場的多軌成長。'))

const pillars = computed(() => [
  {
    icon: 'heart-handshake',
    code: 'L1',
    title: isEn.value ? 'Senior companion' : (isCN.value ? '银发陪伴' : '銀髮陪伴'),
    desc: isEn.value
      ? 'LUMI v1 ships as an on-screen senior companion. Studio (AR) and Effects (VR) extend the same companion across modalities.'
      : (isCN.value
        ? 'LUMI v1 率先上线屏幕陪伴。Studio (AR) 与 Effects (VR) 把同一个同伴延伸到不同模态。'
        : 'LUMI v1 率先上線螢幕陪伴。Studio (AR) 與 Effects (VR) 把同一個同伴延伸到不同模態。'),
  },
  {
    icon: 'database',
    code: 'L2',
    title: isEn.value ? 'Behavior data engine' : (isCN.value ? '行为大模型' : '行為大模型'),
    desc: isEn.value
      ? 'Every walked-through task contributes to the first-of-its-kind 60+ senior behavior dataset — the asset that compounds.'
      : (isCN.value
        ? '每一次「陪做完」都在累积全球第一个 60+ 银发族操作行为资料集 — 这是真正会复利的资产。'
        : '每一次「陪做完」都在累積全球第一個 60+ 銀髮族操作行為資料集 — 這是真正會複利的資產。'),
  },
  {
    icon: 'building-2',
    code: 'L3',
    title: isEn.value ? 'Enterprise modules' : (isCN.value ? '企业模块变现' : '企業模組變現'),
    desc: isEn.value
      ? 'LUMI for Business licenses the engine — to eldercare, insurance, AARP and government digital-equity programs.'
      : (isCN.value
        ? 'LUMI for Business 把引擎授权给企业 — 长照机构、保险公司、AARP、政府数位平权专案。'
        : 'LUMI for Business 把引擎授權給企業 — 長照機構、保險公司、AARP、政府數位平權專案。'),
  },
])

// Growth visual (保留 30× 示意，守 NDA 線)
const growthTitle = computed(() => isEn.value ? 'Five-year ambition' : (isCN.value ? '五年目标' : '五年目標'))
const growthSubtitle = computed(() => isEn.value
  ? 'A multi-fold ARR ambition between 2026 launch and 2030. Detailed financials shared under NDA.'
  : (isCN.value
    ? '从 2026 上线到 2030 的多倍 ARR 愿景。详细财务数字于 NDA 后分享。'
    : '從 2026 上線到 2030 的多倍 ARR 願景。詳細財務數字於 NDA 後分享。'))
const growthFromLabel = computed(() => isEn.value ? '2026 launch' : (isCN.value ? '2026 起点' : '2026 起點'))
const growthToLabel = computed(() => isEn.value ? '2030 target' : (isCN.value ? '2030 愿景' : '2030 願景'))
const growthNote = computed(() => isEn.value
  ? 'Multiplier shown for direction, not as guidance. Request the deck for figures.'
  : (isCN.value
    ? '倍数仅示意方向，非营运指引。完整数字请索取 Pitch Deck。'
    : '倍數僅示意方向，非營運指引。完整數字請索取 Pitch Deck。'))

// Market data (重用首頁 i18n key)
const marketKpis = computed(() => [
  { stat: t('home.lumi.market.kpi.i1.stat'), label: t('home.lumi.market.kpi.i1.label'), desc: t('home.lumi.market.kpi.i1.desc'), icon: t('home.lumi.market.kpi.i1.icon') },
  { stat: t('home.lumi.market.kpi.i2.stat'), label: t('home.lumi.market.kpi.i2.label'), desc: t('home.lumi.market.kpi.i2.desc'), icon: t('home.lumi.market.kpi.i2.icon') },
  { stat: t('home.lumi.market.kpi.i3.stat'), label: t('home.lumi.market.kpi.i3.label'), desc: t('home.lumi.market.kpi.i3.desc'), icon: t('home.lumi.market.kpi.i3.icon') },
  { stat: t('home.lumi.market.kpi.i4.stat'), label: t('home.lumi.market.kpi.i4.label'), desc: t('home.lumi.market.kpi.i4.desc'), icon: t('home.lumi.market.kpi.i4.icon') },
])
const apacCountries = computed(() => {
  const list = tm('home.lumi.market.apac.countries') as Array<Record<string, unknown>>
  if (!Array.isArray(list)) return []
  return list.map((c) => ({
    name: typeof c.name === 'string' ? c.name : rt(c.name as never),
    c2020: typeof c.c2020 === 'string' ? c.c2020 : rt(c.c2020 as never),
    c2030: typeof c.c2030 === 'string' ? c.c2030 : rt(c.c2030 as never),
    c2050: typeof c.c2050 === 'string' ? c.c2050 : rt(c.c2050 as never),
  }))
})

// Advisor quotes (with rt fallback)
const advisorQuotes = computed(() => {
  const list = tm('home.lumi.advisor.quotes') as unknown[]
  if (!Array.isArray(list)) return []
  return list.map((q) => (typeof q === 'string' ? q : rt(q as never))) as string[]
})

// Revenue streams (with rt for nested lines arrays)
const revenueStreams = computed(() => [
  {
    share: t('investors.revenue.r1.share'),
    title: t('investors.revenue.r1.title'),
    amount: t('investors.revenue.r1.amount'),
    lines: ((tm('investors.revenue.r1.lines') as unknown[]) ?? []).map((l) => (typeof l === 'string' ? l : rt(l as never))) as string[],
    icon: t('investors.revenue.r1.icon'),
  },
  {
    share: t('investors.revenue.r2.share'),
    title: t('investors.revenue.r2.title'),
    amount: t('investors.revenue.r2.amount'),
    lines: ((tm('investors.revenue.r2.lines') as unknown[]) ?? []).map((l) => (typeof l === 'string' ? l : rt(l as never))) as string[],
    icon: t('investors.revenue.r2.icon'),
  },
  {
    share: t('investors.revenue.r3.share'),
    title: t('investors.revenue.r3.title'),
    amount: t('investors.revenue.r3.amount'),
    lines: ((tm('investors.revenue.r3.lines') as unknown[]) ?? []).map((l) => (typeof l === 'string' ? l : rt(l as never))) as string[],
    icon: t('investors.revenue.r3.icon'),
  },
])

// Exit paths
const exits = computed(() => [
  { code: t('investors.exits.e1.code'), title: t('investors.exits.e1.title'), desc: t('investors.exits.e1.desc') },
  { code: t('investors.exits.e2.code'), title: t('investors.exits.e2.title'), desc: t('investors.exits.e2.desc') },
  { code: t('investors.exits.e3.code'), title: t('investors.exits.e3.title'), desc: t('investors.exits.e3.desc') },
])
</script>

<template>
  <div v-if="data">
    <!-- 1. Hero -->
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />

    <!-- 2. Mission / Values (大字版) -->
    <SectionContainer variant="tight">
      <div class="text-center space-y-4 max-w-3xl mx-auto">
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink">
          {{ t('investors.mission.eyebrow') }}
        </p>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient leading-tight">
          {{ t('investors.mission.mission') }}
        </h2>
        <div class="pt-4">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink">
            {{ t('investors.mission.value_eyebrow') }}
          </p>
          <p class="text-2xl md:text-3xl font-display font-bold text-lumi-gradient">
            {{ t('investors.mission.value') }}
          </p>
        </div>
      </div>
    </SectionContainer>

    <!-- 3. Vision pillars -->
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
              class="w-12 h-12 rounded-xl flex items-center justify-center border border-lumi-purple/30 group-hover:shadow-lumi-glow transition-shadow"
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

    <!-- 4. Advisor (compact) -->
    <AdvisorCard
      variant="compact"
      :eyebrow="t('home.lumi.advisor.eyebrow')"
      :name="t('home.lumi.advisor.name')"
      :title="t('home.lumi.advisor.title')"
      :headline="t('home.lumi.advisor.headline')"
      :quotes="advisorQuotes"
      :expand-label="t('home.lumi.advisor.expand_label')"
      :video-label="t('home.lumi.advisor.video_label')"
      :full-speech="t('home.lumi.advisor.full_speech')"
      video-href="https://91bse.org/"
    />

    <!-- 5. Capital backers -->
    <CapitalBackers
      :eyebrow="t('home.lumi.backers.eyebrow')"
      :b1-role="t('home.lumi.backers.b1_role')"
      :b2-role="t('home.lumi.backers.b2_role')"
      :b3-role="t('home.lumi.backers.b3_role')"
      :headline="t('home.lumi.backers.headline')"
    />

    <!-- 6. Market opportunity -->
    <MarketOpportunity
      :eyebrow-macro="t('home.lumi.market.eyebrow_macro')"
      :title="t('home.lumi.market.title')"
      :subtitle="t('home.lumi.market.subtitle')"
      :kpis="marketKpis"
      :apac-title="t('home.lumi.market.apac.title')"
      :apac-source-note="t('home.lumi.market.apac.source_note')"
      :header-country="t('home.lumi.market.apac.header_country')"
      :header-2020="t('home.lumi.market.apac.header_2020')"
      :header-2030="t('home.lumi.market.apac.header_2030')"
      :header-2050-share="t('home.lumi.market.apac.header_2050_share')"
      :countries="apacCountries"
    />

    <!-- 7. Revenue streams (詳版) -->
    <RevenueStreams
      :title="t('investors.revenue.title')"
      :subtitle="t('investors.revenue.subtitle')"
      :streams="revenueStreams"
      :arr-label="t('investors.revenue.arr_label')"
      :arr-value="t('investors.revenue.arr_value')"
      :gross-margin-label="t('investors.revenue.gross_margin_label')"
      :gross-margin-value="t('investors.revenue.gross_margin_value')"
      :closing-note="t('investors.revenue.closing_note')"
    />

    <!-- 8. 30× growth visual (保留 NDA 線) -->
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

    <!-- 9. Exit paths -->
    <ExitPaths
      :title="t('investors.exits.title')"
      :subtitle="t('investors.exits.subtitle')"
      :exits="exits"
    />

    <!-- 10. Features (LUMI 三大支柱) -->
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="f in data.features" :key="f.title" :icon="f.icon" :title="f.title" :description="f.desc" />
      </div>
    </SectionContainer>

    <!-- 11. Markdown summary -->
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>

    <!-- 12. CTA -->
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
