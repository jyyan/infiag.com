<script setup lang="ts">
type Stream = {
  share: string
  title: string
  desc: string
  detail: string
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
  <section class="py-20 lg:py-28 grid-tech">
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
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
          class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto"
        >
          {{ subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <FadeInUp v-for="(s, i) in streams" :key="s.title" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full flex flex-col gap-4 group hover:border-lumi-purple/40 transition-colors">
            <div class="flex items-baseline justify-between">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center border border-lumi-purple/30 group-hover:shadow-lumi-glow transition-shadow"
                style="background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.18), hsl(var(--lumi-pink) / 0.18));"
              >
                <Icon :name="`lucide:${s.icon}`" class="w-6 h-6 text-lumi-pink" />
              </div>
              <div class="text-4xl lg:text-5xl font-display font-bold text-lumi-gradient">{{ s.share }}</div>
            </div>
            <h3 class="text-xl font-display font-bold text-fg-primary">{{ s.title }}</h3>
            <p class="text-fg-secondary leading-relaxed">{{ s.desc }}</p>
            <p class="text-xs font-mono text-fg-muted leading-relaxed pt-2 border-t border-lumi-purple/15 mt-auto">
              {{ s.detail }}
            </p>
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
