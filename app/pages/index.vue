<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { alliance, pitchDeck } = useMailto()

usePageSeo({
  title: t('home.hero_title_1') + ' ' + t('home.hero_title_2'),
})

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/#webpage',
    url: 'https://infiag.com',
    name: () => `${t('home.hero_title_1')} ${t('home.hero_title_2')}`,
    description: () => t('home.hero_subtitle'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])

const isEn = computed(() => locale.value === 'en')

const problems = computed(() => [
  { icon: 'puzzle',     title: isEn.value ? 'Spec Fragmentation' : '規格分歧',
    desc: isEn.value
      ? 'AI/VR brands lock users into incompatible ecosystems. Each headset speaks its own protocol; software written for one cannot run on another.'
      : 'AI/VR 各家硬體規格各自為政、互不相容。每款眼鏡用自己的協定，A 品牌的軟體無法搬到 B 品牌上跑。' },
  { icon: 'lock',       title: isEn.value ? 'Software Lock-in' : '軟體閉鎖',
    desc: isEn.value
      ? 'Apps built for Brand A cannot run on Brand B hardware. Developers ship the same logic three times for three SKUs.'
      : 'A 品牌軟體無法在 B 品牌硬體上運行。開發者得為三家硬體寫三套，重複勞動沒有盡頭。' },
  { icon: 'wallet',     title: isEn.value ? 'Wasted Spend' : '消費者重複付費',
    desc: isEn.value
      ? 'Consumers pay twice when switching hardware — and abandon the category in frustration.'
      : '更換硬體就要重買軟體。消費者要嘛重複付費，要嘛乾脆放棄整個品類。' },
])

const solutions = computed(() => [
  { to: localePath('/solutions/golf'),
    icon: 'flag',
    tagline: isEn.value ? 'NICHE 01' : '利基市場 01',
    title: t('nav.solutions_golf'),
    description: isEn.value
      ? 'AI swing analysis and immersive VR practice for serious players'
      : 'AI 揮桿分析、沉浸式 VR 練習場，專為高消費力玩家打造' },
  { to: localePath('/solutions/ski'),
    icon: 'mountain',
    tagline: isEn.value ? 'NICHE 02' : '利基市場 02',
    title: t('nav.solutions_ski'),
    description: isEn.value
      ? 'Pre-season virtual training and on-slope AR coaching for skiers'
      : '雪季前虛擬訓練、雪道上 AR 教練輔助' },
  { to: localePath('/solutions/vision'),
    icon: 'eye',
    tagline: isEn.value ? 'NICHE 03' : '利基市場 03',
    title: t('nav.solutions_vision'),
    description: isEn.value
      ? 'Clinically-grounded myopia control system for children'
      : '結合臨床標準，給家長與兒童的近視矯正預防方案' },
])

const whyNow = computed(() => [
  { icon: 'trending-up', metric: '40%+', label: isEn.value ? 'Annual AI/VR Hardware Growth' : 'AI/VR 硬體年增率',
    desc: isEn.value ? 'The wearable category is past its inflection point.' : '穿戴市場已過拐點，進入規模成長期。' },
  { icon: 'users',       metric: '500M', label: isEn.value ? 'Children with Myopia (Asia)' : '亞洲近視兒童人數',
    desc: isEn.value ? 'Public-health crisis without scalable tools.' : '公衛問題缺少可規模化的科技解方。' },
  { icon: 'globe',       metric: '50+',  label: isEn.value ? 'Brands Without a Common Layer' : '缺乏共通層的品牌',
    desc: isEn.value ? 'A unified platform is the missing piece.' : '共通標準正是市場目前缺的那一塊。' },
])

