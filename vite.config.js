import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('gsap')) return 'vendor-gsap'
          if (id.includes('@supabase/supabase-js')) return 'vendor-supabase'
          if (id.includes('motion')) return 'vendor-motion'
          if (id.includes('react') || id.includes('scheduler')) return 'vendor-react'

          return 'vendor'
        },
      },
    },
  },
  server: {
    allowedHosts: true,
    port: 5173,
    strictPort: true,
  },
})
