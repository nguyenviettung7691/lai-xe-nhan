<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  isSupabaseConfigured,
  getCurrentUser,
  signInWithOtp,
  signInWithOAuth,
  signOut
} from '../../lib/supabase'
import { syncEngine, type SyncEngineState } from '../../services/sync-engine'
import { getOfflineStorageEstimate } from '../../services/offline-cache'
import type { User } from '@supabase/supabase-js'

defineProps<{
  show: boolean
  syncState: SyncEngineState
  isOnline: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'synced'): void
}>()

const user = ref<User | null>(null)
const email = ref('')
const message = ref<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)
const isLoading = ref(false)
const storageInfo = ref({ usageKb: 0, quotaKb: 0 })

const isConfigured = isSupabaseConfigured()

const refreshAuth = async () => {
  if (isConfigured) {
    user.value = await getCurrentUser()
  }
  storageInfo.value = await getOfflineStorageEstimate()
}

onMounted(() => {
  void refreshAuth()
})

const handleEmailLogin = async () => {
  if (!email.value || !email.value.includes('@')) {
    message.value = { text: 'Vui lòng nhập địa chỉ email hợp lệ.', type: 'error' }
    return
  }

  isLoading.value = true
  message.value = null

  const result = await signInWithOtp(email.value)
  isLoading.value = false

  if (result.success) {
    message.value = {
      text: 'Đã gửi liên kết đăng nhập đến email của bạn. Vui lòng kiểm tra hộp thư!',
      type: 'success'
    }
  } else {
    message.value = { text: result.error || 'Đăng nhập thất bại', type: 'error' }
  }
}

const handleOAuth = async (provider: 'google' | 'apple') => {
  isLoading.value = true
  const result = await signInWithOAuth(provider)
  isLoading.value = false
  if (!result.success && result.error) {
    message.value = { text: result.error, type: 'error' }
  }
}

const handleSignOut = async () => {
  isLoading.value = true
  await signOut()
  user.value = null
  isLoading.value = false
  message.value = { text: 'Đã đăng xuất.', type: 'info' }
}

const handleForceSync = async () => {
  isLoading.value = true
  message.value = null
  await syncEngine.processQueue()
  isLoading.value = false
  emit('synced')
  message.value = { text: 'Đã hoàn tất đồng bộ.', type: 'success' }
}
</script>

<template>
  <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
    <div class="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div class="dialog-header">
        <h2 id="auth-title">Tài khoản & Đồng bộ</h2>
        <button class="close-btn" aria-label="Đóng" @click="$emit('close')">×</button>
      </div>

      <div class="dialog-body">
        <!-- Storage info -->
        <div class="info-card">
          <div class="card-row">
            <span>Dung lượng lưu trữ Offline:</span>
            <strong>{{ storageInfo.usageKb > 0 ? `${storageInfo.usageKb} KB` : 'Đã nạp sẵn' }}</strong>
          </div>
          <div class="card-row">
            <span>Trạng thái mạng:</span>
            <span :class="isOnline ? 'text-success' : 'text-muted'">{{ isOnline ? 'Đang kết nối' : 'Ngoại tuyến' }}</span>
          </div>
          <div class="card-row">
            <span>Hàng đợi chưa gửi:</span>
            <strong>{{ syncState.pendingCount }} tác vụ</strong>
          </div>
        </div>

        <div v-if="message" class="alert-box" :class="message.type">
          {{ message.text }}
        </div>

        <!-- User Logged In -->
        <div v-if="user" class="logged-in-section">
          <p class="user-email">Đăng nhập với: <b>{{ user.email }}</b></p>
          <div class="button-row">
            <button class="action-button primary" :disabled="isLoading || !isOnline" @click="handleForceSync">
              🔄 Đồng bộ ngay
            </button>
            <button class="action-button secondary" :disabled="isLoading" @click="handleSignOut">
              Đăng xuất
            </button>
          </div>
        </div>

        <!-- User Not Logged In -->
        <div v-else-if="isConfigured" class="login-section">
          <p class="subtext">Đăng nhập để đồng bộ tiến độ học và checklist qua các thiết bị.</p>
          <form class="email-form" @submit.prevent="handleEmailLogin">
            <input
              v-model="email"
              type="email"
              placeholder="Nhập email của bạn..."
              class="text-input"
              required
            />
            <button type="submit" class="action-button primary full" :disabled="isLoading || !isOnline">
              Gửi mã đăng nhập
            </button>
          </form>

          <div class="divider"><span>hoặc</span></div>

          <div class="oauth-buttons">
            <button class="oauth-btn" :disabled="isLoading || !isOnline" @click="handleOAuth('google')">
              Đăng nhập với Google
            </button>
          </div>
        </div>

        <!-- Supabase not yet configured mode -->
        <div v-else class="guest-section">
          <p class="subtext">
            Chế độ lưu trữ cục bộ (Offline-First) đang kích hoạt. Mọi tiến độ học và checklist của bạn được bảo toàn an toàn trên thiết bị này.
          </p>
          <button class="action-button primary full" :disabled="isLoading" @click="handleForceSync">
            🔄 Làm mới bộ nhớ đệm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.auth-dialog {
  background: var(--bg-surface, #14211e);
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
  border-radius: var(--radius-lg, 16px);
  width: 100%;
  max-width: 440px;
  overflow: hidden;
  box-shadow: var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.5));
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
}

