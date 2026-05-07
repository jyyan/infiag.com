<script setup lang="ts">
const props = defineProps<{
  label: string
  title: string
  quote: string
  bodyP1: string
  bodyP2: string
  tagline: string
}>()

const titleParts = computed(() => {
  const m = props.title.match(/^(.+?(?:——|—))(.+)$/)
  return m ? ([m[1], m[2]] as const) : ([props.title, ''] as const)
})
</script>

<template>
  <section class="py-24 lg:py-32 relative overflow-hidden">
    <div class="absolute inset-0 grid-tech opacity-15 pointer-events-none" />
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lumi-purple/40 to-transparent" />

    <div class="container-tight relative">
      <div class="max-w-3xl mx-auto">
        <p
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-lumi-pink/80 mb-6 text-center"
        >
          {{ label }}
        </p>

        <h2
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
          class="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-12 text-fg-primary text-balance"
        ><span class="inline-block">{{ titleParts[0] }}</span><span v-if="titleParts[1]" class="inline-block">{{ titleParts[1] }}</span></h2>

        <blockquote
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }"
          class="border-l-2 border-lumi-purple pl-6 md:pl-8 my-10"
        >
          <p class="text-xl md:text-2xl lg:text-3xl font-display italic text-lumi-gradient leading-snug">
            {{ quote }}
          </p>
        </blockquote>

        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 300 } }"
          class="space-y-6 text-fg-secondary text-base md:text-lg leading-relaxed"
        >
          <p>{{ bodyP1 }}</p>
          <p class="text-fg-primary font-medium">{{ bodyP2 }}</p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 500 } }"
          class="mt-12 p-6 lg:p-8 rounded-2xl border border-lumi-purple/30 bg-lumi-purple/5"
        >
          <p class="text-lg md:text-xl text-fg-primary leading-relaxed">
            <span class="text-lumi-glow font-semibold">LUMI</span>{{ tagline.replace(/^LUMI\s*/, ' ') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
