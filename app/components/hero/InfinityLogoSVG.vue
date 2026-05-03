<script setup lang="ts">
withDefaults(defineProps<{ size?: number; animated?: boolean }>(), {
  size: 120,
  animated: true,
})
</script>

<template>
  <svg
    :width="size"
    :height="size / 2"
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="overflow-visible"
  >
    <defs>
      <linearGradient id="infGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="hsl(var(--accent-glow))" />
        <stop offset="100%" stop-color="hsl(var(--accent-bright))" />
      </linearGradient>
      <filter id="infBlur">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
    <!-- Glow underlay -->
    <path
      d="M50,50 C50,30 70,30 100,50 C130,70 150,70 150,50 C150,30 130,30 100,50 C70,70 50,70 50,50 Z"
      stroke="url(#infGlow)"
      stroke-width="6"
      filter="url(#infBlur)"
      opacity="0.6"
    />
    <!-- Main stroke (animated) -->
    <path
      d="M50,50 C50,30 70,30 100,50 C130,70 150,70 150,50 C150,30 130,30 100,50 C70,70 50,70 50,50 Z"
      stroke="url(#infGlow)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-dasharray="400"
      :class="animated ? 'animate-draw-line' : ''"
      :stroke-dashoffset="animated ? undefined : 0"
    />
  </svg>
</template>
