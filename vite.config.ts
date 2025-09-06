import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

export default defineConfig(({ mode }) => ({
  plugins: [analog()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
