import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Multi-page build: /blog.html vira uma página estática separada,
      // sem depender de um router dentro do app React principal.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        blog: fileURLToPath(new URL('./blog.html', import.meta.url)),
      },
    },
  },
})
