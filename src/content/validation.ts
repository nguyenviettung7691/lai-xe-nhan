import type { Card, CardAsset, Checklist, ExpertReview, ValidationIssue } from '../types'

/** Ngân sách dung lượng cho gói nội dung offline lõi (KB). */
export const CORE_PACK_BUDGET_KB = 2560
/** Dung lượng tối đa cho một sơ đồ SVG (KB). */
export const MAX_ASSET_KB = 60

const ACTION_VERBS = new Set([
  'Bám', 'Báo', 'Bật', 'Bấm', 'Bò', 'Canh', 'Cài', 'Chạm', 'Chọn', 'Chuyển', 'Chờ', 'Chỉnh', 'Dừng', 'Gập', 'Giảm',
  'Giữ', 'Gọi', 'Ghi', 'Hạ', 'Hỏi', 'Kiểm', 'Kéo', 'Liếc', 'Lăn', 'Lùi', 'Mở', 'Nghe', 'Nghiêng', 'Nhả', 'Nhìn', 'Nhô',
  'Nhường', 'Nhờ', 'Phanh', 'Quan', 'Quay', 'Quét', 'Ra', 'Rà', 'Sang', 'Sửa', 'Thoát', 'Thả', 'Thu', 'Trả', 'Trở',
  'Tránh', 'Tăng', 'Tiến', 'Tấp', 'Tắt', 'Vào', 'Xoay', 'Xác', 'Về', 'Đi', 'Đánh', 'Đạp', 'Đếm', 'Đọc', 'Đặt', 'Đưa',
  'Đỗ'
])

const VAGUE_PATTERNS = [/vừa vừa/i, /từ từ rồi/i, /hơi hơi/i, /đại khái/i, /tùy cảm giác/i, /khoảng chừng nào/i]

/** Mẫu câu khẳng định nguy hiểm: chỉ quét trong bước thực hiện và cách chữa cháy, không quét phần lỗi thường gặp. */
const UNSAFE_PATTERNS = [
  /vượt đèn đỏ/i,
  /chạy quá tốc độ/i,
  /lấn làn ngược chiều/i,
  /bỏ qua (?:bước|gương|quan sát|kiểm tra)/i,
  /không cần (?:quan sát|nhìn gương|kiểm tra|thắt dây)/i,
  /vừa lái vừa (?:dùng điện thoại|nhắn tin)/i,
  /phóng nhanh/i
]

const CHECKSUM_PATTERN = /^sha256-[0-9a-f]{64}$/
const VERSION_PATTERN = /^\d+\.\d+\.\d+$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const countSentences = (text: string): number => text.split(/[.!?]+/).filter((part) => part.trim().length > 0).length

const countWords = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length

const firstWord = (text: string): string => text.trim().split(/\s+/)[0] ?? ''

export interface ValidationInput {
  cards: Card[]
  checklists: Checklist[]
  assets: CardAsset[]
  reviews: ExpertReview[]
  contentVersion: string
  manifestVersion: string
}

const issue = (
  gate: ValidationIssue['gate'],
  severity: ValidationIssue['severity'],
  entity: ValidationIssue['entity'],
  id: string,
  message: string
): ValidationIssue => ({ gate, severity, entity, id, message })

