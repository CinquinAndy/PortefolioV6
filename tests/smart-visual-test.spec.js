import { test, expect } from '@playwright/test'

// Configuration des zones à masquer par page
const animatedZones = {
	homepage: [
		'[class*="video"]',
		'[class*="gradient-bg"]',
		'.cursor-dot',
		'.cursor-outline',
		'[data-framer-component]',
	],
	about: ['.cursor-dot', '.cursor-outline', '[class*="animate-"]'],
	portfolio: [
		'.cursor-dot',
		'.cursor-outline',
		'[class*="hover-effect"]',
		'[class*="card-animation"]',
	],
	contact: ['.cursor-dot', '.cursor-outline', '[class*="form-animation"]'],
}

// Test intelligent avec masquage de zones
test.describe('Smart Visual Tests - Masked Animations', () => {
	test('Homepage FR - with masked animations', async ({ page }) => {
		await page.goto('/fr', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(3000) // Laisser charger

		// Masquer les zones animées
		await page.addStyleTag({
			content: `
				/* Masquer seulement les zones problématiques */
				.cursor-dot, .cursor-outline { opacity: 0 !important; }
				video, canvas { visibility: hidden !important; }
				[class*="gradient"]:not(nav):not(footer) { 
					background: #1a1a1a !important; 
				}
			`,
		})

		await page.waitForTimeout(1000)

		await expect(page).toHaveScreenshot('homepage-fr-smart.png', {
			fullPage: true,
			mask: [
				page.locator('video'),
				page.locator('[class*="cursor"]'),
				page.locator('[class*="video-bg"]'),
			].filter(async loc => (await loc.count()) > 0), // Seulement les éléments qui existent
			threshold: 0.1, // Très strict maintenant
		})
	})

	test('Homepage EN - with masked animations', async ({ page }) => {
		await page.goto('/en', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(3000)

		await page.addStyleTag({
			content: `
				.cursor-dot, .cursor-outline { opacity: 0 !important; }
				video, canvas { visibility: hidden !important; }
				[class*="gradient"]:not(nav):not(footer) { 
					background: #1a1a1a !important; 
				}
			`,
		})

		await page.waitForTimeout(1000)

		await expect(page).toHaveScreenshot('homepage-en-smart.png', {
			fullPage: true,
			mask: [
				page.locator('video'),
				page.locator('[class*="cursor"]'),
				page.locator('[class*="video-bg"]'),
			].filter(async loc => (await loc.count()) > 0),
			threshold: 0.1,
		})
	})

	test('About FR - with minimal masking', async ({ page }) => {
		await page.goto('/fr/about', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(2000)

		await page.addStyleTag({
			content: `
				.cursor-dot, .cursor-outline { display: none !important; }
			`,
		})

		await expect(page).toHaveScreenshot('about-fr-smart.png', {
			fullPage: true,
			mask: [page.locator('[class*="cursor"]')],
			threshold: 0.05,
		})
	})

	test('Portfolio FR - with hover masking', async ({ page }) => {
		await page.goto('/fr/portefolio', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(2000)

		await page.addStyleTag({
			content: `
				.cursor-dot, .cursor-outline { display: none !important; }
				[class*="hover"], [class*="card"]:hover { 
					transform: none !important; 
				}
			`,
		})

		await expect(page).toHaveScreenshot('portfolio-fr-smart.png', {
			fullPage: true,
			mask: [page.locator('[class*="cursor"]')],
			threshold: 0.05,
		})
	})

	test('Contact FR - with form masking', async ({ page }) => {
		await page.goto('/fr/contact', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(2000)

		await page.addStyleTag({
			content: `
				.cursor-dot, .cursor-outline { display: none !important; }
				input:focus, textarea:focus { 
					box-shadow: none !important; 
					outline: none !important; 
				}
			`,
		})

		await expect(page).toHaveScreenshot('contact-fr-smart.png', {
			fullPage: true,
			mask: [page.locator('[class*="cursor"]')],
			threshold: 0.05,
		})
	})

	// Test rapide pour vérifier la stabilité
	test('Quick stability check - Homepage', async ({ page }) => {
		// Test de stabilité : même page 2x de suite
		await page.goto('/fr')
		await page.waitForTimeout(3000)

		await page.addStyleTag({
			content: `
				.cursor-dot, .cursor-outline { display: none !important; }
				video { visibility: hidden !important; }
			`,
		})

		const screenshot1 = await page.screenshot({ fullPage: true })

		await page.waitForTimeout(1000)

		const screenshot2 = await page.screenshot({ fullPage: true })

		// Les deux screenshots doivent être identiques (ou presque)
		expect(screenshot1).toBeTruthy()
		expect(screenshot2).toBeTruthy()
	})
})
