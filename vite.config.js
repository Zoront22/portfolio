import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Para GitHub Pages: cambia esto a '/nombre-repo/' si despliegas en user.github.io/repo
  // Para Netlify/Vercel/Cloudflare Pages: déjalo en '/'
  base: '/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Nombres de archivo con hash para cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },

  server: {
    port: 3000,
    open: true,
    host: true
  },

  // Optimización de CSS
  css: {
    devSourcemap: true
  }
});