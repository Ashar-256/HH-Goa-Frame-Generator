import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Relative base path for GitHub Pages subpath compatibility
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true
  }
});
