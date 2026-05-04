<script setup lang="ts">
type Item = { icon: string; title: string; desc: string }

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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FadeInUp v-for="(item, i) in items" :key="item.title" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full space-y-4 group hover:border-lumi-purple/40 transition-colors">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center
                     border border-lumi-purple/30
                     group-hover:shadow-lumi-glow transition-shadow"
              style="background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.18), hsl(var(--lumi-pink) / 0.18));"
            >
              <Icon :name="`lucide:${item.icon}`" class="w-6 h-6 text-lumi-pink" />
            </div>
            <h3 class="text-xl font-display font-bold text-fg-primary">{{ item.title }}</h3>
            <p class="text-fg-secondary leading-relaxed">{{ item.desc }}</p>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
