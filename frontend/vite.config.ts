/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';



/**
 * This is the configuration file for Vite.
 * It exports a default configuration object using defineConfig().
 * The configuration includes plugins for React, test settings, and resolve aliases.
 */

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: resolve(__dirname, './src/TestSetup.ts'),
    css: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  }
});


