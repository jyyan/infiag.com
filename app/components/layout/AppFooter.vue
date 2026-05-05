<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { contactEmail } = useMailto()

const sitemap = computed(() => [
  { to: localePath('/about'),       label: t('nav.about') },
  { to: localePath('/platform'),    label: t('nav.platform') },
  { to: localePath('/solutions'),   label: t('nav.solutions') },
  { to: localePath('/partners'),    label: t('nav.partners') },
  { to: localePath('/developers'),  label: t('nav.developers') },
  { to: localePath('/investors'),   label: t('nav.investors') },
  { to: localePath('/contact'),     label: t('nav.contact') },
])

const legal = computed(() => [
  { to: '#', label: t('footer.privacy') },
  { to: '#', label: t('footer.terms') },
])
</script>

<template>
  <footer class="mt-24 border-t border-border-subtle bg-bg-deep">
    <div class="container-tight py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="space-y-4">
          <img
            src="/logo.png"
            :alt="t('site.name')"
            width="160"
            height="160"
            class="h-28 w-auto -ml-2"
          />
          <p class="text-fg-secondary text-sm leading-relaxed">{{ t('site.tagline') }}</p>
        </div>

        <!-- Sitemap -->
        <div>
          <h4 class="font-display font-bold mb-4 text-fg-primary">{{ t('footer.sitemap') }}</h4>
          <ul class="space-y-2">
            <li v-for="item in sitemap" :key="item.to">
              <NuxtLink :to="item.to" class="text-sm text-fg-secondary hover:text-accent-bright transition-colors">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-display font-bold mb-4 text-fg-primary">{{ t('footer.contact') }}</h4>
          <ul class="space-y-2 text-sm text-fg-secondary">
            <li>
              <a :href="`mailto:${contactEmail}`" class="hover:text-accent-bright transition-colors">
                {{ contactEmail }}
              </a>
            </li>
            <li class="font-mono text-xs">BSE#91 營銷第一組</li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-display font-bold mb-4 text-fg-primary">{{ t('footer.legal') }}</h4>
          <ul class="space-y-2">
            <li v-for="item in legal" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-fg-secondary hover:text-accent-bright transition-colors">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-border-subtle">
        <p class="text-xs text-fg-muted text-center">{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>
