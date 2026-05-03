<script setup lang="ts">
defineProps<{
  to: string
  icon: string
  title: string
  tagline: string
  description: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
    class="group relative block overflow-hidden rounded-2xl
           glass border border-border-subtle hover:border-accent-glow/50
           transition-all duration-500
           hover:shadow-glow hover:-translate-y-1"
  >
    <div class="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div class="relative p-8 lg:p-10 space-y-6">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-bg-elevated flex items-center justify-center
                    border border-accent-glow/30 group-hover:shadow-glow transition-shadow">
          <Icon :name="`lucide:${icon}`" class="w-7 h-7 text-accent-bright" />
        </div>
        <span class="font-mono text-xs uppercase text-accent-bright">{{ tagline }}</span>
      </div>
      <h3 class="text-2xl lg:text-3xl font-display font-bold group-hover:text-glow transition-colors">
        {{ title }}
      </h3>
      <p class="text-fg-secondary leading-relaxed">{{ description }}</p>
      <div class="flex items-center gap-2 text-accent-bright text-sm font-medium pt-2
                  group-hover:gap-3 transition-all">
        <span>了解更多</span>
        <Icon name="lucide:arrow-right" class="w-4 h-4" />
      </div>
    </div>
  </NuxtLink>
</template>