const process = computed(() => [
  { step: '01',
    title: isEn.value ? 'Reach Out' : '聯繫接洽',
    desc: isEn.value ? 'Email our marketing team via the alliance form. We respond within 5 business days.'
                     : '透過下方 mailto 寄信給 BSE#91 營銷組。我們在 5 個工作天內回覆。' },
  { step: '02',
    title: isEn.value ? 'Discovery Call' : '線上會議',
    desc: isEn.value ? 'A 30-minute video call to align on scope, technical fit, and partnership shape.'
                     : '30 分鐘線上會議，對齊範圍、技術契合度、合作形態。' },
  { step: '03',
    title: isEn.value ? 'NDA & Due Diligence' : '簽 NDA、深入評估',
    desc: isEn.value ? 'Mutual NDA, then we share roadmap, IP, financials, and capture-period clauses.'
                     : '雙向保密協議簽訂，分享路線圖、專利、財務、捕獲期條款。' },
  { step: '04',
    title: isEn.value ? 'Contract & Launch' : '簽約啟動',
    desc: isEn.value ? 'Define the deliverables and ship — joint marketing follows on agreed milestones.'
                     : '確定範圍簽正式合約，依里程碑啟動聯合行銷。' },
])

const proofPoints = computed(() => [
  { icon: 'shield-check', title: isEn.value ? 'Capture-Period Clause'   : '捕獲期條款',
    desc: isEn.value ? 'Same royalty rate during licensee\'s standard product lifecycle — no surprise hikes.'
                     : '授權期內費率不變，未來新專利同條款延伸。' },
  { icon: 'package',      title: isEn.value ? 'Bundled IP'              : '專利打包授權',
    desc: isEn.value ? 'We bundle the third-party patents you would otherwise license separately.'
                     : '一次打包必需的第三方專利，免去整合難題。' },
  { icon: 'unplug',       title: isEn.value ? 'No Hardware Competition' : '不與你競爭',
    desc: isEn.value ? 'We license tech only; we do not manufacture devices that compete with our partners.'
                     : '我們只授權技術、不做硬體，不會與你的產品線競爭。' },
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

    <!-- Problems -->
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

    <!-- Why now (market timing) -->
    <SectionContainer
      :title="isEn ? 'Why Now' : '為什麼是現在'"
      :subtitle="isEn ? 'A unique window where market readiness, hardware maturity, and policy alignment converge.'
                      : '市場成熟度、硬體進化、政策方向罕見地三線交會的時間視窗。'"
      variant="tech"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
        <FadeInUp v-for="(item, i) in whyNow" :key="item.label" :delay="i * 100">
          <div class="glass-card p-8 lg:p-10 space-y-4 text-center group">
            <div class="w-14 h-14 rounded-2xl bg-bg-elevated flex items-center justify-center mx-auto border border-accent-glow/30 group-hover:shadow-glow transition-shadow">
              <Icon :name="`lucide:${item.icon}`" class="w-7 h-7 text-accent-bright" />
            </div>
            <div class="text-4xl lg:text-5xl font-display font-bold text-gradient">
              {{ item.metric }}
            </div>
            <div class="text-sm uppercase tracking-wider text-accent-bright">{{ item.label }}</div>
            <p class="text-fg-secondary leading-relaxed">{{ item.desc }}</p>
          </div>
        </FadeInUp>
      </div>
    </SectionContainer>

    <!-- Three niche solutions -->
    <SectionContainer
      :title="t('home.solutions_title')"
      :subtitle="t('home.solutions_subtitle')"
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

    <!-- Open ecosystem visual -->
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
          :title="isEn ? 'Hardware Makers' : '硬體製造商'"
          :description="isEn ? 'Adopt our open spec — skip the foundational R&D and ship faster.'
                             : '採用我們的開放規範，免除底層研發、加速上市。'"
        />
        <FeatureCard
          icon="code"
          :title="isEn ? 'Software Developers' : '軟體開發商'"
          :description="isEn ? 'One codebase runs across every Infinity-compliant device. Royalties low or waived in launch period.'
                             : '一份程式碼跨所有相容硬體運行。上市期權利金低或全免。'"
        />
        <FeatureCard
          icon="hospital"
          :title="isEn ? 'Sports & Medical Institutions' : '醫療與運動機構'"
          :description="isEn ? 'Niche-market channels and clinical validation as part of the partner program.'
                             : '利基通路、臨床背書，全部納入合作計畫。'"
        />
      </div>
    </SectionContainer>

    <!-- Why partner with us — proof points borrowed from BM.md (capture period, bundled IP, no hardware compete) -->
    <SectionContainer
      :title="isEn ? 'Why Partner with Us' : '為什麼選我們'"
      :subtitle="isEn ? 'Drawing from Qualcomm and Sony PlayStation playbooks — terms designed to make joining a no-brainer.'
                      : '借鏡 Qualcomm 與 Sony PlayStation 模式：把加入這件事，設計成不必猶豫的選擇。'"
      variant="tech"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard
          v-for="p in proofPoints"
          :key="p.title"
          :icon="p.icon"
          :title="p.title"
          :description="p.desc"
        />
      </div>
    </SectionContainer>

    <!-- 4-step partnership process -->
    <SectionContainer
      :title="isEn ? 'How to Partner' : '合作流程'"
      :subtitle="isEn ? 'Four lightweight steps from first email to launch.'
                      : '從第一封 email 到正式啟動，四個簡潔步驟。'"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FadeInUp v-for="(step, i) in process" :key="step.step" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full space-y-4 relative overflow-hidden group">
            <div class="absolute -top-4 -right-4 text-7xl lg:text-8xl font-display font-bold text-accent-glow/10 group-hover:text-accent-glow/20 transition-colors">
              {{ step.step }}
            </div>
            <div class="relative">
              <div class="text-xs uppercase tracking-widest text-accent-bright font-mono">
                STEP {{ step.step }}
              </div>
              <h3 class="text-xl font-display font-bold mt-2">{{ step.title }}</h3>
              <p class="text-fg-secondary leading-relaxed mt-3">{{ step.desc }}</p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </SectionContainer>

    <!-- Stats -->
    <SectionContainer variant="tight">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 py-8">
        <StatNumber :value="3" suffix="+" :label="isEn ? 'Launch Niches' : '首發利基'" />
        <StatNumber :value="100" suffix="%" :label="isEn ? 'Open Standard' : '開放規範'" />
        <StatNumber :value="1" prefix="∞" suffix="" :label="isEn ? 'Ecosystem' : '生態系統'" />
      </div>
    </SectionContainer>

    <!-- Closing CTA — alliance + investor split -->
    <SectionContainer variant="tight">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a :href="alliance(locale)" class="group block">
          <div class="glass-card p-8 lg:p-10 h-full space-y-4 hover:shadow-glow-lg transition-shadow relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />
            <div class="relative space-y-3">
              <Icon name="lucide:handshake" class="w-10 h-10 text-accent-bright" />
              <h3 class="text-2xl font-display font-bold">
                {{ isEn ? 'Become a Partner' : '成為合作夥伴' }}
              </h3>
              <p class="text-fg-secondary">
                {{ isEn ? 'Hardware, software, sports, medical — let\'s talk.' : '硬體 / 軟體 / 運動 / 醫療都歡迎。' }}
              </p>
              <span class="inline-flex items-center gap-2 text-accent-bright font-medium pt-2 group-hover:gap-3 transition-all">
                {{ t('cta.alliance') }} <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </span>
            </div>
          </div>
        </a>
        <a :href="pitchDeck(locale)" class="group block">
          <div class="glass-card p-8 lg:p-10 h-full space-y-4 hover:shadow-glow-lg transition-shadow relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />
            <div class="relative space-y-3">
              <Icon name="lucide:briefcase" class="w-10 h-10 text-accent-bright" />
              <h3 class="text-2xl font-display font-bold">
                {{ isEn ? 'Investor Materials' : '投資人資料' }}
              </h3>
              <p class="text-fg-secondary">
                {{ isEn ? 'Request the full pitch deck and financials under NDA.' : '索取完整 Pitch Deck 與財務資料，於保密協議下分享。' }}
              </p>
              <span class="inline-flex items-center gap-2 text-accent-bright font-medium pt-2 group-hover:gap-3 transition-all">
                {{ t('cta.request_deck') }} <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </span>
            </div>
          </div>
        </a>
      </div>
    </SectionContainer>

    <!-- Final aspirational CTA -->
    <CTASection
      :title="t('home.aspiration_title')"
      :subtitle="t('home.aspiration_subtitle')"
      :cta-label="t('cta.alliance')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
