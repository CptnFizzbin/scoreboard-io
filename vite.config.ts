import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import viteReact from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import { fileURLToPath, URL } from "node:url"
import basicSsl from "@vitejs/plugin-basic-ssl"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      generatedRouteTree: fileURLToPath(new URL('./src/integrations/tanstack-router/route-tree.gen.ts', import.meta.url))
    }),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    checker({
      typescript: true,
      biome: true,
    }),
    basicSsl({
      certDir: fileURLToPath(new URL('./.certs', import.meta.url)),
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 600, //KB

    rollupOptions: {
      output: {
        manualChunks: (url) => {
          switch (true) {
            case url.includes('/@fortawesome'):
              return 'vendor-fortawesome'
            case url.includes('node_modules'):
              return 'vendor'
            default:
              return 'main'
          }
        }
      }
    }
  },

  test: {
    setupFiles: fileURLToPath(new URL('./vitest.setup.ts', import.meta.url)),
  },
});
