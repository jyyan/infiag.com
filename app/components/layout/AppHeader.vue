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
      <NuxtLink :to="localePath('/')" class="flex items-center group">
        <img
          src="/logo-header.png"
          :alt="t('site.name')"
          width="768"
          height="187"
          class="h-9 sm:h-10 w-auto transition-opacity group-hover:opacity-90"
        />
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
