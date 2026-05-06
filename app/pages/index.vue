<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { alliance, pitchDeck } = useMailto()
const { founders } = useFounders()

usePageSeo({
  title: t('home.lumi.seo.title'),
  description: t('home.lumi.seo.description'),
})

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/#webpage',
    url: 'https://infiag.com',
    name: () => t('home.lumi.seo.title'),
    description: () => t('home.lumi.seo.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])

const painPoints = computed(() => [
  { stat: t('home.lumi.pain.i1_stat'), label: t('home.lumi.pain.i1_label'), desc: t('home.lumi.pain.i1_desc'), icon: 'message-circle-question' },
  { stat: t('home.lumi.pain.i2_stat'), label: t('home.lumi.pain.i2_label'), desc: t('home.lumi.pain.i2_desc'), icon: 'users' },
  { stat: t('home.lumi.pain.i3_stat'), label: t('home.lumi.pain.i3_label'), desc: t('home.lumi.pain.i3_desc'), icon: 'home' },
  { stat: t('home.lumi.pain.i4_stat'), label: t('home.lumi.pain.i4_label'), desc: t('home.lumi.pain.i4_desc'), icon: 'headphones' },
])

const painScenarios = computed(() =>
  (['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'] as const).map((k) => ({
    quote: t(`home.lumi.pain.scenarios.${k}.quote`),
    cause: t(`home.lumi.pain.scenarios.${k}.cause`),
  })),
)

const steps = computed(() => [
  { step: '01', title: t('home.lumi.steps.s1_title'), desc: t('home.lumi.steps.s1_desc'), icon: 'eye' },
  { step: '02', title: t('home.lumi.steps.s2_title'), desc: t('home.lumi.steps.s2_desc'), icon: 'message-circle' },
  { step: '03', title: t('home.lumi.steps.s3_title'), desc: t('home.lumi.steps.s3_desc'), icon: 'check-check' },
])

const cTrack = computed(() => [
  { code: 'v1', name: 'LUMI',    year: t('home.lumi.roadmap.v1_year'), tagline: t('home.lumi.roadmap.v1_tagline'), desc: t('home.lumi.roadmap.v1_desc') },
  { code: 'v2', name: 'Studio',  year: t('home.lumi.roadmap.v2_year'), tagline: t('home.lumi.roadmap.v2_tagline'), desc: t('home.lumi.roadmap.v2_desc') },
  { code: 'v3', name: 'Effects', year: t('home.lumi.roadmap.v3_year'), tagline: t('home.lumi.roadmap.v3_tagline'), desc: t('home.lumi.roadmap.v3_desc') },
])

const bTrack = computed(() => ({
  code: 'v4',
  name: t('home.lumi.roadmap.v4_name'),
  year: t('home.lumi.roadmap.v4_year'),
  tagline: t('home.lumi.roadmap.v4_tagline'),
  desc: t('home.lumi.roadmap.v4_desc'),
}))

const flywheel = computed(() => [
  { icon: 'users',    title: t('home.lumi.flywheel.i1_title'), desc: t('home.lumi.flywheel.i1_desc') },
  { icon: 'database', title: t('home.lumi.flywheel.i2_title'), desc: t('home.lumi.flywheel.i2_desc') },
  { icon: 'sparkles', title: t('home.lumi.flywheel.i3_title'), desc: t('home.lumi.flywheel.i3_desc') },
])
</script>

<template>
  <div>
    <!-- 1. Hero -->
    <HeroLumi
      :tagline="t('home.lumi.hero.tagline')"
      :title="t('home.lumi.hero.title')"
      :desc="t('home.lumi.hero.desc')"
      :primary-cta-label="t('cta.try_lumi')"
      primary-cta-href="https://lumi.infiag.com/"
      :secondary-cta-label="t('cta.learn_roadmap')"
      :secondary-cta-to="localePath('/') + '#roadmap'"
    />

    <!-- 2. Stuck person opening -->
    <StuckPersonSection
      :label="t('home.lumi.stuck.label')"
      :title="t('home.lumi.stuck.title')"
      :quote="t('home.lumi.stuck.quote')"
      :body-p1="t('home.lumi.stuck.body_p1')"
      :body-p2="t('home.lumi.stuck.body_p2')"
      :tagline="t('home.lumi.stuck.tagline')"
    />

    <!-- 3. Pain point stats -->
    <PainPointStats
      :title="t('home.lumi.pain.title')"
      :subtitle="t('home.lumi.pain.subtitle')"
      :items="painPoints"
    />

    <!-- 3.5. Pain scenarios — 8 daily-tech moments parents have asked -->
    <PainPointScenarios
      :scenarios="painScenarios"
      :closing="t('home.lumi.pain.closing')"
    />

    <!-- 4. Three steps demo -->
    <LumiThreeSteps
      :title="t('home.lumi.steps.title')"
      :subtitle="t('home.lumi.steps.subtitle')"
      :steps="steps"
    />

    <!-- 5. Roadmap (anchor target for hero CTA) -->
    <div id="roadmap">
      <RoadmapDualTrack
        :title="t('home.lumi.roadmap.title')"
        :subtitle="t('home.lumi.roadmap.subtitle')"
        :c-label="t('home.lumi.roadmap.c_label')"
        :c-caption="t('home.lumi.roadmap.c_caption')"
        :b-label="t('home.lumi.roadmap.b_label')"
        :b-caption="t('home.lumi.roadmap.b_caption')"
        :c-items="cTrack"
        :b-item="bTrack"
        :b-cta-label="t('home.lumi.roadmap.b_cta')"
        :b-cta-to="localePath('/platform')"
      />
    </div>

    <!-- 6. Business flywheel -->
    <BusinessFlywheel
      :title="t('home.lumi.flywheel.title')"
      :subtitle="t('home.lumi.flywheel.subtitle')"
      :items="flywheel"
    />

    <!-- 7. Founders (reuse) -->
    <SectionContainer
      :title="t('home.founders_title')"
      :subtitle="t('home.founders_subtitle')"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FounderCard
          v-for="f in founders"
          :key="f.id"
          :founder="f"
          variant="compact"
        />
      </div>
      <div class="text-center mt-10">
        <NuxtLink
          :to="localePath('/about') + '#team'"
          class="inline-flex items-center gap-2 text-lumi-pink font-medium hover:gap-3 transition-all"
        >
          <span>{{ t('home.founders_cta') }}</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </SectionContainer>

    <!-- 8. For Business entry -->
    <SectionContainer variant="tight">
      <div
        class="glass-card p-8 lg:p-12 relative overflow-hidden"
      >
        <div class="absolute inset-0 grid-tech opacity-25 pointer-events-none" />
        <div class="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
          <div class="space-y-3">
            <h3 class="text-2xl md:text-3xl font-display font-bold text-fg-primary">
              {{ t('home.lumi.for_business.title') }}
            </h3>
            <p class="text-fg-secondary leading-relaxed max-w-2xl">
              {{ t('home.lumi.for_business.subtitle') }}
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              :to="localePath('/platform')"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent-glow/40 text-accent-bright hover:bg-accent-glow/10 transition-colors text-sm font-medium"
            >
              {{ t('nav.platform') }}
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink
              :to="localePath('/partners')"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent-glow/40 text-accent-bright hover:bg-accent-glow/10 transition-colors text-sm font-medium"
            >
              {{ t('nav.partners') }}
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
            <a
              :href="alliance(locale)"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-glow/15 border border-accent-glow/60 text-accent-bright hover:bg-accent-glow/25 transition-colors text-sm font-medium"
            >
              {{ t('cta.business_inquiry') }}
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>

    <!-- 9. Closing CTA — early user + investor split -->
    <SectionContainer variant="tight">
      <div
        class="glass-card p-12 lg:p-16 text-center relative overflow-hidden"
        style="background: radial-gradient(ellipse at top, hsl(var(--lumi-purple) / 0.25) 0%, transparent 70%);"
      >
        <div class="absolute inset-0 grid-tech opacity-25 pointer-events-none" />
        <div class="relative space-y-6">
          <h3
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-lumi-gradient"
          >
            {{ t('home.lumi.closing.title') }}
          </h3>
          <p class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto">
            {{ t('home.lumi.closing.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a :href="alliance(locale)">
              <button class="btn-lumi text-base px-8 py-4">
                {{ t('cta.become_early_user') }}
              </button>
            </a>
            <NuxtLink :to="localePath('/investors')">
              <button class="inline-flex items-center justify-center px-8 py-4 rounded-full border border-lumi-purple/50 text-lumi-pink hover:bg-lumi-purple/10 transition-colors text-base font-medium">
                {{ t('cta.view_investors') }}
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </SectionContainer>
  </div>
</template>
