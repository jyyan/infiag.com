<script setup lang="ts">
import { Button } from '~/components/ui/button'

defineProps<{
  title: string
  subtitle?: string
  ctaLabel: string
  ctaHref: string
}>()
</script>

<template>
  <section class="py-20 lg:py-28">
    <div class="container-tight">
      <div
        class="glass-card p-12 lg:p-16 text-center bg-gradient-hero relative overflow-hidden"
      >
        <div class="absolute inset-0 grid-tech opacity-30 pointer-events-none" />
        <div class="relative space-y-6">
          <h3
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-glow"
          >
            {{ title }}
          </h3>
          <p v-if="subtitle" class="text-fg-secondary text-lg max-w-2xl mx-auto">
            {{ subtitle }}
          </p>
          <a :href="ctaHref" class="inline-block">
            <Button class="btn-glow text-base px-8 py-4">{{ ctaLabel }}</Button>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
