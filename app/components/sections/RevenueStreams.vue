<script setup lang="ts">
type Stream = {
  share: string
  title: string
  amount: string
  lines: string[]
  icon: string
}

defineProps<{
  title: string
  subtitle: string
  streams: Stream[]
  arrLabel: string
  arrValue: string
  grossMarginLabel: string
  grossMarginValue: string
  closingNote: string
}>()
</script>

<template>
  <section class="py-20 lg:py-24">
    <div class="container-tight">
      <div class="text-center mb-12 lg:mb-16 space-y-4">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient"
        >
          {{ title }}
        </h2>
        <p class="text-fg-secondary text-base md:text-lg">{{ subtitle }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
        <FadeInUp v-for="(s, i) in streams" :key="s.title" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full flex flex-col gap-4">
            <div class="flex items-baseline justify-between">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center border border-lumi-purple/30"
                style="background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.18), hsl(var(--lumi-pink) / 0.18));"
              >
                <Icon :name="`lucide:${s.icon}`" class="w-6 h-6 text-lumi-pink" />
              </div>
              <div class="text-4xl lg:text-5xl font-display font-bold text-lumi-gradient">{{ s.share }}</div>
            </div>
            <h3 class="text-xl font-display font-bold text-fg-primary">{{ s.title }}</h3>
            <p class="text-2xl font-display font-bold text-lumi-pink">{{ s.amount }}</p>
            <ul class="space-y-1 text-sm text-fg-secondary leading-relaxed">
              <li v-for="line in s.lines" :key="line" class="flex gap-2">
                <span class="text-lumi-pink mt-1">·</span>
                <span>{{ line }}</span>
              </li>
            </ul>
          </div>
        </FadeInUp>
      </div>

      <FadeInUp :delay="100">
        <div class="rounded-2xl border border-lumi-pink/40 bg-bg-glass backdrop-blur-glass p-8 lg:p-10 text-center max-w-3xl mx-auto">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted mb-3">
            {{ arrLabel }}
          </p>
          <div class="flex items-baseline justify-center gap-6 lg:gap-10 flex-wrap">
            <div class="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-lumi-gradient">
              {{ arrValue }}
            </div>
            <div class="font-mono text-sm uppercase tracking-wider text-fg-muted">·</div>
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">{{ grossMarginLabel }}</p>
              <p class="text-3xl md:text-4xl font-display font-bold text-lumi-pink">{{ grossMarginValue }}</p>
            </div>
          </div>
          <p class="text-fg-secondary text-sm mt-4 italic">{{ closingNote }}</p>
        </div>
      </FadeInUp>
    </div>
  </section>
</template>
