<script setup lang="ts">
withDefaults(defineProps<{ delay?: number; duration?: number; offset?: number }>(), {
  delay: 0,
  duration: 600,
  offset: 24,
})
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: offset }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration, delay } }"
  >
    <slot />
  </div>
</template>
