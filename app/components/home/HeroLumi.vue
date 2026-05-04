<script setup lang="ts">
import { Button } from '~/components/ui/button'

defineProps<{
  tagline: string
  title: string
  desc: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaTo: string
}>()
</script>

<template>
  <section class="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
    <!-- Layer 1: deep base -->
    <div class="absolute inset-0 bg-bg-deep" />

    <!-- Layer 2: LUMI radial halo -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 70% 55% at 50% 55%, hsl(var(--lumi-purple) / 0.45) 0%, hsl(var(--lumi-pink) / 0.18) 35%, transparent 70%);"
    />

    <!-- Layer 3: header fade -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-deep to-transparent" />

    <!-- Layer 4: tech grid (subtle) -->
    <div class="absolute inset-0 grid-tech opacity-20" />

    <!-- Layer 5: pulsing rings (cyan to keep continuity with site) -->
    <div class="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-lumi-purple/20"
        style="width: 520px; height: 520px; animation: lumiPulseRing 6s ease-in-out infinite;"
      />
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-lumi-pink/15"
        style="width: 800px; height: 800px; animation: lumiPulseRing 6s ease-in-out 2s infinite;"
      />
      <div
        class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-lumi-purple/10"
        style="width: 1100px; height: 1100px; animation: lumiPulseRing 6s ease-in-out 4s infinite;"
      />
    </div>

    <!-- Layer 6: bottom fade to next section -->
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg-base" />

    <!-- Content -->
    <div class="relative container-tight text-center pb-12">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.85 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 1100 } }"
        class="flex justify-center mb-6"
      >
        <div class="relative">
          <!-- LUMI character with soft halo -->
          <div
            class="absolute inset-0 -m-12 rounded-full blur-3xl bg-lumi-purple/40"
            style="animation: lumiBreath 4s ease-in-out infinite;"
          />
          <NuxtImg
            src="/img/lumi/lumi-hero.png"
            alt="LUMI"
            width="240"
            height="240"
            class="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
            style="animation: lumiFloat 6s ease-in-out infinite;"
            preload
          />
        </div>
      </div>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
        class="font-mono text-sm md:text-base uppercase tracking-[0.3em] text-lumi-pink mb-4"
      >
        {{ tagline }}
      </p>

      <h1
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
        class="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight"
      >
        <span class="block text-lumi-gradient">{{ title }}</span>
      </h1>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }"
        class="text-fg-secondary text-base md:text-lg lg:text-xl max-w-3xl mx-auto mt-6 leading-relaxed"
      >
        {{ desc }}
      </p>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 800 } }"
        class="flex flex-col sm:flex-row gap-4 justify-center pt-8"
      >
        <a :href="primaryCtaHref">
          <Button class="btn-lumi text-base px-8 py-4">{{ primaryCtaLabel }}</Button>
        </a>
        <NuxtLink :to="secondaryCtaTo">
          <Button variant="outline" class="text-base px-8 py-4 border-lumi-purple/50 text-lumi-pink hover:bg-lumi-purple/10">
            {{ secondaryCtaLabel }}
          </Button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes lumiPulseRing {
  0%, 100% { opacity: 0.18; transform: translate(-50%, -50%) scale(0.96); }
  50%      { opacity: 0.45; transform: translate(-50%, -50%) scale(1.04); }
}
@keyframes lumiFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
@keyframes lumiBreath {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 0.85; }
}
@media (prefers-reduced-motion: reduce) {
  [style*="lumiPulseRing"], [style*="lumiFloat"], [style*="lumiBreath"] { animation: none !important; }
}
</style>
