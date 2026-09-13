import { describe, expect, it } from 'vitest'
import type { Card } from '../types'
import { validationInput } from './index'
import {
  errorsOf,
  validateContent,
  validateEditorial,
  validateExpert,
  validateSafety,
  validateTechnical,
  warningsOf
} from './validation'

const clone = (card: Card): Card => JSON.parse(JSON.stringify(card)) as Card
const withCard = (card: Card) => ({ ...validationInput, cards: [card] })

describe('cổng chất lượng nội dung', () => {
  it('toàn bộ nội dung hiện tại không còn lỗi chặn phát hành', () => {
    const errors = errorsOf(validateContent(validationInput))
    expect(errors).toEqual([])
  })

  it('toàn bộ nội dung hiện tại không còn cảnh báo cần xử lý', () => {
    const warnings = warningsOf(validateContent(validationInput))
    expect(warnings).toEqual([])
  })

  it('bắt lỗi biên tập khi bước không bắt đầu bằng động từ hành động', () => {
    const card = clone(validationInput.cards[0])
    card.steps[0].instruction = 'Nhanh chóng xoay vô-lăng sang trái.'
    const errors = errorsOf(validateEditorial(withCard(card)))
    expect(errors.some(issue => issue.message.includes('động từ hành động'))).toBe(true)
  })

  it('bắt lỗi biên tập khi khẩu quyết quá dài', () => {
    const card = clone(validationInput.cards[0])
    card.mnemonic.text = 'Một hai ba bốn năm sáu bảy tám chín mười mười một mười hai mười ba'
    const errors = errorsOf(validateEditorial(withCard(card)))
    expect(errors.some(issue => issue.message.includes('12 từ'))).toBe(true)
  })

  it('bắt lỗi kỹ thuật khi thẻ thiếu sơ đồ biến thể', () => {
    const card = clone(validationInput.cards[0])
    card.assetIds = [card.assetIds[0]]
    const errors = errorsOf(validateTechnical(withCard(card)))
    expect(errors.some(issue => issue.message.includes('ít nhất 2 sơ đồ'))).toBe(true)
    expect(errors.some(issue => issue.message.includes('biến thể'))).toBe(true)
  })

  it('bắt lỗi kỹ thuật khi manifest lệch phiên bản nội dung', () => {
    const errors = errorsOf(validateTechnical({ ...validationInput, manifestVersion: '1999.1.1' }))
    expect(errors.some(issue => issue.message.includes('Manifest asset'))).toBe(true)
  })

  it('chặn thẻ tự nhận đã duyệt nhưng không có hồ sơ thẩm định', () => {
    const card = clone(validationInput.cards[0])
    card.id = 'parking-ghost'
    card.reviewStatus = 'approved'
    const errors = errorsOf(validateExpert(withCard(card)))
    expect(errors.some(issue => issue.message.includes('thiếu hồ sơ thẩm định'))).toBe(true)
  })

  it('chặn nội dung hướng dẫn hành vi không an toàn', () => {
    const card = clone(validationInput.cards[0])
    card.steps[1].instruction = 'Đi tiếp và bỏ qua gương để tiết kiệm thời gian.'
    const errors = errorsOf(validateSafety(withCard(card)))
    expect(errors.some(issue => issue.message.includes('không an toàn'))).toBe(true)
  })

  it('không coi mô tả lỗi thường gặp là hướng dẫn nguy hiểm', () => {
    const card = clone(validationInput.cards[0])
    card.mistakes = ['Chạy quá tốc độ cho kịp giờ.', card.mistakes[1], card.mistakes[2]]
    expect(errorsOf(validateSafety(withCard(card)))).toEqual([])
  })

  it('cảnh báo khi thẻ được sửa sau lần duyệt gần nhất', () => {
    const card = clone(validationInput.cards[0])
    card.updatedAt = '2099-01-01'
    const issues = validateExpert(withCard(card))
    expect(issues.some(issue => issue.severity === 'error' && issue.message.includes('duyệt lại'))).toBe(true)
  })
})
