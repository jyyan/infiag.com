<script setup lang="ts">
const props = withDefaults(defineProps<{
  count?: number
  color?: string
}>(), {
  count: 100,
  color: '#4dd0ff',
})

const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number          // base radius
  a: number          // base opacity
  twinkle: number    // twinkle phase
  twinkleSpeed: number
  type: 'dust' | 'star' | 'bright'
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

  // Mix three classes for visual depth.
  const particles: Particle[] = Array.from({ length: props.count }, () => {
    const r = Math.random()
    let type: Particle['type'] = 'dust'
    let radius = Math.random() * 1.2 + 0.4
    let opacity = Math.random() * 0.4 + 0.3
    if (r > 0.85) {
      type = 'bright'
      radius = Math.random() * 2 + 2
      opacity = Math.random() * 0.3 + 0.7
    } else if (r > 0.5) {
      type = 'star'
      radius = Math.random() * 1.4 + 1
      opacity = Math.random() * 0.4 + 0.55
    }
    return {
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: radius,
      a: opacity,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.005 + Math.random() * 0.025,
      type,
    }
  })

  function tick() {
    if (!ctx || !c) return
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.globalCompositeOperation = 'lighter'  // additive — makes particles glow brighter where they overlap

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > c.width) p.vx *= -1
      if (p.y < 0 || p.y > c.height) p.vy *= -1

      // Twinkle: opacity oscillates over time.
      p.twinkle += p.twinkleSpeed
      const flicker = (Math.sin(p.twinkle) + 1) / 2
      const alpha = p.a * (0.5 + flicker * 0.6)
      const size = p.r * dpr * (0.85 + flicker * 0.3)

      if (p.type === 'bright') {
        // Bright: large halo + cross flare + bright core
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 7)
        halo.addColorStop(0, `rgba(170, 235, 255, ${alpha * 0.95})`)
        halo.addColorStop(0.35, `rgba(77, 208, 255, ${alpha * 0.45})`)
        halo.addColorStop(1, 'rgba(77, 208, 255, 0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 7, 0, Math.PI * 2)
        ctx.fill()

        // Cross flare
        ctx.strokeStyle = `rgba(200, 245, 255, ${alpha * 0.8})`
        ctx.lineWidth = 0.8 * dpr
        ctx.beginPath()
        ctx.moveTo(p.x - size * 5, p.y)
        ctx.lineTo(p.x + size * 5, p.y)
        ctx.moveTo(p.x, p.y - size * 5)
        ctx.lineTo(p.x, p.y + size * 5)
        ctx.stroke()

        // Bright core
        ctx.fillStyle = `rgba(230, 250, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.type === 'star') {
        // Star: small halo + core
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4)
        halo.addColorStop(0, `rgba(140, 225, 255, ${alpha * 0.6})`)
        halo.addColorStop(1, 'rgba(140, 225, 255, 0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(200, 245, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Dust: solid dot
        ctx.fillStyle = `rgba(140, 215, 245, ${alpha * 0.85})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.globalCompositeOperation = 'source-over'
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
