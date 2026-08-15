import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Multi-page build: /blog.html vira uma página estática separada,
      // sem depender de um router dentro do app React principal.
      input: {
        main: 'index.html',
        blog: 'blog.html',
      },
    },
  },
})
