<script setup lang="ts">
import { computed } from 'vue'
import { appIcons, type AppIconName, type IconPart } from './icons'

const props = defineProps<{ name: AppIconName }>()
const parts = computed<IconPart[]>(() => appIcons[props.name])
</script>

<template>
  <svg
    class="app-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    :data-icon="name"
  >
    <path
      v-for="(part, index) in parts"
      :key="index"
      :d="part.d"
      :fill="part.fill ? 'currentColor' : undefined"
      :stroke="part.fill ? 'none' : undefined"
    />
  </svg>
</template>

<style scoped>
.app-icon {
  display: inline-block;
  flex: none;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
}
</style>
