<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance, agent } = useMailto()

const { data } = await useAsyncData(
  () => `partners-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/partners`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })
</script>

<template>
  <div v-if="data">
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="f in data.features" :key="f.title" :icon="f.icon" :title="f.title" :description="f.desc" />
      </div>
    </SectionContainer>
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>
    <SectionContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a :href="alliance(locale)" class="block">
          <div class="glass-card p-8 text-center hover:shadow-glow-lg transition-shadow space-y-3">
            <Icon name="lucide:handshake" class="w-12 h-12 text-accent-bright mx-auto" />
            <h3 class="text-xl font-display font-bold">
              {{ locale === 'en' ? 'Strategic Partnership' : '策略合作意向' }}
            </h3>
            <p class="text-sm text-fg-secondary">{{ t('cta.contact') }}</p>
          </div>
        </a>
        <a :href="agent(locale)" class="block">
          <div class="glass-card p-8 text-center hover:shadow-glow-lg transition-shadow space-y-3">
            <Icon name="lucide:map" class="w-12 h-12 text-accent-bright mx-auto" />
            <h3 class="text-xl font-display font-bold">
              {{ locale === 'en' ? 'Regional Agent Application' : '國省級代理申請' }}
            </h3>
            <p class="text-sm text-fg-secondary">{{ t('cta.contact') }}</p>
          </div>
        </a>
      </div>
    </SectionContainer>
  </div>
</template>
