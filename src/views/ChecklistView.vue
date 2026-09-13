<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '../stores/app'
const store = useAppStore()
const items = [{ id: 'seat', label: 'Ghế chỉnh đúng tư thế' }, { id: 'mirrors', label: 'Gương trái, phải và giữa' }, { id: 'belt', label: 'Dây an toàn đã cài' }, { id: 'brake', label: 'Phanh tay và trạng thái số' }, { id: 'fuel', label: 'Nhiên liệu đủ cho hành trình' }, { id: 'warning', label: 'Không có đèn cảnh báo bất thường' }]
const done = computed(() => items.filter(item => store.checked[item.id]).length)
</script>
<template><section class="checklist-card"><div class="checklist-top"><div><p class="eyebrow">MỖI LẦN TRƯỚC KHI LÁI</p><h2>Trước khi nổ máy</h2></div><div class="completion"><b>{{ done }}</b><span>/ {{ items.length }}</span></div></div><div class="progress-track"><span :style="{ '--progress': `${done / items.length}` }" /></div><label v-for="item in items" :key="item.id" class="check-row"><input type="checkbox" :checked="store.checked[item.id]" @change="store.toggleCheck(item.id)" /><span class="fake-check">✓</span><span>{{ item.label }}</span></label><button class="text-button" @click="store.resetChecklist(items.map(item => item.id))">↻ Đặt lại checklist</button></section><section class="checklist-card secondary"><p class="eyebrow">TRƯỚC KHI RỜI XE</p><h2>Đỗ xe an toàn</h2><p class="muted">Một thói quen nhỏ giúp chuyến đi sau bắt đầu nhẹ nhàng hơn.</p><div class="mini-checks"><span>✓ Về P</span><span>✓ Kéo phanh tay</span><span>✓ Tắt máy & khóa cửa</span></div></section></template>
