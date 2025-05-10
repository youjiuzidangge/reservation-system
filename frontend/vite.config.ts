import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      outDir: 'dist'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    preview: {
      port: Number(env.VITE_PORT) || 3000,
      host: true
    },
    server: {
      port: Number(env.VITE_PORT) || 3000,
      host: true,
      proxy: {
        '/graphql': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
        '/auth': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
