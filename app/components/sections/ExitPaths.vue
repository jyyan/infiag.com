<script setup lang="ts">
type Exit = {
  code: string
  title: string
  desc: string
}

defineProps<{
  title: string
  subtitle: string
  exits: Exit[]
}>()
</script>

<template>
  <section class="py-20 lg:py-24 grid-tech">
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
        <p class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto">{{ subtitle }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FadeInUp v-for="(e, i) in exits" :key="e.code" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full space-y-4 group hover:border-lumi-purple/40 transition-colors relative">
            <span class="absolute top-4 right-4 font-mono text-2xl text-lumi-purple/40 font-bold">{{ e.code }}</span>
            <h3 class="text-xl font-display font-bold text-fg-primary pr-12">{{ e.title }}</h3>
            <p class="text-fg-secondary leading-relaxed">{{ e.desc }}</p>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
