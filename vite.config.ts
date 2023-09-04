import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    port: 9000,
    open: true,
  },
  resolve: {
    alias: {
      'public': fileURLToPath(new URL('public/', import.meta.url)),
      'src': fileURLToPath(new URL('src/', import.meta.url)),
      'assets': fileURLToPath(new URL('src/assets/', import.meta.url)),
      'components': fileURLToPath(new URL('src/components', import.meta.url)),
      'custom-types': fileURLToPath(new URL('src/custom-types/index.ts', import.meta.url)),
      'mock-data': fileURLToPath(new URL('src/mock-data/index.ts', import.meta.url)),
      'scss': fileURLToPath(new URL('src/scss/', import.meta.url)),
      'layouts': fileURLToPath(new URL('src/layouts/', import.meta.url)),
      'pages': fileURLToPath(new URL('src/pages/', import.meta.url)),
      'router': fileURLToPath(new URL('src/router/', import.meta.url)),
      'stores': fileURLToPath(new URL('src/stores/', import.meta.url)),
      'utils': fileURLToPath(new URL('src/utils/', import.meta.url)),
      '~bootstrap': fileURLToPath(new URL('node_modules/bootstrap', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "scss/custom-variables.scss";`
      }
    }
  }
})
