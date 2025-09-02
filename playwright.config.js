import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	workers: process.env.CI ? 1 : undefined,
	// Commenté pour éviter les conflits de port
	// webServer: {
	// 	url: 'http://localhost:3000',
	// 	timeout: 120 * 1000,
	// 	reuseExistingServer: !process.env.CI,
	// 	command: 'npm run dev',
	// },
	use: {
		video: 'retain-on-failure',
		trace: 'on-first-retry',
		// Configuration pour les screenshots visuels
		screenshot: 'only-on-failure',
		baseURL: 'http://localhost:3000',
		actionTimeout: 30000, // Timeout pour les actions
	},
	timeout: 90000, // Timeout global augmenté pour les tests visuels
	testDir: './tests',
	retries: process.env.CI ? 2 : 0,
	reporter: [['html'], ['list']],

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
	],

	fullyParallel: true,

	forbidOnly: !!process.env.CI,
})
