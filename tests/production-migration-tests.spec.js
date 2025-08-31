import { test, expect } from '@playwright/test'

/**
 * 🚀 TESTS DE MIGRATION PRODUCTION - ÉTAT FINAL
 *
 * Ces tests représentent la baseline finale pour la migration.
 * 5 pages avec screenshots visuels + 1 page avec test fonctionnel.
 */

const CONFIG = {
	waitTime: 3000,
	screenshotTimeout: 15000,
	threshold: 0.1,
}

async function stabilizePage(page) {
	await page.addStyleTag({
		content: `
			.cursor-dot, .cursor-outline, [class*="cursor"], [data-cursor] {
				display: none !important;
			}
			video { visibility: hidden !important; }
			[class*="animate-"], [class*="motion-"], [data-framer-motion] {
				animation: none !important;
				transition: none !important;
			}
			*:hover { transform: none !important; transition: none !important; }
		`,
	})
	await page.waitForTimeout(1500)
}

test.describe('🚀 PRODUCTION Migration Tests', () => {
	test('✅ About Page', async ({ page }) => {
		await page.goto('/fr/about')
		await page.waitForTimeout(CONFIG.waitTime)
		await stabilizePage(page)

		await expect(page).toHaveScreenshot('prod-about-fr.png', {
			fullPage: true,
			timeout: CONFIG.screenshotTimeout,
			threshold: CONFIG.threshold,
		})
	})

	test('✅ Blog Page', async ({ page }) => {
		await page.goto('/fr/blog')
		await page.waitForTimeout(CONFIG.waitTime)
		await stabilizePage(page)

		await expect(page).toHaveScreenshot('prod-blog-fr.png', {
			fullPage: true,
			timeout: CONFIG.screenshotTimeout,
			threshold: CONFIG.threshold,
		})
	})

	test('✅ Contact Page', async ({ page }) => {
		await page.goto('/fr/contact')
		await page.waitForTimeout(CONFIG.waitTime)
		await stabilizePage(page)

		await expect(page).toHaveScreenshot('prod-contact-fr.png', {
			fullPage: true,
			timeout: CONFIG.screenshotTimeout,
			threshold: 0.15,
		})
	})

	test('✅ Homepage FR', async ({ page }) => {
		await page.goto('/fr')
		await page.waitForTimeout(CONFIG.waitTime + 1000)
		await stabilizePage(page)

		await expect(page).toHaveScreenshot('prod-homepage-fr.png', {
			fullPage: true,
			timeout: CONFIG.screenshotTimeout,
			threshold: 0.2,
			mask: [page.locator('video'), page.locator('[class*="video"]')],
		})
	})

	test('✅ Homepage EN', async ({ page }) => {
		await page.goto('/en')
		await page.waitForTimeout(CONFIG.waitTime + 1000)
		await stabilizePage(page)

		await expect(page).toHaveScreenshot('prod-homepage-en.png', {
			fullPage: true,
			timeout: CONFIG.screenshotTimeout,
			threshold: 0.2,
			mask: [page.locator('video'), page.locator('[class*="video"]')],
		})
	})

	test('⚠️ Portfolio Page - Functional Test Only', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(CONFIG.waitTime)

		// Test fonctionnel robuste au lieu de screenshot
		const title = await page.title()
		expect(title).toContain('Portfolio')

		// Vérifier les éléments clés du portfolio
		const portfolioCards = await page
			.locator('[class*="card"], [class*="project"], article, .portfolio-item')
			.count()
		expect(portfolioCards).toBeGreaterThan(5) // Au moins 5 projets

		// Vérifier la navigation
		const hasNavigation = await page.locator('nav').count()
		expect(hasNavigation).toBeGreaterThan(0)

		// Vérifier le footer
		const hasFooter = await page.locator('footer').count()
		expect(hasFooter).toBeGreaterThan(0)

		// Test de clic sur le premier projet (si présent)
		const firstProject = page
			.locator('[class*="card"], [class*="project"]')
			.first()
		if ((await firstProject.count()) > 0) {
			const isClickable = await firstProject.isVisible()
			expect(isClickable).toBeTruthy()
		}

		console.log(
			`✅ Portfolio: ${portfolioCards} projects found - functional test PASSED`
		)
	})
})

test.describe('🔍 Production Validation', () => {
	test('✅ All Pages Load and Function', async ({ page }) => {
		const pages = [
			{ path: '/fr', name: 'Homepage FR' },
			{ path: '/en', name: 'Homepage EN' },
			{ path: '/fr/about', name: 'About' },
			{ path: '/fr/blog', name: 'Blog' },
			{ path: '/fr/contact', name: 'Contact' },
			{ path: '/fr/portefolio', name: 'Portfolio' },
		]

		const results = []

		for (const pageInfo of pages) {
			await page.goto(pageInfo.path)
			await page.waitForTimeout(2000)

			const title = await page.title()
			const contentElements = await page
				.locator('main, [role="main"], nav, h1, h2, article, section')
				.count()
			const hasErrors = (await page.locator('text=404').count()) > 0

			const success = title !== '' && !hasErrors && contentElements > 2

			results.push({
				name: pageInfo.name,
				path: pageInfo.path,
				success,
				contentElements,
				title: title.substring(0, 50),
			})
		}

		// Vérifier que TOUTES les pages passent
		const failedPages = results.filter(r => !r.success)
		expect(failedPages.length).toBe(0)

		// Afficher le résumé
		console.log('\n🎉 MIGRATION BASELINE SUMMARY:')
		results.forEach(r => {
			console.log(`✅ ${r.name}: ${r.contentElements} elements`)
		})
		console.log(`\n📊 Status: ${results.length}/6 pages ready for migration`)
	})

	test('✅ Critical Navigation Works', async ({ page }) => {
		await page.goto('/fr')
		await page.waitForTimeout(2000)

		// Test navigation vers About
		const aboutLink = page.locator('a[href*="about"], a[href="/fr/about"]')
		if ((await aboutLink.count()) > 0) {
			await aboutLink.first().click()
			await page.waitForTimeout(1000)
			const url = page.url()
			expect(url).toContain('about')
		}

		// Retour à l'accueil
		await page.goto('/fr')
		await page.waitForTimeout(1000)

		// Test navigation vers Portfolio
		const portfolioLink = page.locator(
			'a[href*="portefolio"], a[href="/fr/portefolio"]'
		)
		if ((await portfolioLink.count()) > 0) {
			await portfolioLink.first().click()
			await page.waitForTimeout(1000)
			const url = page.url()
			expect(url).toContain('portefolio')
		}

		console.log('✅ Critical navigation paths working')
	})
})

/**
 * 📋 INSTRUCTIONS D'UTILISATION:
 *
 * 1. AVANT migration:
 *    npm run test:visual -- tests/production-migration-tests.spec.js --update-snapshots
 *
 * 2. APRÈS chaque étape de migration:
 *    npm run test:visual -- tests/production-migration-tests.spec.js
 *
 * 3. Si accepté les changements:
 *    npm run test:visual:update
 *
 * 4. Status attendu: 8/8 tests PASS
 *    - 5 tests visuels (About, Blog, Contact, Homepage FR/EN)
 *    - 1 test fonctionnel (Portfolio)
 *    - 2 tests de validation (Load + Navigation)
 */
