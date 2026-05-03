<script setup lang="ts">
withDefaults(defineProps<{ stagger?: number; duration?: number }>(), {
  stagger: 100,
  duration: 600,
})
</script>

<template>
  <div>
    <slot :stagger="stagger" :duration="duration" />
  </div>
</template>
