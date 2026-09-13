import manifestJson from './asset-manifest.json'
import type { AssetManifest, CardAsset } from '../types'

/** Metadata asset do `scripts/generate-assets.mjs` sinh ra, có checksum và dung lượng. */
export const assetManifest = manifestJson as AssetManifest

export const assets: CardAsset[] = assetManifest.assets

const assetById = new Map(assets.map((asset) => [asset.id, asset]))

export const getAsset = (id: string): CardAsset | undefined => assetById.get(id)

export const getCardAssets = (cardId: string): CardAsset[] => assets.filter((asset) => asset.cardId === cardId)

/** Tổng dung lượng gói offline lõi, dùng để theo dõi ngân sách tải về. */
export const offlineSizeKb = Math.round(
  assets.filter((asset) => asset.offlinePack === 'core').reduce((total, asset) => total + asset.sizeKb, 0) * 100
) / 100
