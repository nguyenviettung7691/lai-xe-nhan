<script setup lang="ts">
/**
 * Hero illustration: a top-down learning route. The ego car drives in the
 * right-hand lane through numbered lesson checkpoints towards a finish line.
 */
const road = 'M96 480V330C96 190 330 170 330 -50V-200'
const checkpoints = [
  [217.9, 197.3],
  [276.8, 142.9]
]
</script>

<template>
  <svg class="hero-scene" viewBox="0 0 440 280" aria-hidden="true" focusable="false">
    <defs>
      <pattern id="hero-checker" width="20" height="20" patternUnits="userSpaceOnUse" x="-50" y="-10">
        <rect width="20" height="20" fill="#0e1715" />
        <path d="M0 0h10v10H0zM10 10h10v10H10z" fill="#f4f7f2" />
      </pattern>
    </defs>
    <path :d="road" fill="none" stroke="#4d6058" stroke-width="134" />
    <path :d="road" fill="none" stroke="#263731" stroke-width="128" />
    <path :d="road" fill="none" stroke="#92a89e" stroke-width="4" stroke-dasharray="24 20" stroke-linecap="round" />
    <path
      d="M184.2 225.8C222 193 262 160 283 136S309 104 319.4 85.9"
      fill="none"
      stroke="#b7f36b"
      stroke-width="4"
      stroke-dasharray="2 10"
      stroke-linecap="round"
    />
    <g transform="translate(305.7 60.6) rotate(26.1)">
      <rect x="-50" y="-10" width="100" height="20" fill="url(#hero-checker)" />
      <path d="M58 8V-38" stroke="#f4f7f2" stroke-width="3" stroke-linecap="round" />
      <path d="M58-38h24l-6 8 6 8H58z" fill="#b7f36b" />
    </g>
    <g v-for="(point, index) in checkpoints" :key="index" :transform="`translate(${point[0]} ${point[1]})`">
      <circle r="13" fill="#0e1715" stroke="#b7f36b" stroke-width="3" />
      <text y="4.5" text-anchor="middle" font-size="13" font-weight="800" fill="#b7f36b">{{ index + 1 }}</text>
    </g>
    <g transform="translate(160.7 247.6) rotate(44.7)">
      <rect x="-17" y="-28" width="34" height="56" rx="8" fill="#b7f36b" />
      <rect x="-12" y="-19" width="24" height="11" rx="3" fill="#0e1715" opacity=".55" />
      <rect x="-12" y="12" width="24" height="8" rx="2.5" fill="#0e1715" opacity=".3" />
      <path d="M-14-29h7v3h-7zM7-29h7v3H7z" fill="#fffbe0" />
    </g>
  </svg>
</template>
