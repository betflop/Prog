import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
