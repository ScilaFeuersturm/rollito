import { defineConfig, devices } from '@playwright/test'

// Tests E2E contra el sitio construido (dist/), servido con `vite preview`.
// Se corren con `npm run test:e2e` (construye y después prueba). Los archivos terminan en .e2e.ts
// para que Vitest no los tome como tests unitarios.
export default defineConfig({
  testDir: 'e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry', // si un test falla y se reintenta, guarda una traza para investigarlo
  },
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'] } },
    { name: 'celular', use: { ...devices['Pixel 7'] } },
  ],
})
