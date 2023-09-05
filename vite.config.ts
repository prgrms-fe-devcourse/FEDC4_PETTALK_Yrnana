import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '.',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@/components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@/libs', replacement: path.resolve(__dirname, 'src/libs') },
      { find: '@/assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@/styles', replacement: path.resolve(__dirname, 'src/styles') },
    ],
  },
})
