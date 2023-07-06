export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    'nuxt-icon',
    '@unocss/nuxt',
  ],
  ssr: false,
  eslint: {
    lintOnStart: false,
  },
  components: [
    { path: '~/components/form' },
    { path: '~/components/misc' },
    '~/components',
  ],
  vite: {
    server: {
      hmr: process.env.HMR_PORT
        ? {
            protocol: 'wss',
            clientPort: +process.env.HMR_PORT,
          }
        : {},
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'QR Vault',
      short_name: 'QR Vault',
      icons: [
        // { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        // { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#1F2937',
      background_color: '#1F2937',
      display: 'standalone',
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
})
