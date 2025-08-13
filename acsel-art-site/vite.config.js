import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  //base: '/AcselArt/',
  server: {
    fs: {
      allow: [
        '.', 
        path.resolve(__dirname, '../'), 
      ]
    }
  }
})