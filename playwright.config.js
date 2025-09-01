import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	workers: process.env.CI ? 1 : undefined,
	webServer: {
		url: 'http://localhost:3000',
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
		command: 'npm run dev',
	},
	use: {
		trace: 'on-first-retry',
		baseURL: 'http://localhost:3000',
		actionTimeout: 30000, // Timeout pour les actions
	},
	timeout: 60000, // Timeout global de 60s par test
	testDir: './tests',
	retries: process.env.CI ? 2 : 0,
	reporter: 'html',

	projects: [
		{
			use: { ...devices['Desktop Chrome'] },
			name: 'chromium',
		},
	],

	fullyParallel: true,

	forbidOnly: !!process.env.CI,
})
