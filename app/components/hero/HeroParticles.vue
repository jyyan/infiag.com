<script setup lang="ts">
const props = withDefaults(defineProps<{
  count?: number
  color?: string
}>(), {
  count: 60,
  color: '#4dd0ff',
})

const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0

interface Particle {
  x: number; y: number; vx: number; vy: number; r: number; a: number
}

function start() {
  if (!canvas.value) return
  const c = canvas.value
  const ctx = c.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  function resize() {
    if (!c) return
    c.width = c.clientWidth * dpr
    c.height = c.clientHeight * dpr
  }
  resize()
  window.addEventListener('resize', resize)

  const particles: Particle[] = Array.from({ length: props.count }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    a: Math.random() * 0.5 + 0.2,
  }))

  function tick() {
    if (!ctx || !c) return
    ctx.clearRect(0, 0, c.width, c.height)
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > c.width) p.vx *= -1
      if (p.y < 0 || p.y > c.height) p.vy *= -1
      ctx.beginPath()
      ctx.fillStyle = `rgba(77, 208, 255, ${p.a})`
      ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2)
      ctx.fill()
    }
    raf = requestAnimationFrame(tick)
  }
  tick()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  start()
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>
