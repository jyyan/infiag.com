<script setup lang="ts">
import type { FounderView } from '~/composables/useFounders'

const props = withDefaults(defineProps<{
  founder: FounderView
  variant?: 'compact' | 'full'
}>(), { variant: 'full' })

const isCompact = computed(() => props.variant === 'compact')
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    class="glass-card group flex flex-col"
    :class="isCompact ? 'p-5 lg:p-6 space-y-4' : 'p-6 lg:p-8 space-y-5'"
  >
    <!-- Photo + name header -->
    <div class="flex items-start gap-4">
      <div
        class="shrink-0 rounded-2xl overflow-hidden border border-border-subtle group-hover:border-accent-glow/50 group-hover:shadow-glow-sm transition-all bg-bg-elevated"
        :class="isCompact ? 'w-16 h-16' : 'w-20 h-20 lg:w-24 lg:h-24'"
      >
        <img
          :src="founder.photo"
          :alt="`${founder.english} · ${founder.chinese}`"
          loading="lazy"
          :style="{ objectPosition: founder.photoPosition }"
          class="w-full h-full object-cover"
        >
      </div>
      <div class="flex-1 min-w-0 space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-[10px] uppercase tracking-widest text-accent-bright font-mono px-2 py-0.5 rounded border border-accent-glow/40 bg-accent-glow/5">
            {{ founder.role }}
          </span>
        </div>
        <h3 class="font-display font-bold leading-tight" :class="isCompact ? 'text-lg' : 'text-xl lg:text-2xl'">
          {{ founder.english }}
          <span class="text-fg-secondary font-normal">· {{ founder.chinese }}</span>
        </h3>
        <p class="text-xs lg:text-sm text-fg-secondary">{{ founder.title }}</p>
      </div>
    </div>

    <!-- Slogan -->
    <p
      class="italic text-fg-secondary border-l-2 border-accent-glow/40 pl-3"
      :class="isCompact ? 'text-sm' : 'text-sm lg:text-base'"
    >
      {{ founder.slogan }}
    </p>

    <!-- Full-mode body -->
    <template v-if="!isCompact">
      <ul class="space-y-2">
        <li
          v-for="h in founder.highlights"
          :key="h"
          class="text-sm text-fg-secondary leading-relaxed flex gap-2"
        >
          <Icon name="lucide:check" class="w-4 h-4 mt-0.5 shrink-0 text-accent-bright" />
          <span>{{ h }}</span>
        </li>
      </ul>

      <div class="flex flex-wrap gap-1.5 pt-1">
        <span
          v-for="s in founder.specialties"
          :key="s"
          class="text-[11px] px-2 py-1 rounded-full bg-bg-elevated border border-border-subtle text-fg-secondary"
        >
          {{ s }}
        </span>
      </div>

      <div class="flex-1" />

      <a
        :href="founder.link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-sm text-accent-bright hover:gap-2.5 transition-all font-medium pt-2 border-t border-border-subtle/50"
      >
        <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
        <span>{{ $t('founders.profile_link') }}</span>
      </a>
    </template>
  </div>
</template>
