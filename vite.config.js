import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          darkMode: 'class', // enable class-based dark mode
          theme: {
            extend: {
              colors: {
                primary: '#2563EB',   // Blue-600
                secondary: '#F59E0B', // Amber-500
              },
            },
          },
          content: [
            './index.html',
            './src/**/*.{js,ts,jsx,tsx}',
          ],
        }),
        autoprefixer,
      ],
    },
  },
})
