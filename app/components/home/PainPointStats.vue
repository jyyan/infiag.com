<script setup lang="ts">
type Item = { stat: string; label: string; desc: string; icon: string }

defineProps<{
  title: string
  subtitle: string
  items: Item[]
}>()
</script>

<template>
  <section class="py-20 lg:py-28 grid-tech">
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
        <FadeInUp v-for="(item, i) in items" :key="item.label" :delay="i * 100">
          <div class="glass-card p-6 lg:p-7 h-full space-y-4 group hover:border-lumi-purple/50 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center border border-lumi-purple/30 group-hover:shadow-lumi-glow transition-shadow">
                <Icon :name="`lucide:${item.icon}`" class="w-5 h-5 text-lumi-pink" />
              </div>
            </div>
            <div class="text-4xl lg:text-5xl font-display font-bold text-lumi-gradient">
              {{ item.stat }}
            </div>
            <div class="text-sm uppercase tracking-wider text-fg-primary">{{ item.label }}</div>
            <p class="text-fg-secondary text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
