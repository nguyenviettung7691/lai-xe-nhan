<script setup lang="ts">
import { computed } from 'vue'
import { getLightDrawing, type DashboardIconName } from '../../content/light-icons'

const props = defineProps<{ name: DashboardIconName }>()
const drawing = computed(() => getLightDrawing(props.name))
</script>

<template>
  <svg
    class="dashboard-light-icon"
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    stroke-width="2.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    :data-signal="name"
  >
    <path v-for="(path, part) in drawing.paths" :key="part" :d="path" :data-part="part" />
    <text
      v-for="text in drawing.text"
      :key="text.value"
      :x="text.x"
      :y="text.y"
      :font-size="text.size"
      fill="currentColor"
      stroke="none"
      text-anchor="middle"
      font-family="Arial, sans-serif"
      font-weight="700"
    >{{ text.value }}</text>
  </svg>
</template>

<style scoped>
.dashboard-light-icon {
  display: block;
  width: 100%;
  height: 100%;
  padding: 5px;
}
</style>
