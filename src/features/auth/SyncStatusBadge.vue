<script setup lang="ts">
import AppIcon from '../icons/AppIcon.vue'
import { computed } from 'vue'
import type { SyncEngineState } from '../../services/sync-engine'
import type { AppIconName } from '../icons/icons'

const props = defineProps<{
  state: SyncEngineState
  isOnline: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()

const badgeLabel = computed(() => {
  if (!props.isOnline) return 'Ngoại tuyến'
  if (props.state.status === 'syncing') return 'Đang đồng bộ...'
  if (props.state.pendingCount > 0) return `Chờ đồng bộ (${props.state.pendingCount})`
  if (props.state.status === 'error') return 'Lỗi đồng bộ'
  return 'Đã đồng bộ'
})

const badgeIcon = computed<AppIconName>(() => {
  if (!props.isOnline) return 'cloud-off'
  if (props.state.status === 'syncing') return 'sync'
  if (props.state.pendingCount > 0) return 'cloud-upload'
  if (props.state.status === 'error') return 'alert'
  return 'cloud-check'
})

const badgeClass = computed(() => {
  if (!props.isOnline) return 'offline'
  if (props.state.status === 'syncing') return 'syncing'
  if (props.state.pendingCount > 0) return 'pending'
  if (props.state.status === 'error') return 'error'
  return 'synced'
})
</script>

<template>
  <button
    class="sync-badge"
    :class="badgeClass"
    :aria-label="`Trạng thái đồng bộ: ${badgeLabel}. Bấm để mở tài khoản và đồng bộ.`"
    @click="$emit('click')"
  >
    <span class="sync-icon" aria-hidden="true"><AppIcon :name="badgeIcon" /></span>
    <span class="sync-text">{{ badgeLabel }}</span>
  </button>
</template>

<style scoped>
.sync-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-full, 9999px);
  font-size: var(--font-size-xs, 0.75rem);
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  min-height: 32px;
  background: var(--bg-surface-elevated, #1b2c28);
  color: var(--text-primary, #f0fdf4);
  transition: all var(--transition-fast, 150ms ease);
}

.sync-icon {
  display: grid;
  font-size: 0.95rem;
}

.sync-badge.syncing .sync-icon {
  animation: sync-spin 1.2s linear infinite;
}

@keyframes sync-spin {
  to {
    transform: rotate(360deg);
  }
}

.sync-badge.synced {
  color: var(--status-success, #10b981);
  border-color: var(--status-success-border, #34d399);
  background: var(--status-success-bg, rgba(16, 185, 129, 0.15));
}

.sync-badge.syncing {
  color: var(--status-info, #3b82f6);
  border-color: var(--status-info-border, #60a5fa);
  background: var(--status-info-bg, rgba(59, 130, 246, 0.15));
}

.sync-badge.pending {
  color: var(--status-warn, #f59e0b);
  border-color: var(--status-warn-border, #fbbf24);
  background: var(--status-warn-bg, rgba(245, 158, 11, 0.15));
}

.sync-badge.offline {
  color: var(--text-subtle, #4b7a6d);
  border-color: var(--border-medium, rgba(255, 255, 255, 0.16));
  background: var(--bg-muted, #162420);
}

.sync-badge.error {
  color: var(--status-critical, #ef4444);
  border-color: var(--status-critical-border, #f87171);
  background: var(--status-critical-bg, rgba(239, 68, 68, 0.15));
}
</style>
