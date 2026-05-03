<script setup lang="ts">
const { locale, t } = useI18n()
const { contactEmail, alliance, agent, pitchDeck } = useMailto()

const titleMap = { 'zh-TW': '聯絡我們', 'zh-CN': '联系我们', 'en': 'Contact Us' }
const subtitleMap = {
  'zh-TW': '無限智能股份有限公司 · BSE#91 營銷第一組',
  'zh-CN': '无限智能股份有限公司 · BSE#91 营销第一组',
  'en':    'Infinity Agentic Inc. · BSE#91 Marketing Group',
}

const channels = computed(() => [
  { icon: 'handshake',  title: locale.value === 'en' ? 'Strategic Alliance'        : '策略合作', href: alliance(locale.value) },
  { icon: 'map',        title: locale.value === 'en' ? 'Regional Agent'            : '國省級代理', href: agent(locale.value) },
  { icon: 'briefcase',  title: locale.value === 'en' ? 'Investor Relations'        : '投資人關係', href: pitchDeck(locale.value) },
])

usePageSeo({ title: titleMap[locale.value] ?? titleMap['zh-TW'] })

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@type': 'ContactPage',
    '@id': 'https://infiag.com/contact#webpage',
    url: 'https://infiag.com/contact',
    name: () => t('nav.contact'),
    description: () => t('schema.org.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])
</script>

<template>
  <div>
    <SectionContainer
      :title="titleMap[locale] ?? titleMap['zh-TW']"
      :subtitle="subtitleMap[locale] ?? subtitleMap['zh-TW']"
      variant="tech"
    >
      <div class="text-center mt-8 space-y-2">
        <a
          :href="`mailto:${contactEmail}`"
          class="inline-flex items-center gap-2 text-2xl font-display text-glow hover:text-accent-bright transition-colors"
        >
          <Icon name="lucide:mail" class="w-6 h-6" />
          {{ contactEmail }}
        </a>
      </div>
    </SectionContainer>

    <SectionContainer
      :title="locale === 'en' ? 'Choose a Channel' : '依您的需求'"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          v-for="c in channels"
          :key="c.title"
          :href="c.href"
          class="glass-card p-8 text-center hover:shadow-glow-lg transition-shadow space-y-3"
        >
          <Icon :name="`lucide:${c.icon}`" class="w-12 h-12 text-accent-bright mx-auto" />
          <h3 class="text-xl font-display font-bold">{{ c.title }}</h3>
          <p class="text-sm text-fg-secondary">{{ t('cta.contact') }}</p>
        </a>
      </div>
    </SectionContainer>

    <SectionContainer variant="tight">
      <div class="glass-card p-8 lg:p-12 text-center space-y-4">
        <h3 class="text-xl font-display font-bold">
          {{ locale === 'en' ? 'Office (Coming Soon)' : '辦公室（佔位）' }}
        </h3>
        <p class="text-fg-muted">
          {{ locale === 'en' ? 'Address details to be confirmed.' : '辦公地址確認中。' }}
        </p>
      </div>
    </SectionContainer>
  </div>
</template>
