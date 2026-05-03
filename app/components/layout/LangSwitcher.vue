<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const items = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).map(l => ({
    code: l.code,
    short:
      l.code === 'zh-TW' ? '繁' :
      l.code === 'zh-CN' ? '简' :
      l.code === 'en' ? 'EN' :
      l.code.toUpperCase(),
    name: l.name,
  })),
)
</script>

<template>
  <div
    class="hidden sm:flex items-center gap-0.5 rounded-full border border-border-subtle p-0.5 bg-bg-elevated/40"
    role="group"
    aria-label="Language switcher"
  >
    <NuxtLink
      v-for="loc in items"
      :key="loc.code"
      :to="switchLocalePath(loc.code) || '/'"
      :aria-current="loc.code === locale ? 'true' : undefined"
      :class="[
        'px-3 py-1 rounded-full text-xs font-mono uppercase transition-colors',
        loc.code === locale
          ? 'bg-accent-glow text-bg-deep font-bold shadow-glow-sm'
          : 'text-fg-secondary hover:text-accent-bright hover:bg-bg-elevated',
      ]"
      :title="loc.name"
    >
      {{ loc.short }}
    </NuxtLink>
  </div>

  <!-- Mobile: compact inline pills (also visible on small screens) -->
  <div class="sm:hidden flex items-center gap-0.5 rounded-full border border-border-subtle p-0.5">
    <NuxtLink
      v-for="loc in items"
      :key="loc.code"
      :to="switchLocalePath(loc.code) || '/'"
      :class="[
        'px-2 py-1 rounded-full text-[10px] font-mono uppercase',
        loc.code === locale
          ? 'bg-accent-glow text-bg-deep font-bold'
          : 'text-fg-secondary',
      ]"
    >
      {{ loc.short }}
    </NuxtLink>
  </div>
</template>
