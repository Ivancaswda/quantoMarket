import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: './postcss.config.js', // Ensure the PostCSS config is correctly pointed to
  },
});