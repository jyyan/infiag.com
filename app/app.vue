<script setup lang="ts">
const { organization, website } = useSiteSchema()
useSchemaOrg([organization, website])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
