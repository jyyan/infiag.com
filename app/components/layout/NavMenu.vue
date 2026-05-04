<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const items = computed(() => [
  { to: localePath('/'),              label: t('nav.lumi'),    hashAnchor: false },
  { to: localePath('/') + '#roadmap', label: t('nav.roadmap'), hashAnchor: true  },
  { to: localePath('/about'),         label: t('nav.about'),   hashAnchor: false },
  { to: localePath('/investors'),     label: t('nav.investors'), hashAnchor: false },
])

const businessItems = computed(() => [
  { to: localePath('/platform'),    label: t('nav.platform') },
  { to: localePath('/partners'),    label: t('nav.partners') },
  { to: localePath('/solutions'),   label: t('nav.solutions') },
  { to: localePath('/developers'),  label: t('nav.developers') },
])
</script>

<template>
  <nav class="hidden md:flex items-center gap-1">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="px-3 py-2 text-sm text-fg-secondary hover:text-lumi-pink
             transition-colors relative
             after:absolute after:left-3 after:right-3 after:bottom-1
             after:h-px after:bg-lumi-purple after:scale-x-0
             hover:after:scale-x-100 after:transition-transform"
      :active-class="item.hashAnchor ? '' : 'text-lumi-pink after:scale-x-100'"
    >
      {{ item.label }}
    </NuxtLink>

    <div class="relative group">
      <button
        type="button"
        class="px-3 py-2 text-sm text-fg-secondary group-hover:text-accent-bright
               focus-visible:text-accent-bright focus-visible:outline-none
               transition-colors inline-flex items-center gap-1"
        aria-haspopup="true"
      >
        {{ t('nav.for_business') }}
        <Icon name="lucide:chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
      </button>
      <div
        class="absolute right-0 top-full pt-2
               opacity-0 invisible
               group-hover:opacity-100 group-hover:visible
               group-focus-within:opacity-100 group-focus-within:visible
               transition-all duration-150 z-50"
      >
        <div class="min-w-[180px] rounded-md border border-border-subtle bg-bg-elevated shadow-xl py-1">
          <NuxtLink
            v-for="biz in businessItems"
            :key="biz.to"
            :to="biz.to"
            class="block px-4 py-2 text-sm text-fg-secondary hover:text-accent-bright hover:bg-bg-glass transition-colors"
          >
            {{ biz.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
