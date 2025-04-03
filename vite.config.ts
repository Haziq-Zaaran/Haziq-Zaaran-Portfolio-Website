
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable source maps for production (helps with debugging)
    sourcemap: true,
    // Ensure assets have cache-busting hashes
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
        },
        // Adds content hashes to asset filenames for cache busting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Target specific browser versions for better compatibility
    target: ['es2018', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
  },
  css: {
    // Add prefixer for better browser compatibility
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  },
  // Add test configuration for browser compatibility testing
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  }
}));
