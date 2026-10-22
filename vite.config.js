import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sourcePlugin from './scripts/source-plugin.js'

export default defineConfig({
  plugins: [sourcePlugin(), react(), tailwindcss()],
})
