import type { Card, Difficulty, Lesson, Topic } from '../types'
import { parkingCards } from './cards/parking'
import { narrowCards } from './cards/narrow'
import { highwayCards } from './cards/highway'
import { weatherCards } from './cards/weather'

/** Toàn bộ thẻ học ở dạng phẳng, kể cả thẻ chưa được duyệt. */
export const allCards: Card[] = [...parkingCards, ...narrowCards, ...highwayCards, ...weatherCards]

interface LessonMeta {
  id: string
  topicId: string
  title: string
  summary: string
  difficulty: Difficulty
}

const lessonMeta: LessonMeta[] = [
  { id: 'parking-basics', topicId: 'parking', title: 'Nền tảng lùi chuồng', summary: 'Chọn điểm lùi, căn thân xe và sửa lệch trong ô đỗ tiêu chuẩn.', difficulty: 2 },
  { id: 'parking-underground', topicId: 'parking', title: 'Hầm gửi xe khó', summary: 'Dốc hầm, thiếu sáng và ô đỗ sát cột bê tông.', difficulty: 3 },
  { id: 'narrow-control', topicId: 'narrow', title: 'Kiểm soát xe trong ngõ', summary: 'Bò chậm, canh gương và ôm cua vuông góc.', difficulty: 2 },
  { id: 'narrow-negotiation', topicId: 'narrow', title: 'Ứng xử trong ngõ', summary: 'Nhường đường và xử lý khi xe máy tạt đầu.', difficulty: 3 },
  { id: 'highway-entry', topicId: 'highway', title: 'Vào và ra cao tốc', summary: 'Nhập làn, đọc biển báo và rời cao tốc đúng lối.', difficulty: 3 },
  { id: 'highway-flow', topicId: 'highway', title: 'Giữ nhịp trên cao tốc', summary: 'Khoảng cách an toàn, vượt xe tải và xử lý xe bám sát.', difficulty: 3 },
  { id: 'weather-slope', topicId: 'weather', title: 'Dốc và phanh động cơ', summary: 'Đổ đèo dài, khởi hành ngang dốc và dùng số thấp.', difficulty: 4 },
  { id: 'weather-flood', topicId: 'weather', title: 'Mưa lớn và đường ngập', summary: 'Quyết định khi gặp ngập và kỹ năng lái trong mưa.', difficulty: 4 }
]

interface TopicMeta {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
}

const topicMeta: TopicMeta[] = [
  { id: 'parking', slug: 'do-xe-hep', title: 'Đỗ xe không gian hẹp', description: 'Lùi chuồng, ghép ngang và xử lý hầm gửi xe chật.', icon: '↙', color: '#b7f36b' },
  { id: 'narrow', slug: 'ngo-hep', title: 'Ngõ hẹp & tránh xe', description: 'Đi chậm, canh gương và nhường đường trong ngõ.', icon: '↪', color: '#ffc66d' },
  { id: 'highway', slug: 'cao-toc', title: 'Nhập làn cao tốc', description: 'Vào làn, giữ khoảng cách, vượt xe và rời cao tốc.', icon: '→', color: '#77d7ff' },
  { id: 'weather', slug: 'doc-va-mua', title: 'Đổ đèo & mưa ngập', description: 'Phanh động cơ, khởi hành ngang dốc và đường ngập.', icon: '⌁', color: '#d49cff' }
]

const buildLessons = (topicId: string, cards: Card[]): Lesson[] =>
  lessonMeta
    .filter((meta) => meta.topicId === topicId)
    .map((meta) => {
      const lessonCards = cards.filter((card) => card.lessonId === meta.id)
      return {
        id: meta.id,
        topicId: meta.topicId,
        title: meta.title,
        summary: meta.summary,
        difficulty: meta.difficulty,
        estMinutes: lessonCards.reduce((total, card) => total + card.minutes, 0),
        isActive: lessonCards.length > 0,
        cards: lessonCards
      }
    })
    .filter((lesson) => lesson.cards.length > 0)

/** Cây nội dung đầy đủ, dùng cho công cụ biên tập và kiểm thử chất lượng. */
export const buildTopics = (cards: Card[]): Topic[] =>
  topicMeta
    .map((meta, index) => ({
      id: meta.id,
      slug: meta.slug,
      title: meta.title,
      description: meta.description,
      icon: meta.icon,
      color: meta.color,
      sortOrder: index + 1,
      isActive: true,
      lessons: buildLessons(meta.id, cards)
    }))
    .filter((topic) => topic.lessons.length > 0)

export const allTopics: Topic[] = buildTopics(allCards)
