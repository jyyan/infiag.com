<script setup lang="ts">
import { useTransition, TransitionPresets, useElementVisibility } from '@vueuse/core'

const props = defineProps<{
  value: number
  label: string
  suffix?: string
  prefix?: string
}>()

const target = ref(0)
const root = ref<HTMLElement | null>(null)
const visible = useElementVisibility(root)
const animated = useTransition(target, {
  duration: 1500,
  transition: TransitionPresets.easeOutCubic,
})

watch(visible, (v) => {
  if (v) target.value = props.value
}, { once: true })
</script>

<template>
  <div ref="root" class="text-center space-y-2">
    <div class="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-glow">
      {{ prefix ?? '' }}{{ Math.round(animated) }}{{ suffix ?? '' }}
    </div>
    <div class="text-fg-secondary text-sm uppercase tracking-wider">{{ label }}</div>
  </div>
</template>
