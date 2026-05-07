<script setup lang="ts">
type KPI = { stat: string; label: string; desc: string; icon: string }
type Country = { name: string; c2020: string; c2030: string; c2050: string }

defineProps<{
  eyebrowMacro: string
  title: string
  subtitle: string
  kpis: KPI[]
  apacTitle: string
  apacSourceNote: string
  headerCountry: string
  header2020: string
  header2030: string
  header2050Share: string
  countries: Country[]
}>()
</script>

<template>
  <section class="py-20 lg:py-28 grid-tech">
    <div class="container-tight">
      <div class="text-center mb-12 lg:mb-16 space-y-4">
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink">
          {{ eyebrowMacro }}
        </p>
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

      <!-- 4 KPIs -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-16 lg:mb-20">
        <FadeInUp v-for="(item, i) in kpis" :key="item.label" :delay="i * 100">
          <div class="glass-card p-6 lg:p-7 h-full space-y-4 group hover:border-lumi-purple/50 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center border border-lumi-purple/30 group-hover:shadow-lumi-glow transition-shadow">
                <Icon :name="`lucide:${item.icon}`" class="w-5 h-5 text-lumi-pink" />
              </div>
            </div>
            <div class="text-4xl lg:text-5xl font-display font-bold text-lumi-gradient">
              {{ item.stat }}
            </div>
            <div class="text-sm uppercase tracking-wider text-fg-primary">{{ item.label }}</div>
            <p class="text-fg-secondary text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </FadeInUp>
      </div>

      <!-- APAC country table -->
      <FadeInUp :delay="0">
        <div class="rounded-2xl border border-lumi-purple/30 bg-bg-glass backdrop-blur-glass p-6 lg:p-10">
          <h3 class="text-xl md:text-2xl font-display font-bold text-fg-primary text-center mb-6">
            {{ apacTitle }}
          </h3>

          <!-- Desktop: full table -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-sm lg:text-base">
              <thead>
                <tr class="border-b border-lumi-purple/30 text-fg-muted font-mono uppercase tracking-wider text-xs">
                  <th class="text-left py-3 px-3">{{ headerCountry }}</th>
                  <th class="text-right py-3 px-3">{{ header2020 }}</th>
                  <th class="text-right py-3 px-3">{{ header2030 }}</th>
                  <th class="text-right py-3 px-3">{{ header2050Share }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="c in countries"
                  :key="c.name"
                  class="border-b border-lumi-purple/10 hover:bg-lumi-purple/5 transition-colors"
                  :class="c.name.includes('合計') || c.name.includes('合计') || c.name === 'SEA total' ? 'font-bold text-lumi-pink' : 'text-fg-secondary'"
                >
                  <td class="py-3 px-3">{{ c.name }}</td>
                  <td class="py-3 px-3 text-right">{{ c.c2020 }}</td>
                  <td class="py-3 px-3 text-right">{{ c.c2030 }}</td>
                  <td class="py-3 px-3 text-right">{{ c.c2050 }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile: stacked cards -->
          <div class="md:hidden space-y-3">
            <div
              v-for="c in countries"
              :key="c.name"
              class="rounded-xl border border-lumi-purple/20 p-4 bg-bg-elevated/30"
              :class="c.name.includes('合計') || c.name.includes('合计') || c.name === 'SEA total' ? 'border-lumi-pink/40' : ''"
            >
              <div class="font-display font-bold text-fg-primary mb-2">{{ c.name }}</div>
              <div class="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p class="text-fg-muted uppercase tracking-wider mb-1">{{ header2020 }}</p>
                  <p class="text-fg-secondary">{{ c.c2020 }}</p>
                </div>
                <div>
                  <p class="text-fg-muted uppercase tracking-wider mb-1">{{ header2030 }}</p>
                  <p class="text-fg-secondary">{{ c.c2030 }}</p>
                </div>
                <div>
                  <p class="text-fg-muted uppercase tracking-wider mb-1">{{ header2050Share }}</p>
                  <p class="text-lumi-pink">{{ c.c2050 }}</p>
                </div>
              </div>
            </div>
          </div>

          <p class="text-xs text-fg-muted italic text-center mt-6">
            {{ apacSourceNote }}
          </p>
        </div>
      </FadeInUp>
    </div>
  </section>
</template>
