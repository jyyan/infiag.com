<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'

const props = withDefaults(defineProps<{
  text: string
  speed?: number
  startDelay?: number
}>(), {
  speed: 60,
  startDelay: 0,
})

const root = ref<HTMLElement | null>(null)
const visible = useElementVisibility(root)
const shown = ref('')
let started = false

watch(visible, (v) => {
  if (!v || started) return
  started = true
  setTimeout(() => {
    let i = 0
    const tick = () => {
      shown.value = props.text.slice(0, ++i)
      if (i < props.text.length) setTimeout(tick, props.speed)
    }
    tick()
  }, props.startDelay)
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = props.text
    started = true
  }
})
</script>

<template>
  <span ref="root">{{ shown }}<span v-if="shown.length < text.length" class="inline-block w-0.5 h-[1em] bg-accent-bright align-middle ml-0.5 animate-pulse" /></span>
</template>
