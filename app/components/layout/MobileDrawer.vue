<script setup lang="ts">
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle,
} from '~/components/ui/sheet'

const { t } = useI18n()
const localePath = useLocalePath()
const open = ref(false)

const items = computed(() => [
  { to: localePath('/'),            label: t('nav.home') },
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
  <Sheet v-model:open="open">
    <SheetTrigger
      class="lg:hidden p-2 rounded-md text-fg-primary
             hover:bg-bg-elevated transition-colors"
      aria-label="Open menu"
    >
      <Icon name="lucide:menu" class="w-6 h-6" />
    </SheetTrigger>
    <SheetContent side="right" class="bg-bg-base border-border-subtle">
      <SheetHeader>
        <SheetTitle class="text-glow">{{ t('site.name') }}</SheetTitle>
      </SheetHeader>
      <nav class="mt-8 flex flex-col gap-1">
        <NuxtLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="px-4 py-3 rounded-lg text-fg-secondary hover:text-accent-bright
                 hover:bg-bg-elevated transition-colors"
          active-class="text-accent-bright bg-bg-elevated"
          @click="open = false"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </SheetContent>
  </Sheet>
</template>
