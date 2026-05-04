<script setup lang="ts">
type CTrack = { code: string; name: string; year: string; tagline: string; desc: string }
type BTrack = { code: string; name: string; year: string; tagline: string; desc: string }

defineProps<{
  title: string
  subtitle: string
  cLabel: string
  cCaption: string
  bLabel: string
  bCaption: string
  cItems: CTrack[]
  bItem: BTrack
  bCtaLabel: string
  bCtaTo: string
}>()
</script>

<template>
  <section class="py-20 lg:py-28">
    <div class="container-tight">
      <div class="text-center mb-12 lg:mb-16 space-y-4">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient"
        >
          {{ title }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
          class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- Consumer track -->
      <div class="mb-10 lg:mb-12">
        <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink mb-1">
              {{ cLabel }}
            </p>
            <p class="text-fg-secondary text-sm">{{ cCaption }}</p>
          </div>
          <div class="hidden md:flex items-center gap-2 text-xs font-mono text-fg-muted">
            <span class="w-2 h-2 rounded-full bg-lumi-pink animate-pulse" />
            <span>CONSUMER</span>
          </div>
        </div>

        <div class="relative">
          <!-- arrow line for desktop -->
          <div class="hidden lg:block absolute top-[42%] left-[14%] right-[14%] h-px bg-gradient-to-r from-lumi-purple/60 via-lumi-pink/60 to-lumi-purple/40" />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 relative">
            <FadeInUp v-for="(item, i) in cItems" :key="item.code" :delay="i * 120">
              <div
                class="rounded-2xl p-5 lg:p-6 h-full space-y-3 border bg-bg-glass backdrop-blur-glass relative"
                :class="i === 0
                  ? 'border-lumi-pink/60 shadow-lumi-glow bg-lumi-purple/5'
                  : 'border-border-subtle hover:border-lumi-purple/40 transition-colors'"
              >
                <span
                  v-if="i === 0"
                  class="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-gradient-lumi text-xs font-bold text-bg-deep"
                >
                  NOW
                </span>
                <div class="flex items-baseline gap-3">
                  <span class="font-mono text-xs text-lumi-pink uppercase tracking-wider">{{ item.code }}</span>
                  <span class="font-mono text-xs text-fg-muted">{{ item.year }}</span>
                </div>
                <h3 class="text-2xl lg:text-3xl font-display font-bold"
                    :class="i === 0 ? 'text-lumi-gradient' : 'text-fg-primary'">
                  {{ item.name }}
                </h3>
                <p class="text-sm font-medium text-fg-primary">{{ item.tagline }}</p>
                <p class="text-sm text-fg-secondary leading-relaxed">{{ item.desc }}</p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      <!-- Track divider -->
      <div class="flex items-center gap-4 my-10 lg:my-14 max-w-3xl mx-auto">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        <span class="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted whitespace-nowrap">× business</span>
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>

      <!-- Business track -->
      <div>
        <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.25em] text-accent-bright mb-1">
              {{ bLabel }}
            </p>
            <p class="text-fg-secondary text-sm">{{ bCaption }}</p>
          </div>
          <div class="hidden md:flex items-center gap-2 text-xs font-mono text-fg-muted">
            <span class="w-2 h-2 rounded-full bg-accent-bright animate-pulse" />
            <span>BUSINESS</span>
          </div>
        </div>

        <FadeInUp>
          <div class="rounded-2xl p-6 lg:p-8 border border-accent-glow/40 bg-accent-deep/10 relative overflow-hidden group">
            <div class="absolute inset-0 grid-tech opacity-25 pointer-events-none" />
            <div class="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
              <div class="space-y-3">
                <div class="flex items-baseline gap-3">
                  <span class="font-mono text-xs text-accent-bright uppercase tracking-wider">{{ bItem.code }}</span>
                  <span class="font-mono text-xs text-fg-muted">{{ bItem.year }}</span>
                </div>
                <h3 class="text-2xl lg:text-3xl font-display font-bold text-gradient">
                  {{ bItem.name }}
                </h3>
                <p class="text-sm font-medium text-fg-primary">{{ bItem.tagline }}</p>
                <p class="text-sm text-fg-secondary leading-relaxed max-w-2xl">{{ bItem.desc }}</p>
              </div>
              <NuxtLink :to="bCtaTo" class="inline-flex items-center gap-2 text-accent-bright font-medium whitespace-nowrap group-hover:gap-3 transition-all">
                <span>{{ bCtaLabel }}</span>
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
