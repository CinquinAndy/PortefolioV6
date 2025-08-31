import { test, expect } from '@playwright/test'

// Test pour identifier exactement ce qui bouge sur Portfolio
test.describe('Portfolio Debug - Find Animation Source', () => {
	test('🔍 Identify moving elements', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(3000)

		// Prendre un screenshot de base
		const screenshot1 = await page.screenshot({ fullPage: true })

		// Attendre et prendre un autre screenshot
		await page.waitForTimeout(2000)
		const screenshot2 = await page.screenshot({ fullPage: true })

		// Les comparer - si différents, il y a de l'animation
		expect(screenshot1.length).toBeGreaterThan(0)
		expect(screenshot2.length).toBeGreaterThan(0)

		// Identifier les éléments suspects
		const animatedElements = await page.evaluate(() => {
			const elements = document.querySelectorAll('*')
			const animated = []

			elements.forEach(el => {
				const style = getComputedStyle(el)

				// Vérifier les animations CSS
				if (style.animation !== 'none' && style.animation !== '') {
					animated.push({
						tag: el.tagName,
						classes: el.className,
						animation: style.animation,
						type: 'css-animation',
					})
				}

				// Vérifier les transitions
				if (style.transition !== 'all 0s ease 0s' && style.transition !== '') {
					animated.push({
						tag: el.tagName,
						classes: el.className,
						transition: style.transition,
						type: 'css-transition',
					})
				}
			})

			return animated
		})

		console.log('🎯 Animated elements found:', animatedElements)

		// Le test réussit toujours, c'est juste pour debug
		expect(true).toBeTruthy()
	})

	test('🎯 Try partial masking approach', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(3000)

		// Approche 1: Masquer seulement le header/hero
		await expect(page).toHaveScreenshot('portfolio-mask-header.png', {
			fullPage: true,
			mask: [
				page.locator('header'),
				page.locator('[class*="hero"]'),
				page.locator('[class*="banner"]'),
			],
			threshold: 0.1,
			timeout: 10000,
		})
	})

	test('🎯 Try content-only approach', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(3000)

		// Approche 2: Screenshot seulement du contenu principal
		const mainContent = page.locator('main, [role="main"], .main-content')

		if ((await mainContent.count()) > 0) {
			await expect(mainContent.first()).toHaveScreenshot(
				'portfolio-main-content.png',
				{
					threshold: 0.1,
					timeout: 10000,
				}
			)
		} else {
			// Fallback: masquer tout sauf le contenu central
			await expect(page).toHaveScreenshot('portfolio-center-only.png', {
				fullPage: false, // Viewport seulement
				mask: [
					page.locator('nav'),
					page.locator('footer'),
					page.locator('[class*="cursor"]'),
				],
				threshold: 0.15,
				timeout: 10000,
			})
		}
	})

	test('🎯 Try freeze-frame approach', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(3000)

		// Approche 3: "Freeze frame" - figer tout avec JavaScript
		await page.evaluate(() => {
			// Stopper toutes les animations en cours
			document.getAnimations().forEach(anim => anim.pause())

			// Figer le temps pour les animations basées sur Date/Time
			const now = Date.now()
			Date.now = () => now

			// Désactiver setTimeout/setInterval pour les nouvelles animations
			window.setTimeout = (fn, delay) => fn() // Exécute immédiatement
			window.setInterval = () => {} // Ne fait rien
		})

		await page.waitForTimeout(1000)

		await expect(page).toHaveScreenshot('portfolio-freeze-frame.png', {
			fullPage: true,
			threshold: 0.1,
			timeout: 10000,
		})
	})
})