/** Cổng 1 — biên tập: cấu trúc thẻ, độ dài và cách diễn đạt. */
export const validateEditorial = (input: ValidationInput): ValidationIssue[] => {
  const issues: ValidationIssue[] = []
  const checklistIds = new Set(input.checklists.map((checklist) => checklist.id))
  const seenCardIds = new Set<string>()

  for (const card of input.cards) {
    if (seenCardIds.has(card.id)) issues.push(issue('editorial', 'error', 'card', card.id, 'Trùng mã thẻ học.'))
    seenCardIds.add(card.id)

    if (card.title.length > 60) issues.push(issue('editorial', 'error', 'card', card.id, `Tiêu đề dài ${card.title.length} ký tự, tối đa 60.`))
    const contextSentences = countSentences(card.context)
    if (contextSentences < 1 || contextSentences > 2) {
      issues.push(issue('editorial', 'error', 'card', card.id, `Bối cảnh có ${contextSentences} câu, yêu cầu 1–2 câu.`))
    }
    if (countSentences(card.objective) !== 1) issues.push(issue('editorial', 'error', 'card', card.id, 'Mục tiêu phải gói trong một câu.'))
    if (card.steps.length < 5 || card.steps.length > 8) {
      issues.push(issue('editorial', 'error', 'card', card.id, `Thẻ có ${card.steps.length} bước, yêu cầu 5–8 bước.`))
    }
    if (card.mistakes.length !== 3) issues.push(issue('editorial', 'error', 'card', card.id, 'Cần đúng 3 lỗi thường gặp.'))
    if (countWords(card.mnemonic.text) > 12) issues.push(issue('editorial', 'error', 'card', card.id, 'Khẩu quyết vượt 12 từ.'))
    if (!checklistIds.has(card.checklistId)) issues.push(issue('editorial', 'error', 'card', card.id, `Không tìm thấy checklist ${card.checklistId}.`))
    if (!VERSION_PATTERN.test(card.version)) issues.push(issue('editorial', 'error', 'card', card.id, `Phiên bản ${card.version} không đúng dạng semver.`))
    if (!DATE_PATTERN.test(card.updatedAt)) issues.push(issue('editorial', 'error', 'card', card.id, 'Ngày cập nhật phải theo dạng YYYY-MM-DD.'))
    if (card.changelog.length === 0) issues.push(issue('editorial', 'error', 'card', card.id, 'Thiếu nhật ký thay đổi.'))
    if (card.changelog.at(-1)?.version !== card.version) {
      issues.push(issue('editorial', 'warning', 'card', card.id, 'Phiên bản mới nhất trong nhật ký không khớp phiên bản thẻ.'))
    }
    if (card.quickCheck.length !== 3) {
      issues.push(issue('editorial', 'error', 'card', card.id, 'Cần đúng 3 câu tự kiểm (quick check).'))
    }
    card.quickCheck.forEach((question) => {
      if (question.options.length < 2) issues.push(issue('editorial', 'error', 'card', card.id, `Câu tự kiểm ${question.id} cần ít nhất 2 phương án.`))
      if (question.correctIndex < 0 || question.correctIndex >= question.options.length) {
        issues.push(issue('editorial', 'error', 'card', card.id, `Câu tự kiểm ${question.id} có đáp án đúng không hợp lệ.`))
      }
      if (question.prompt.trim().length === 0) issues.push(issue('editorial', 'error', 'card', card.id, `Câu tự kiểm ${question.id} thiếu nội dung câu hỏi.`))
    })

    card.steps.forEach((step, index) => {
      if (step.stepNo !== index + 1) issues.push(issue('editorial', 'error', 'step', step.id, 'Số thứ tự bước không liên tục.'))
      if (!ACTION_VERBS.has(firstWord(step.instruction))) {
        issues.push(issue('editorial', 'error', 'step', step.id, `Bước phải bắt đầu bằng động từ hành động, hiện là "${firstWord(step.instruction)}".`))
      }
      if (step.cueText.trim().length === 0) issues.push(issue('editorial', 'error', 'step', step.id, 'Thiếu mốc canh cho bước.'))
      for (const pattern of VAGUE_PATTERNS) {
        if (pattern.test(step.instruction)) issues.push(issue('editorial', 'error', 'step', step.id, 'Bước chứa diễn đạt mơ hồ.'))
      }
    })
  }

  for (const checklist of input.checklists) {
    if (checklist.items.length < 4) issues.push(issue('editorial', 'warning', 'checklist', checklist.id, 'Checklist nên có ít nhất 4 mục.'))
    checklist.items.forEach((item, index) => {
      if (item.itemNo !== index + 1) issues.push(issue('editorial', 'error', 'checklist', checklist.id, `Mục ${item.id} sai số thứ tự.`))
    })
  }

  return issues
}

/** Cổng 2 — kỹ thuật: asset, checksum, dung lượng và ràng buộc phiên bản. */
export const validateTechnical = (input: ValidationInput): ValidationIssue[] => {
  const issues: ValidationIssue[] = []
  const seenAssetIds = new Set<string>()
  let corePackKb = 0

  for (const asset of input.assets) {
    if (seenAssetIds.has(asset.id)) issues.push(issue('technical', 'error', 'asset', asset.id, 'Trùng mã asset.'))
    seenAssetIds.add(asset.id)

    if (!CHECKSUM_PATTERN.test(asset.checksum)) issues.push(issue('technical', 'error', 'asset', asset.id, 'Checksum không đúng định dạng sha256.'))
    if (!asset.url.startsWith('/content/svg/')) issues.push(issue('technical', 'error', 'asset', asset.id, 'Asset phải nằm trong /content/svg/ để dùng offline.'))
    if (asset.sizeKb > MAX_ASSET_KB) issues.push(issue('technical', 'error', 'asset', asset.id, `Asset nặng ${asset.sizeKb} KB, vượt ngưỡng ${MAX_ASSET_KB} KB.`))
    if (asset.alt.trim().length === 0) issues.push(issue('technical', 'error', 'asset', asset.id, 'Thiếu mô tả alt cho ảnh.'))
    if (asset.offlinePack === 'core') corePackKb += asset.sizeKb
  }

  for (const card of input.cards) {
    if (card.assetIds.length < 2) issues.push(issue('technical', 'error', 'card', card.id, 'Mỗi thẻ cần ít nhất 2 sơ đồ.'))
    const cardAssets = card.assetIds.map((id) => input.assets.find((asset) => asset.id === id))
    cardAssets.forEach((asset, index) => {
      if (!asset) issues.push(issue('technical', 'error', 'card', card.id, `Không tìm thấy asset ${card.assetIds[index]}.`))
    })
    const roles = cardAssets.filter((asset): asset is CardAsset => Boolean(asset)).map((asset) => asset.role)
    if (!roles.includes('main')) issues.push(issue('technical', 'error', 'card', card.id, 'Thiếu sơ đồ chính (main).'))
    if (!roles.includes('variant')) issues.push(issue('technical', 'error', 'card', card.id, 'Thiếu sơ đồ biến thể (variant).'))
  }

  if (corePackKb > CORE_PACK_BUDGET_KB) {
    issues.push(issue('technical', 'error', 'pack', 'core', `Gói offline lõi ${corePackKb.toFixed(2)} KB vượt ngân sách ${CORE_PACK_BUDGET_KB} KB.`))
  }
  if (input.manifestVersion !== input.contentVersion) {
    issues.push(issue('technical', 'error', 'pack', 'manifest', `Manifest asset ở phiên bản ${input.manifestVersion}, nội dung ở ${input.contentVersion}.`))
  }

  return issues
}

