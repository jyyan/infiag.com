<script setup lang="ts">
type Scenario = { quote: string; cause: string }

defineProps<{
  scenarios: Scenario[]
  closing: string
}>()
</script>

<template>
  <section class="pb-20 lg:pb-28 -mt-8 lg:-mt-12">
    <div class="container-tight">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        <FadeInUp
          v-for="(s, i) in scenarios"
          :key="i"
          :delay="i * 80"
        >
          <div class="glass-card p-5 lg:p-6 h-full flex flex-col gap-3 hover:border-lumi-purple/50 transition-colors">
            <p
              class="text-fg-primary text-sm md:text-base leading-relaxed"
              v-html="s.quote"
            />
            <p class="text-xs text-fg-muted tracking-wide mt-auto">
              {{ s.cause }}
            </p>
          </div>
        </FadeInUp>
      </div>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
        class="text-center text-fg-secondary text-base md:text-lg max-w-3xl mx-auto mt-12 lg:mt-14 leading-relaxed"
      >
        {{ closing }}
      </p>
    </div>
  </section>
</template>

<style scoped>
:deep(b) {
  color: hsl(var(--accent-bright, 199 89% 48%));
  font-weight: 600;
}
</style>
