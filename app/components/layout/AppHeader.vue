<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { useScroll } from '@vueuse/core'

const { t } = useI18n()
const localePath = useLocalePath()
const { y } = useScroll(import.meta.client ? window : null)
const scrolled = computed(() => y.value > 80)
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'glass border-b border-border-subtle py-2'
      : 'bg-transparent py-4'"
  >
    <div class="container-tight flex items-center justify-between gap-4">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group">
        <span class="text-2xl font-display text-glow group-hover:text-accent-bright transition-colors">∞</span>
        <span class="font-display font-bold text-lg hidden sm:inline">
          {{ t('site.name') }}
        </span>
      </NuxtLink>

      <NavMenu />

      <div class="flex items-center gap-2">
        <NuxtLink :to="localePath('/contact')" class="hidden sm:inline-flex">
          <Button class="btn-glow text-sm py-2 px-4">
            {{ t('cta.contact') }}
          </Button>
        </NuxtLink>
        <LangSwitcher />
        <MobileDrawer />
      </div>
    </div>
  </header>
</template>
