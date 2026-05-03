<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  description: string
}>()
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    class="glass-card p-6 lg:p-8 space-y-4 group"
  >
    <div
      v-if="icon"
      class="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center
             border border-border-subtle group-hover:border-accent-glow/50
             group-hover:shadow-glow-sm transition-all"
    >
      <Icon :name="`lucide:${icon}`" class="w-6 h-6 text-accent-bright" />
    </div>
    <h3 class="text-xl font-display font-bold">{{ title }}</h3>
    <p class="text-fg-secondary leading-relaxed">{{ description }}</p>
  </div>
</template>
