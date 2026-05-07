<script setup lang="ts">
defineProps<{
  eyebrow: string
  b1Role: string
  b2Role: string
  b3Role: string
  headline: string
}>()

const backers = [
  { name: 'Blackwell Global', logo: '/img/backers/blackwell.jpeg', dark: false, role: 'b1Role' as const, maxW: '78%', maxH: '110px' },
  { name: 'Eongen', logo: '/img/backers/eongen.png', dark: false, role: 'b2Role' as const, maxW: '70%', maxH: '92px' },
  { name: 'Marvel Capital 万丰资本', logo: '/img/backers/marvel.png', dark: true, role: 'b3Role' as const, maxW: '94%', maxH: '150px' },
]
</script>

<template>
  <section class="py-12 lg:py-16">
    <div class="container-tight">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink text-center mb-8">
        {{ eyebrow }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto">
        <FadeInUp v-for="(b, i) in backers" :key="b.name" :delay="i * 100">
          <div
            class="rounded-2xl p-6 lg:p-7 min-h-[220px] flex flex-col items-center justify-center gap-4 shadow-lg"
            :class="b.dark ? 'bg-[#0A1428]' : 'bg-white'"
          >
            <div class="flex-1 flex items-center justify-center w-full">
              <img
                :src="b.logo"
                :alt="b.name"
                class="object-contain"
                :style="{ maxWidth: b.maxW, maxHeight: b.maxH }"
                loading="lazy"
              />
            </div>
            <div
              class="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-center"
              :class="b.dark ? 'text-slate-400' : 'text-slate-500'"
            >
              {{ b.role === 'b1Role' ? b1Role : b.role === 'b2Role' ? b2Role : b3Role }}
            </div>
          </div>
        </FadeInUp>
      </div>
      <p class="text-center text-fg-secondary text-sm md:text-base mt-8 max-w-3xl mx-auto leading-relaxed">
        {{ headline }}
      </p>
    </div>
  </section>
</template>