/** Cổng 3 — chuyên gia: chỉ thẻ đã duyệt mới được phát hành. */
export const validateExpert = (input: ValidationInput): ValidationIssue[] => {
  const issues: ValidationIssue[] = []
  const reviewByCard = new Map(input.reviews.map((review) => [review.cardId, review]))

  for (const review of input.reviews) {
    if (!input.cards.some((card) => card.id === review.cardId)) {
      issues.push(issue('expert', 'error', 'review', review.id, `Hồ sơ duyệt trỏ tới thẻ không tồn tại: ${review.cardId}.`))
    }
    if (review.reviewer.trim().length === 0 || review.credential.trim().length === 0) {
      issues.push(issue('expert', 'error', 'review', review.id, 'Thiếu thông tin người duyệt hoặc chứng chỉ.'))
    }
  }

  for (const card of input.cards) {
    const review = reviewByCard.get(card.id)
    if (card.reviewStatus === 'approved') {
      if (!review) {
        issues.push(issue('expert', 'error', 'card', card.id, 'Thẻ đã duyệt nhưng thiếu hồ sơ thẩm định.'))
        continue
      }
      if (review.decision !== 'approved') {
        issues.push(issue('expert', 'error', 'card', card.id, `Trạng thái thẻ là approved nhưng hồ sơ ghi ${review.decision}.`))
      }
      if (review.confidenceScore < 4) {
        issues.push(issue('expert', 'error', 'card', card.id, `Điểm tin cậy ${review.confidenceScore} thấp hơn mức tối thiểu 4.`))
      }
      if (review.reviewedAt < card.updatedAt) {
        issues.push(issue('expert', 'error', 'card', card.id, 'Nội dung được sửa sau lần duyệt gần nhất, cần duyệt lại.'))
      }
    } else if (review?.decision === 'approved') {
      issues.push(issue('expert', 'warning', 'card', card.id, 'Đã có hồ sơ duyệt nhưng trạng thái thẻ chưa chuyển sang approved.'))
    }
  }

  return issues
}

/** Cổng 4 — an toàn: mọi thẻ phải có cảnh báo và không khuyến khích hành vi nguy hiểm. */
export const validateSafety = (input: ValidationInput): ValidationIssue[] => {
  const issues: ValidationIssue[] = []

  for (const card of input.cards) {
    if (card.safety.trim().length < 20) issues.push(issue('safety', 'error', 'card', card.id, 'Thiếu ghi chú an toàn đủ chi tiết.'))
    if (card.recovery.trim().length < 20) issues.push(issue('safety', 'error', 'card', card.id, 'Thiếu hướng dẫn chữa cháy khi thao tác sai.'))

    const affirmativeText = [...card.steps.map((step) => step.instruction), card.recovery, card.safety].join(' ')
    for (const pattern of UNSAFE_PATTERNS) {
      if (pattern.test(affirmativeText)) {
        issues.push(issue('safety', 'error', 'card', card.id, 'Nội dung hướng dẫn chứa hành vi không an toàn.'))
      }
    }
    if (card.risk === 'high' && !/không|tránh|dừng|chờ|quay đầu/i.test(card.safety)) {
      issues.push(issue('safety', 'warning', 'card', card.id, 'Thẻ rủi ro cao nên nêu rõ điều kiện dừng hoặc từ bỏ thao tác.'))
    }
    if (card.risk === 'high' && !card.quickCheck.some((question) => question.isStopCondition)) {
      issues.push(issue('safety', 'error', 'card', card.id, 'Thẻ rủi ro cao cần ít nhất một câu tự kiểm về điều kiện dừng.'))
    }
  }

  return issues
}

export const validateContent = (input: ValidationInput): ValidationIssue[] => [
  ...validateEditorial(input),
  ...validateTechnical(input),
  ...validateExpert(input),
  ...validateSafety(input)
]

export const errorsOf = (issues: ValidationIssue[]): ValidationIssue[] => issues.filter((item) => item.severity === 'error')

export const warningsOf = (issues: ValidationIssue[]): ValidationIssue[] => issues.filter((item) => item.severity === 'warning')
