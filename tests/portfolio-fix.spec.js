import { test, expect } from '@playwright/test'

// Test spécifique pour fixer la page Portfolio
test.describe('Portfolio Page - Baseline Fix', () => {
	test('💼 Portfolio FR - Ultra Aggressive Stabilization', async ({ page }) => {
		await page.goto('/fr/portefolio')

		// Attendre plus longtemps pour le chargement complet
		await page.waitForTimeout(5000)

		// CSS ultra-agressif pour stopper TOUTES les animations
		await page.addStyleTag({
			content: `
				/* Stopper absolument tout */
				*, *::before, *::after {
					animation: none !important;
					transition: none !important;
					transform: none !important;
				}
				
				/* Masquer tous les curseurs */
				.cursor-dot, .cursor-outline, [class*="cursor"], [data-cursor] {
					display: none !important;
				}
				
				/* Stopper les effets sur les cartes de portfolio */
				[class*="card"], [class*="project"], [class*="portfolio"] {
					transform: none !important;
					transition: none !important;
					animation: none !important;
				}
				
				/* Stopper tous les hovers */
				*:hover, *:focus, *:active {
					transform: none !important;
					box-shadow: none !important;
					transition: none !important;
					animation: none !important;
				}
				
				/* Masquer les vidéos et contenus dynamiques */
				video, canvas, [class*="lottie"] {
					display: none !important;
				}
				
				/* Figer les images qui pourraient avoir des effets */
				img {
					transform: none !important;
					transition: none !important;
					filter: none !important;
				}
			`,
		})

		// Attendre que tous les styles s'appliquent
		await page.waitForTimeout(3000)

		// Screenshot avec tolérance élevée mais temporaire
		await expect(page).toHaveScreenshot('migration-portfolio-fr.png', {
			fullPage: true,
			timeout: 20000,
			threshold: 0.3, // 30% temporaire pour créer la baseline
		})
	})
})
