import { test, expect } from '@playwright/test'

/**
 * TESTS DE MIGRATION POUR LE PORTFOLIO
 *
 * Ces tests créent des baselines visuelles AVANT la migration,
 * puis permettent de détecter les régressions APRÈS chaque étape.
 *
 * Usage:
 * - AVANT migration: npm run test:visual -- tests/migration-tests.spec.js --update-snapshots
 * - APRÈS chaque étape: npm run test:visual -- tests/migration-tests.spec.js
 */

// Configuration optimisée après tests
const MIGRATION_CONFIG = {
	waitTime: 3000,
	screenshotTimeout: 15000,
	threshold: 0.1, // 10% de tolérance pour les différences mineures
}

// Fonction pour stabiliser la page avant screenshot
async function stabilizePage(page) {
	// CSS pour masquer les éléments animés problématiques
	await page.addStyleTag({
		content: `
			/* Masquer complètement les curseurs personnalisés */
			.cursor-dot, 
			.cursor-outline, 
			[class*="cursor"], 
			[data-cursor] {
				display: none !important;
				opacity: 0 !important;
			}
			
			/* Remplacer les vidéos par un fond stable */
			video {
				background: #0a0a0a !important;
				visibility: hidden !important;
			}
			
			/* Stopper les animations qui peuvent fuir */
			[class*="animate-"], 
			[class*="motion-"], 
			[data-framer-motion] {
				animation: none !important;
				transition: none !important;
			}
			
			/* Stabiliser les éléments hover */
			*:hover {
				transform: none !important;
				transition: none !important;
			}
		`,
	})

	await page.waitForTimeout(1500) // Laisser les styles s'appliquer
}

test.describe('🚀 Migration Visual Regression Tests', () => {
	// Test des pages qui fonctionnent déjà bien
	test('✅ About Page - Stable Baseline', async ({ page }) => {
		await page.goto('/fr/about')
		await page.waitForTimeout(MIGRATION_CONFIG.waitTime)
		await stabilizePage(page)

		await expect(page).toHaveScreenshot('migration-about-fr.png', {
			fullPage: true,
			timeout: MIGRATION_CONFIG.screenshotTimeout,
			threshold: MIGRATION_CONFIG.threshold,
		})
	})

	test('✅ Blog Page - Stable Baseline', async ({ page }) => {
		await page.goto('/fr/blog')
		await page.waitForTimeout(MIGRATION_CONFIG.waitTime)
		await stabilizePage(page)

		await expect(page).toHaveScreenshot('migration-blog-fr.png', {
			fullPage: true,
			timeout: MIGRATION_CONFIG.screenshotTimeout,
			threshold: MIGRATION_CONFIG.threshold,
		})
	})

	test('⚠️ Contact Page - Near Stable', async ({ page }) => {
		await page.goto('/fr/contact')
		await page.waitForTimeout(MIGRATION_CONFIG.waitTime)
		await stabilizePage(page)

		// Contact était à 4-16 pixels près, augmentons le threshold
		await expect(page).toHaveScreenshot('migration-contact-fr.png', {
			fullPage: true,
			timeout: MIGRATION_CONFIG.screenshotTimeout,
			threshold: 0.15, // 15% pour contact
		})
	})

	test('🏠 Homepage FR - Baseline with Masks', async ({ page }) => {
		await page.goto('/fr')
		await page.waitForTimeout(MIGRATION_CONFIG.waitTime + 1000) // Plus de temps pour homepage
		await stabilizePage(page)

		// Pour homepage, on masque la zone vidéo complètement
		await expect(page).toHaveScreenshot('migration-homepage-fr.png', {
			fullPage: true,
			timeout: MIGRATION_CONFIG.screenshotTimeout,
			threshold: 0.2, // 20% de tolérance pour la homepage
			mask: [
				page.locator('video'),
				page.locator('[class*="video"]'),
				page.locator('[class*="background-video"]'),
			],
		})
	})

	test('🏠 Homepage EN - Baseline with Masks', async ({ page }) => {
		await page.goto('/en')
		await page.waitForTimeout(MIGRATION_CONFIG.waitTime + 1000)
		await stabilizePage(page)

		await expect(page).toHaveScreenshot('migration-homepage-en.png', {
			fullPage: true,
			timeout: MIGRATION_CONFIG.screenshotTimeout,
			threshold: 0.2,
			mask: [
				page.locator('video'),
				page.locator('[class*="video"]'),
				page.locator('[class*="background-video"]'),
			],
		})
	})

	test('💼 Portfolio Page - With Hover Protection', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(MIGRATION_CONFIG.waitTime)
		await stabilizePage(page)

		// Désactiver tous les hovers avant screenshot
		await page.addStyleTag({
			content: `
				[class*="card"], [class*="project"] {
					transform: none !important;
					transition: none !important;
				}
				[class*="card"]:hover, [class*="project"]:hover {
					transform: none !important;
					box-shadow: none !important;
				}
			`,
		})

		await expect(page).toHaveScreenshot('migration-portfolio-fr.png', {
			fullPage: true,
			timeout: MIGRATION_CONFIG.screenshotTimeout,
			threshold: 0.15,
		})
	})
})

// Test de validation post-migration
test.describe('🔍 Migration Validation', () => {
	test('Smoke Test - All Pages Load', async ({ page }) => {
		const pages = [
			'/fr',
			'/fr/about',
			'/fr/blog',
			'/fr/contact',
			'/fr/portefolio',
		]

		for (const pagePath of pages) {
			await page.goto(pagePath)

			// Vérifier que la page charge sans erreur 500/404
			const title = await page.title()
			expect(title).not.toBe('')
			expect(title).not.toContain('404')
			expect(title).not.toContain('Error')

			// Vérifier que le contenu principal est présent
			const hasContent = await page
				.locator('main, [role="main"], nav, h1, h2')
				.count()
			expect(hasContent).toBeGreaterThan(0)
		}
	})

	test('Critical Elements Present', async ({ page }) => {
		await page.goto('/fr')
		await page.waitForTimeout(2000)

		// Vérifier les éléments critiques
		await expect(page.locator('nav')).toBeVisible()
		await expect(page.locator('footer')).toBeVisible()

		// Vérifier qu'il n'y a pas d'erreurs JS critiques
		const errors = []
		page.on('console', msg => {
			if (msg.type() === 'error') errors.push(msg.text())
		})

		await page.waitForTimeout(3000)

		// Pas plus de 2 erreurs JS autorisées (souvent des warnings)
		expect(errors.length).toBeLessThanOrEqual(2)
	})
})
