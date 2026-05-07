<script setup lang="ts">
defineProps<{
  eyebrowMission: string
  mission: string
  eyebrowValue: string
  value: string
}>()
</script>

<template>
  <section class="py-12 lg:py-14 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-lumi-purple/8 via-lumi-pink/6 to-lumi-purple/8" />
    <div class="absolute inset-0 grid-tech opacity-30 pointer-events-none" />
    <div class="container-tight relative">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
        <FadeInUp :delay="0">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink mb-2">
            {{ eyebrowMission }}
          </p>
          <p class="text-xl md:text-2xl lg:text-3xl font-display font-bold text-fg-primary leading-tight">
            {{ mission }}
          </p>
        </FadeInUp>
        <FadeInUp :delay="120">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink mb-2 md:text-right">
            {{ eyebrowValue }}
          </p>
          <p class="text-xl md:text-2xl lg:text-3xl font-display font-bold text-lumi-gradient md:text-right">
            {{ value }}
          </p>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
