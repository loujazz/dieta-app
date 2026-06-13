import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // GitHub Pages serves the site from /dieta-app/. The deploy workflow sets
  // GITHUB_PAGES=true so the bundle uses the right sub-path, while local dev
  // and root-domain hosts (e.g. Vercel) keep using '/'.
  base: process.env.GITHUB_PAGES ? '/dieta-app/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Dieta Luigi Parisi',
        short_name: 'Dieta',
        description: 'App per consultare rapidamente le indicazioni alimentari',
        theme_color: '#059669',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        // Relative so the installed PWA opens correctly both at the domain
        // root (Vercel) and under the /dieta-app/ sub-path (GitHub Pages).
        start_url: '.',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
