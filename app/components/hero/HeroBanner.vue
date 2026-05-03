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
  backgroundImage?: string
}>()
</script>

<template>
  <section class="relative min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
    <!-- Background image (banner crop) -->
    <div
      v-if="backgroundImage"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    />
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-bg-deep/80 via-bg-base/60 to-bg-base" />
    <!-- Particle layer -->
    <HeroParticles class="absolute inset-0" />
    <!-- Tech grid -->
    <div class="absolute inset-0 grid-tech opacity-40" />

    <!-- Content -->
    <div class="relative container-tight text-center space-y-8">
      <div class="flex justify-center">
        <InfinityLogoSVG :size="100" />
      </div>
      <h1
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight"
      >
        <span class="block text-fg-primary">{{ title1 }}</span>
        <span class="block text-gradient">{{ title2 }}</span>
      </h1>
      <p
        v-if="subtitle"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        class="text-fg-secondary text-lg md:text-xl max-w-3xl mx-auto"
      >
        {{ subtitle }}
      </p>
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
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