.dialog-header h2 {
  font-size: var(--font-size-lg, 1.125rem);
  font-weight: 700;
  margin: 0;
  color: var(--text-primary, #f0fdf4);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted, #6ee7b7);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  min-width: 32px;
  min-height: 32px;
}

.dialog-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  background: var(--bg-primary, #0e1715);
  border-radius: var(--radius-md, 10px);
  padding: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: var(--font-size-sm, 0.875rem);
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-success {
  color: var(--status-success, #10b981);
}

.text-muted {
  color: var(--text-subtle, #4b7a6d);
}

.alert-box {
  padding: 0.75rem;
  border-radius: var(--radius-sm, 6px);
  font-size: var(--font-size-sm, 0.875rem);
}

.alert-box.success {
  background: var(--status-success-bg, rgba(16, 185, 129, 0.15));
  color: var(--status-success, #10b981);
  border: 1px solid var(--status-success-border, #34d399);
}

.alert-box.error {
  background: var(--status-critical-bg, rgba(239, 68, 68, 0.15));
  color: var(--status-critical, #ef4444);
  border: 1px solid var(--status-critical-border, #f87171);
}

.alert-box.info {
  background: var(--status-info-bg, rgba(59, 130, 246, 0.15));
  color: var(--status-info, #3b82f6);
  border: 1px solid var(--status-info-border, #60a5fa);
}

.subtext {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--text-muted, #6ee7b7);
  line-height: var(--line-height-normal, 1.5);
}

.email-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.text-input {
  width: 100%;
  min-height: var(--min-tap-target, 44px);
  padding: 0.5rem 0.875rem;
  background: var(--bg-primary, #0e1715);
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
  border-radius: var(--radius-md, 10px);
  color: var(--text-primary, #f0fdf4);
  font-size: var(--font-size-base, 1rem);
}

.action-button {
  min-height: var(--min-tap-target, 44px);
  border-radius: var(--radius-md, 10px);
  font-size: var(--font-size-base, 1rem);
  font-weight: 600;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.action-button.primary {
  background: var(--accent-primary, #10b981);
  color: #0e1715;
}

.action-button.secondary {
  background: var(--bg-surface-elevated, #1b2c28);
  color: var(--text-primary, #f0fdf4);
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
}

.action-button.full {
  width: 100%;
}

.divider {
  text-align: center;
  position: relative;
  margin: 0.5rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border-subtle, rgba(255, 255, 255, 0.08));
}

.divider span {
  position: relative;
  background: var(--bg-surface, #14211e);
  padding: 0 0.5rem;
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--text-subtle, #4b7a6d);
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.oauth-btn {
  min-height: var(--min-tap-target, 44px);
  border-radius: var(--radius-md, 10px);
  background: var(--bg-surface-elevated, #1b2c28);
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
  color: var(--text-primary, #f0fdf4);
  font-weight: 600;
  cursor: pointer;
}

.user-email {
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--text-secondary, #a7f3d0);
}

.button-row {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
</style>
