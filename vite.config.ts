import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'content/svg/*.svg'],
      manifest: {
        name: 'Lái Xe Nhàn',
        short_name: 'Lái Xe Nhàn',
        description: 'Học lái xe thực tế, ngắn gọn và an toàn.',
        theme_color: '#0e1715',
        background_color: '#0e1715',
        display: 'standalone',
        lang: 'vi',
        icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }]
      },
      workbox: {
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: { cacheName: 'lesson-assets', expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 } }
          },
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.json'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'content-pack' }
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-schema': ['zod', 'idb'],
          'vendor-supabase': ['@supabase/supabase-js']
        }
      }
    }
  }
})

