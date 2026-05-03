<script setup lang="ts">
import { DropdownMenuRadioGroup, type DropdownMenuRadioGroupProps } from 'radix-vue'

const props = defineProps<DropdownMenuRadioGroupProps>()
</script>

<template>
  <DropdownMenuRadioGroup v-bind="props">
    <slot />
  </DropdownMenuRadioGroup>
</template>
