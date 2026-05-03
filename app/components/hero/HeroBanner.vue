<script setup lang="ts">
import { Button } from '~/components/ui/button'

defineProps<{
  title1: string
  title2: string
  subtitle?: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel?: string
  secondaryCtaTo?: string
}>()
</script>

<template>
  <section class="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
    <!-- Layer 1: Deep base gradient -->
    <div class="absolute inset-0 bg-bg-deep" />

    <!-- Layer 2: Radial glow from center -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 80% 60% at 50% 60%, hsl(var(--accent-deep) / 0.45) 0%, transparent 60%);"
    />

    <!-- Layer 3: Top fade to elevate header -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-deep to-transparent" />

    <!-- Layer 4: Tech grid -->
    <div class="absolute inset-0 grid-tech opacity-30" />

    <!-- Layer 5: Star particles -->
    <HeroParticles class="absolute inset-0" :count="120" />

    <!-- Layer 6: Earth horizon arc (bottom) -->
    <svg
      class="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[200%] h-1/2 pointer-events-none"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <radialGradient id="horizonGlow" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stop-color="hsl(var(--accent-bright))" stop-opacity="0.55" />
          <stop offset="40%" stop-color="hsl(var(--accent-glow))" stop-opacity="0.3" />
          <stop offset="100%" stop-color="hsl(var(--accent-deep))" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="horizonLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="hsl(var(--accent-glow))" stop-opacity="0" />
          <stop offset="50%" stop-color="hsl(var(--accent-bright))" stop-opacity="1" />
          <stop offset="100%" stop-color="hsl(var(--accent-glow))" stop-opacity="0" />
        </linearGradient>
      </defs>
      <!-- Glow ellipse below horizon -->
      <ellipse cx="600" cy="0" rx="600" ry="400" fill="url(#horizonGlow)" />
      <!-- Horizon line itself -->
      <path
        d="M 0,2 Q 600,-40 1200,2"
        stroke="url(#horizonLine)"
        stroke-width="1.5"
        fill="none"
      />
      <!-- Inner faint arc -->
      <path
        d="M 100,30 Q 600,-12 1100,30"
        stroke="hsl(var(--accent-glow))"
        stroke-width="0.8"
        stroke-opacity="0.4"
        fill="none"
      />
    </svg>

    <!-- Layer 7: Concentric pulsing rings -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-glow/15"
        style="width: 600px; height: 600px; animation: pulseRing 6s ease-in-out infinite;"
      />
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-glow/10"
        style="width: 900px; height: 900px; animation: pulseRing 6s ease-in-out 2s infinite;"
      />
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-glow/8"
        style="width: 1200px; height: 1200px; animation: pulseRing 6s ease-in-out 4s infinite;"
      />
    </div>

    <!-- Layer 8: Vertical light rays from horizon -->
    <div class="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none overflow-hidden">
      <div
        class="absolute bottom-0 left-1/4 w-px h-full opacity-30"
        style="background: linear-gradient(to top, hsl(var(--accent-bright)), transparent);"
      />
      <div
        class="absolute bottom-0 left-1/2 w-px h-full opacity-50"
        style="background: linear-gradient(to top, hsl(var(--accent-bright)), transparent);"
      />
      <div
        class="absolute bottom-0 left-3/4 w-px h-full opacity-30"
        style="background: linear-gradient(to top, hsl(var(--accent-bright)), transparent);"
      />
    </div>

    <!-- Layer 9: Bottom fade to next section -->
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg-base" />

    <!-- Content -->
    <div class="relative container-tight text-center space-y-8 pb-12">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.85 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 1000 } }"
        class="flex justify-center"
      >
        <div class="relative">
          <!-- Soft glow halo behind logo -->
          <div
            class="absolute inset-0 -m-8 rounded-full blur-2xl bg-accent-glow/30 animate-pulse-glow"
          />
          <InfinityLogoSVG :size="140" class="relative" />
        </div>
      </div>
      <h1
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        class="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight"
      >
        <span class="block text-fg-primary">{{ title1 }}</span>
        <span class="block text-gradient">{{ title2 }}</span>
      </h1>
      <p
        v-if="subtitle"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
        class="text-fg-secondary text-lg md:text-xl max-w-3xl mx-auto"
      >
        {{ subtitle }}
      </p>
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
        class="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      >
        <a :href="primaryCtaHref">
          <Button class="btn-glow text-base px-8 py-4">{{ primaryCtaLabel }}</Button>
        </a>
        <NuxtLink v-if="secondaryCtaTo" :to="secondaryCtaTo">
          <Button variant="outline" class="text-base px-8 py-4 border-accent-glow/50 text-accent-bright hover:bg-accent-glow/10">
            {{ secondaryCtaLabel }}
          </Button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes pulseRing {
  0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(0.95); }
  50%      { opacity: 0.4;  transform: translate(-50%, -50%) scale(1.05); }
}
@media (prefers-reduced-motion: reduce) {
  [style*="pulseRing"] { animation: none !important; }
}
</style>
