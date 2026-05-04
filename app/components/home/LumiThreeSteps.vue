<script setup lang="ts">
type Step = { step: string; title: string; desc: string; icon: string }

defineProps<{
  title: string
  subtitle: string
  steps: Step[]
}>()
</script>

<template>
  <section class="py-20 lg:py-28 relative overflow-hidden">
    <!-- LUMI ambient halo behind the steps -->
    <div
      class="absolute left-1/2 top-1/3 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
      style="background: radial-gradient(ellipse at center, hsl(var(--lumi-purple) / 0.18) 0%, transparent 60%);"
    />

    <div class="container-tight relative">
      <div class="text-center mb-14 lg:mb-20 space-y-4">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-lumi-gradient"
        >
          {{ title }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
          class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- Connector line behind cards (desktop only) -->
      <div class="relative">
        <div class="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-lumi-purple/40 to-transparent" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
          <FadeInUp v-for="(s, i) in steps" :key="s.step" :delay="i * 150">
            <div class="text-center px-2">
              <!-- Numbered orb -->
              <div class="relative mx-auto w-24 h-24 mb-6">
                <div class="absolute inset-0 rounded-full bg-gradient-lumi opacity-90 blur-md" />
                <div class="absolute inset-0 rounded-full bg-bg-deep border border-lumi-purple/60 flex items-center justify-center">
                  <Icon :name="`lucide:${s.icon}`" class="w-9 h-9 text-lumi-pink" />
                </div>
                <span class="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-lumi-purple text-bg-deep font-display font-bold text-sm flex items-center justify-center shadow-lumi-glow">
                  {{ s.step }}
                </span>
              </div>

              <h3 class="text-xl lg:text-2xl font-display font-bold mb-3 text-fg-primary">
                {{ s.title }}
              </h3>
              <p class="text-fg-secondary text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                {{ s.desc }}
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </div>
  </section>
</template>
