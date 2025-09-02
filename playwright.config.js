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
		// Configuration pour les screenshots visuels
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
	},
	timeout: 90000, // Timeout global augmenté pour les tests visuels
	testDir: './tests',
	retries: process.env.CI ? 2 : 0,
	reporter: ['html', 'list'],

	projects: [
		{
			use: {
				...devices['Desktop Chrome'],
				// Configuration spécifique pour les tests visuels
				viewport: { width: 1920, height: 1080 },
				ignoreHTTPSErrors: true,
			},
			name: 'chromium',
		},
		{
			use: {
				...devices['Desktop Firefox'],
				viewport: { width: 1920, height: 1080 },
			},
			name: 'firefox',
		},
		{
			use: {
				...devices['Desktop Safari'],
				viewport: { width: 1920, height: 1080 },
			},
			name: 'webkit',
		},
	],

	fullyParallel: true,

	forbidOnly: !!process.env.CI,
})
