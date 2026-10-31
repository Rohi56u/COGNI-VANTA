import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: []
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        physics: 'physics.html',
        biology: 'biology.html',
        history: 'history.html'
      }
    }
  },
  server: {
    port: 5173,
    allowedHosts: ['4173-ir0s2xq89bolq37junkrb-e54e7502.sg2.manus.computer'],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
