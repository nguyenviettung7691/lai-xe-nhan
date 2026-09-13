<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Card } from '../../types'
import { useAppStore } from '../../stores/app'

const props = defineProps<{
  card: Card
}>()

const store = useAppStore()

/** Đáp án học viên đang chọn cho từng câu, theo chỉ số câu hỏi. */
const answers = reactive<Record<number, number>>({})
const submitted = computed(() => Object.keys(answers).length === props.card.quickCheck.length)

const correctCount = computed(() =>
  props.card.quickCheck.reduce(
    (total, question, index) => (answers[index] === question.correctIndex ? total + 1 : total),
    0
  )
)

const scorePercent = computed(() =>
  Math.round((correctCount.value / props.card.quickCheck.length) * 100)
)

const lastEntry = computed(() => store.reviewSchedule[props.card.id])
const passed = computed(() => lastEntry.value?.lastResult === 'pass')

const selectAnswer = (questionIndex: number, optionIndex: number) => {
  if (submitted.value) return
  answers[questionIndex] = optionIndex
  if (Object.keys(answers).length === props.card.quickCheck.length) {
    store.recordQuickCheck(props.card.id, correctCount.value, props.card.quickCheck.length)
  }
}

const retry = () => {
  for (const key of Object.keys(answers)) delete answers[Number(key)]
}
</script>

<template>
  <section class="quick-check" aria-label="Tự kiểm nhanh">
    <div class="section-head">
      <div>
        <p class="eyebrow">TỰ KIỂM NHANH</p>
        <h2>Bạn đã nắm chưa?</h2>
      </div>
    </div>

    <ol class="questions">
      <li v-for="(question, qIndex) in card.quickCheck" :key="question.id" class="question">
        <p class="prompt">
          {{ question.prompt }}
          <span v-if="question.isStopCondition" class="stop-badge" title="Điều kiện dừng bắt buộc">⛔ Điều kiện dừng</span>
        </p>
        <ul class="options">
          <li v-for="(option, oIndex) in question.options" :key="option">
            <button
              type="button"
              class="option-btn"
              :class="{
                selected: answers[qIndex] === oIndex,
                correct: submitted && oIndex === question.correctIndex,
                wrong: submitted && answers[qIndex] === oIndex && oIndex !== question.correctIndex
              }"
              :disabled="submitted"
              @click="selectAnswer(qIndex, oIndex)"
            >
              {{ option }}
            </button>
          </li>
        </ul>
      </li>
    </ol>

    <div v-if="submitted" class="result" :class="{ pass: passed, fail: !passed }">
      <strong>{{ passed ? '✓ Đạt' : '✗ Chưa đạt' }}</strong>
      <span>Đúng {{ correctCount }}/{{ card.quickCheck.length }} ({{ scorePercent }}%)</span>
      <button v-if="!passed" type="button" class="button secondary" @click="retry">Làm lại</button>
    </div>
  </section>
</template>

<style scoped>
.quick-check {
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: var(--radius-lg, 16px);
  background: var(--bg-surface-elevated, #1b2c28);
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
}

.questions {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question .prompt {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stop-badge {
  display: inline-block;
  margin-left: 0.5rem;
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--status-error, #ef4444);
}

.options {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.option-btn {
  width: 100%;
  text-align: left;
  min-height: var(--min-tap-target, 44px);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md, 10px);
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
  background: var(--bg-surface, #14211e);
  color: var(--text-primary, #f0fdf4);
  cursor: pointer;
}

.option-btn.selected {
  border-color: var(--accent-primary, #10b981);
}

.option-btn.correct {
  border-color: var(--status-success, #22c55e);
  background: rgba(34, 197, 94, 0.15);
}

.option-btn.wrong {
  border-color: var(--status-error, #ef4444);
  background: rgba(239, 68, 68, 0.15);
}

.result {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.result.pass strong {
  color: var(--status-success, #22c55e);
}

.result.fail strong {
  color: var(--status-error, #ef4444);
}
</style>
