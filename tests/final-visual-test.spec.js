import { test, expect } from '@playwright/test'

// Test final ultra-agressif pour stopper toutes les animations
test.describe('Final Visual Tests - Migration Ready', () => {
	test('Homepage FR - baseline creation', async ({ page }) => {
		// Configuration ultra-stricte
		await page.addInitScript(() => {
			// Stopper TOUTES les animations avant même que la page charge
			const style = document.createElement('style')
			style.textContent = `
				*, *::before, *::after {
					animation-duration: 0s !important;
					animation-delay: 0s !important;
					transition-duration: 0s !important;
					transition-delay: 0s !important;
					transform: none !important;
				}
				
				/* Masquer complètement les éléments problématiques */
				[class*="cursor"], [data-cursor], .cursor-dot, .cursor-outline {
					display: none !important;
				}
				
				/* Stopper toutes les animations Framer Motion */
				[data-framer-component], [data-framer-motion] {
					animation: none !important;
					transition: none !important;
				}
				
				/* Stabiliser les backgrounds animés */
				video, canvas, [class*="gradient"], [class*="animate"] {
					display: none !important;
				}
			`
			document.head.appendChild(style)
		})

		await page.goto('/fr', { waitUntil: 'domcontentloaded' })

		// Attendre longtemps mais pas trop
		await page.waitForTimeout(5000)

		// Prendre le screenshot avec configuration relaxée
		await expect(page).toHaveScreenshot('homepage-fr-migration-baseline.png', {
			animations: 'disabled',
			fullPage: true,
		})
	})

	test('Homepage EN - baseline creation', async ({ page }) => {
		await page.addInitScript(() => {
			const style = document.createElement('style')
			style.textContent = `
				*, *::before, *::after {
					animation-duration: 0s !important;
					transition-duration: 0s !important;
					transform: none !important;
				}
				[class*="cursor"], video, canvas, [class*="gradient"], [class*="animate"] {
					display: none !important;
				}
			`
			document.head.appendChild(style)
		})

		await page.goto('/en', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(5000)

		await expect(page).toHaveScreenshot('homepage-en-migration-baseline.png', {
			animations: 'disabled',
			fullPage: true,
		})
	})

	test('About page FR - baseline creation', async ({ page }) => {
		await page.addInitScript(() => {
			const style = document.createElement('style')
			style.textContent = `
				*, *::before, *::after {
					animation-duration: 0s !important;
					transition-duration: 0s !important;
				}
				[class*="cursor"], video, canvas, [class*="animate"] {
					display: none !important;
				}
			`
			document.head.appendChild(style)
		})

		await page.goto('/fr/about', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(3000)

		await expect(page).toHaveScreenshot('about-fr-migration-baseline.png', {
			animations: 'disabled',
			fullPage: true,
		})
	})

	test('Portfolio page FR - baseline creation', async ({ page }) => {
		await page.addInitScript(() => {
			const style = document.createElement('style')
			style.textContent = `
				*, *::before, *::after {
					animation-duration: 0s !important;
					transition-duration: 0s !important;
				}
				[class*="cursor"], video, canvas, [class*="animate"] {
					display: none !important;
				}
			`
			document.head.appendChild(style)
		})

		await page.goto('/fr/portefolio', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(3000)

		await expect(page).toHaveScreenshot('portfolio-fr-migration-baseline.png', {
			animations: 'disabled',
			fullPage: true,
		})
	})

	test('Contact page FR - baseline creation', async ({ page }) => {
		await page.addInitScript(() => {
			const style = document.createElement('style')
			style.textContent = `
				*, *::before, *::after {
					animation-duration: 0s !important;
					transition-duration: 0s !important;
				}
				[class*="cursor"], video, canvas, [class*="animate"] {
					display: none !important;
				}
			`
			document.head.appendChild(style)
		})

		await page.goto('/fr/contact', { waitUntil: 'domcontentloaded' })
		await page.waitForTimeout(3000)

		await expect(page).toHaveScreenshot('contact-fr-migration-baseline.png', {
			animations: 'disabled',
			fullPage: true,
		})
	})
})
