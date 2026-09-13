import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { allCards } from './topics'
import { assetManifest, assets, getAsset, getCardAssets, offlineSizeKb } from './assets'
import { CORE_PACK_BUDGET_KB, MAX_ASSET_KB } from './validation'
import { CONTENT_VERSION } from './version'

const publicDir = resolve(process.cwd(), 'public')
const readAsset = (url: string) => readFileSync(resolve(publicDir, url.replace(/^\//, '')), 'utf8').replace(/\r\n/g, '\n')
const checksumOf = (value: string) => `sha256-${createHash('sha256').update(value, 'utf8').digest('hex')}`
const sizeKbOf = (value: string) => Math.round((Buffer.byteLength(value, 'utf8') / 1024) * 100) / 100

describe('sơ đồ SVG tự tạo', () => {
  it('manifest khớp phiên bản nội dung và ghi rõ nguồn gốc', () => {
    expect(assetManifest.contentVersion).toBe(CONTENT_VERSION)
    expect(assetManifest.generator).toBe('scripts/generate-assets.mjs')
    expect(assetManifest.license).toMatch(/tự tạo/i)
    expect(assets).toHaveLength(allCards.length * 2)
  })

  it('mỗi thẻ có một sơ đồ chính và một sơ đồ biến thể', () => {
    for (const card of allCards) {
      const cardAssets = getCardAssets(card.id)
      expect(cardAssets.map(asset => asset.role).sort()).toEqual(['main', 'variant'])
      expect(card.assetIds.every(id => getAsset(id) !== undefined)).toBe(true)
    }
  })

  it('tệp trên đĩa khớp checksum và dung lượng trong manifest', () => {
    for (const asset of assets) {
      const content = readAsset(asset.url)
      expect(checksumOf(content)).toBe(asset.checksum)
      expect(sizeKbOf(content)).toBe(asset.sizeKb)
      expect(asset.sizeKb).toBeLessThanOrEqual(MAX_ASSET_KB)
    }
  })

  it('mọi sơ đồ đều có tiêu đề trợ năng và mô tả thay thế', () => {
    for (const asset of assets) {
      const content = readAsset(asset.url)
      expect(content).toContain('role="img"')
      expect(content).toContain('<title')
      expect(asset.alt.length).toBeGreaterThan(10)
      expect(asset.caption.length).toBeGreaterThan(0)
    }
  })

  it('gói offline nằm trong ngân sách dung lượng', () => {
    expect(offlineSizeKb).toBeLessThanOrEqual(CORE_PACK_BUDGET_KB)
    expect(assetManifest.totalSizeKb).toBeCloseTo(offlineSizeKb, 1)
  })
})
