<template>
  <div class="min-h-screen flex flex-col bg-bg-base text-fg-primary">
    <AppHeader />
    <main class="flex-1 pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
