import { test, expect } from '@playwright/test'

// Configuration pragmatique pour la migration
const testConfig = {
	waitTime: 4000,
	screenshotTimeout: 10000,
	threshold: 0.05, // Très strict une fois stabilisé
}

// Fonction utilitaire pour masquer les animations
async function hideAnimations(page) {
	await page.addStyleTag({
		content: `
			/* Masquer tous les éléments animés connus */
			.cursor-dot, .cursor-outline, [class*="cursor"] {
				display: none !important;
			}
			
			/* Remplacer les vidéos par un fond noir */
			video {
				visibility: hidden !important;
			}
			
			/* Figer les éléments qui peuvent bouger */
			[class*="animate"], [class*="motion"] {
				animation: none !important;
				transition: none !important;
			}
		`,
	})
}

test.describe('Production Ready Visual Tests', () => {
	test('🏠 Homepage FR - Production Baseline', async ({ page }) => {
		await page.goto('/fr')
		await page.waitForTimeout(testConfig.waitTime)
		await hideAnimations(page)
		await page.waitForTimeout(1000)

		await expect(page).toHaveScreenshot('baseline-homepage-fr.png', {
			fullPage: true,
			timeout: testConfig.screenshotTimeout,
		})
	})

	test('🏠 Homepage EN - Production Baseline', async ({ page }) => {
		await page.goto('/en')
		await page.waitForTimeout(testConfig.waitTime)
		await hideAnimations(page)
		await page.waitForTimeout(1000)

		await expect(page).toHaveScreenshot('baseline-homepage-en.png', {
			fullPage: true,
			timeout: testConfig.screenshotTimeout,
		})
	})

	test('👤 About FR - Production Baseline', async ({ page }) => {
		await page.goto('/fr/about')
		await page.waitForTimeout(2000)
		await hideAnimations(page)

		await expect(page).toHaveScreenshot('baseline-about-fr.png', {
			fullPage: true,
			timeout: testConfig.screenshotTimeout,
			threshold: testConfig.threshold,
		})
	})

	test('💼 Portfolio FR - Production Baseline', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(2000)
		await hideAnimations(page)

		await expect(page).toHaveScreenshot('baseline-portfolio-fr.png', {
			fullPage: true,
			timeout: testConfig.screenshotTimeout,
			threshold: testConfig.threshold,
		})
	})

	test('📱 Contact FR - Production Baseline', async ({ page }) => {
		await page.goto('/fr/contact')
		await page.waitForTimeout(2000)
		await hideAnimations(page)

		await expect(page).toHaveScreenshot('baseline-contact-fr.png', {
			fullPage: true,
			timeout: testConfig.screenshotTimeout,
			threshold: testConfig.threshold,
		})
	})

	test('📖 Blog FR - Production Baseline', async ({ page }) => {
		await page.goto('/fr/blog')
		await page.waitForTimeout(2000)
		await hideAnimations(page)

		await expect(page).toHaveScreenshot('baseline-blog-fr.png', {
			fullPage: true,
			timeout: testConfig.screenshotTimeout,
			threshold: testConfig.threshold,
		})
	})
})

// Test de stabilité final
test.describe('🔍 Migration Stability Tests', () => {
	test('Consistency check - Same page multiple times', async ({ page }) => {
		const results = []

		// Tester la page About 3 fois de suite
		for (let i = 0; i < 3; i++) {
			await page.goto('/fr/about')
			await page.waitForTimeout(2000)
			await hideAnimations(page)

			const screenshot = await page.screenshot({
				fullPage: true,
				path: `tests/stability-check-${i}.png`,
			})
			results.push(screenshot.length)
		}

		// Les 3 screenshots doivent avoir des tailles similaires (±5%)
		const avgSize = results.reduce((a, b) => a + b, 0) / results.length
		results.forEach(size => {
			const variance = Math.abs((size - avgSize) / avgSize)
			expect(variance).toBeLessThan(0.05) // Max 5% de variance
		})
	})
})
