<script setup lang="ts">
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '~/components/ui/dropdown-menu'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLabel = computed(() => {
  const found = locales.value.find(l => (typeof l === 'object' ? l.code : l) === locale.value)
  return typeof found === 'object' ? found?.code.toUpperCase() : locale.value.toUpperCase()
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="px-3 py-1.5 rounded-md text-sm font-mono uppercase
             text-fg-secondary hover:text-accent-bright
             border border-border-subtle hover:border-accent-glow/50
             transition-colors"
    >
      {{ currentLabel }}
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="glass">
      <DropdownMenuItem
        v-for="loc in locales"
        :key="typeof loc === 'object' ? loc.code : loc"
        as-child
      >
        <NuxtLink
          :to="switchLocalePath(typeof loc === 'object' ? loc.code : loc)"
          class="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <span class="font-mono text-xs uppercase">{{ typeof loc === 'object' ? loc.code : loc }}</span>
          <span>{{ typeof loc === 'object' ? loc.name : loc }}</span>
        </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
