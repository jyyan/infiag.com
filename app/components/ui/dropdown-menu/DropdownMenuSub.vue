<script setup lang="ts">
import { DropdownMenuSub, type DropdownMenuSubProps } from 'radix-vue'

const props = defineProps<DropdownMenuSubProps>()
</script>

<template>
  <DropdownMenuSub v-bind="props">
    <slot />
  </DropdownMenuSub>
</template>
