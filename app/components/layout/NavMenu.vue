<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const items = computed(() => [
  { to: localePath('/about'),       label: t('nav.about') },
  { to: localePath('/platform'),    label: t('nav.platform') },
  { to: localePath('/solutions'),   label: t('nav.solutions') },
  { to: localePath('/partners'),    label: t('nav.partners') },
  { to: localePath('/developers'),  label: t('nav.developers') },
  { to: localePath('/investors'),   label: t('nav.investors') },
  { to: localePath('/contact'),     label: t('nav.contact') },
])
</script>

<template>
  <nav class="hidden lg:flex items-center gap-1">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="px-3 py-2 text-sm text-fg-secondary hover:text-accent-bright
             transition-colors relative
             after:absolute after:left-3 after:right-3 after:bottom-1
             after:h-px after:bg-accent-glow after:scale-x-0
             hover:after:scale-x-100 after:transition-transform"
      active-class="text-accent-bright after:scale-x-100"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>
