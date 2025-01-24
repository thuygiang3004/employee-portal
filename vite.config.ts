import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import type { UserConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(),],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    deps: {
      inline: [/vue-router/, '@vue', 'vue']
    },
    threads: false
  }
} as UserConfig) 