<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  variant?: 'default' | 'tight' | 'wide' | 'tech'
}>()
</script>

<template>
  <section
    class="py-20 lg:py-28"
    :class="variant === 'tech' ? 'grid-tech' : ''"
  >
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8"
      :class="{
        'max-w-7xl': !variant || variant === 'default' || variant === 'tech',
        'max-w-5xl': variant === 'tight',
        'max-w-screen-2xl': variant === 'wide',
      }"
    >
      <div v-if="title || subtitle" class="text-center mb-12 lg:mb-16 space-y-4">
        <h2
          v-if="title"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient"
        >
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
          class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto"
        >
          {{ subtitle }}
        </p>
      </div>
      <slot />
    </div>
  </section>
</template>
