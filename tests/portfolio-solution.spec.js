import { test, expect } from '@playwright/test'

// Solution définitive pour Portfolio - Masquage des animations Lottie
test.describe('Portfolio Solution - Lottie Masking', () => {
	test('💼 Portfolio FR - FINAL STABLE VERSION', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(3000)

		// Solution définitive : Masquer TOUTES les animations Lottie
		await page.addStyleTag({
			content: `
				/* Masquer complètement les animations Lottie */
				.container-lottie, 
				.lottie-1, 
				.lf-player-container,
				[class*="lottie"],
				[class*="lf-player"] {
					display: none !important;
					visibility: hidden !important;
				}
				
				/* Masquer les curseurs personnalisés */
				.cursor-dot, .cursor-outline, [class*="cursor"], [data-cursor] {
					display: none !important;
				}
				
				/* Stopper toutes les transitions restantes */
				*, *::before, *::after {
					transition: none !important;
					animation: none !important;
				}
				
				/* Stabiliser les cartes de portfolio */
				[class*="card"], [class*="project"] {
					transform: none !important;
				}
				
				/* Remplacer les zones cachées par un fond stable */
				.container-lottie {
					background: #0a0a0a !important;
					width: 100px !important;
					height: 100px !important;
				}
			`,
		})

		await page.waitForTimeout(2000)

		await expect(page).toHaveScreenshot('portfolio-stable-final.png', {
			fullPage: true,
			timeout: 15000,
			threshold: 0.1, // Strict maintenant qu'on a masqué Lottie
		})
	})

	test('💼 Alternative - Portfolio with Lottie masks', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(3000)

		// Approche alternative : masquer avec mask au lieu de CSS
		await expect(page).toHaveScreenshot('portfolio-masked-lottie.png', {
			fullPage: true,
			timeout: 15000,
			threshold: 0.1,
			mask: [
				page.locator('.container-lottie'),
				page.locator('.lottie-1'),
				page.locator('[class*="lottie"]'),
				page.locator('[class*="cursor"]'),
			],
		})
	})
})
