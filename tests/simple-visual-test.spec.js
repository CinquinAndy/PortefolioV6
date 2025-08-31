import { test, expect } from '@playwright/test'

// Test simplifié pour vérifier que le système fonctionne
test.describe('Simple Visual Tests', () => {
	test('Homepage French - simple test', async ({ page }) => {
		await page.goto('/fr')

		// Attendre que la page soit chargée
		await page.waitForLoadState('load', { timeout: 30000 })
		await page.waitForTimeout(3000) // Attendre les animations

		// Masquer les éléments dynamiques
		await page.addStyleTag({
			content: `
				/* Masquer les éléments qui bougent */
				.cursor-dot, .cursor-outline, [class*="cursor"] { 
					display: none !important; 
				}
				
				/* Stopper toutes les animations */
				*, *::before, *::after {
					animation-duration: 0s !important;
					animation-delay: 0s !important;
					transition-duration: 0s !important;
					transition-delay: 0s !important;
				}
				
				/* Masquer les vidéos */
				video { display: none !important; }
			`,
		})

		await page.waitForTimeout(1000)

		// Screenshot simple
		await expect(page).toHaveScreenshot('homepage-fr.png', {
			fullPage: true,
			animations: 'disabled',
		})
	})

	test('Homepage English - simple test', async ({ page }) => {
		await page.goto('/en')

		await page.waitForLoadState('load', { timeout: 30000 })
		await page.waitForTimeout(3000)

		await page.addStyleTag({
			content: `
				.cursor-dot, .cursor-outline, [class*="cursor"] { 
					display: none !important; 
				}
				*, *::before, *::after {
					animation-duration: 0s !important;
					transition-duration: 0s !important;
				}
				video { display: none !important; }
			`,
		})

		await page.waitForTimeout(1000)

		await expect(page).toHaveScreenshot('homepage-en.png', {
			fullPage: true,
			animations: 'disabled',
		})
	})
})
