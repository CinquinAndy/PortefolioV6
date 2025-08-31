import { test, expect } from '@playwright/test'

// Configuration pour les tests
const locales = ['fr', 'en']

// Pages statiques à tester
const staticPages = [
	{ path: '/', name: 'home' },
	{ path: '/about', name: 'about' },
	{ path: '/blog', name: 'blog' },
	{ path: '/contact', name: 'contact' },
	{ path: '/cgu', name: 'cgu' },
	{ path: '/portefolio', name: 'portefolio' },
]

// Fonction d'attente personnalisée pour les animations
async function waitForPageLoad(page) {
	// Attendre que le contenu soit chargé - plus tolérant pour les timeouts
	await page.waitForLoadState('load', { timeout: 60000 })

	// Attendre un peu plus pour les animations Framer Motion
	await page.waitForTimeout(3000)

	// Attendre que les éléments critiques soient visibles
	await page.waitForSelector('nav', { timeout: 15000 }).catch(() => {})
	await page.waitForSelector('footer', { timeout: 15000 }).catch(() => {})
}

// Tests pour toutes les pages statiques
test.describe('Portfolio Visual Regression Tests', () => {
	for (const locale of locales) {
		for (const page of staticPages) {
			test(`${page.name} page (${locale}) visual test`, async ({
				page: browserPage,
			}) => {
				// Aller à la page
				await browserPage.goto(
					`/${locale}${page.path === '/' ? '' : page.path}`
				)

				// Attendre que la page soit complètement chargée
				await waitForPageLoad(browserPage)

				// Masquer les éléments qui peuvent varier (animations, curseurs, etc.)
				await browserPage.addStyleTag({
					content: `
						/* Masquer les éléments dynamiques */
						.cursor-dot, .cursor-outline, [class*="cursor"] { 
							visibility: hidden !important; 
						}
						
						/* Figer les animations */
						*, *::before, *::after {
							animation-duration: 0.01ms !important;
							animation-delay: -0.01ms !important;
							transition-duration: 0.01ms !important;
							transition-delay: 0.01ms !important;
						}
						
						/* Masquer les vidéos/GIF qui peuvent varier */
						video, [data-testid*="video"], [class*="video"] {
							visibility: hidden !important;
						}
						
						/* Stabiliser les gradients animés */
						[class*="gradient"], [class*="animate"] {
							animation: none !important;
						}
					`,
				})

				// Attendre encore un peu après l'ajout des styles
				await browserPage.waitForTimeout(1000)

				// Prendre le screenshot complet de la page
				await expect(browserPage).toHaveScreenshot({
					fullPage: true,
					animations: 'disabled',
					threshold: 0.2, // Tolérance de 20% pour les différences mineures
				})
			})
		}
	}

	// Test spécial pour la page d'accueil avec différentes résolutions
	test.describe('Responsive Tests', () => {
		const viewports = [
			{ width: 1920, height: 1080, name: 'desktop' },
			{ width: 768, height: 1024, name: 'tablet' },
			{ width: 375, height: 667, name: 'mobile' },
		]

		for (const viewport of viewports) {
			test(`Home page responsive ${viewport.name}`, async ({ page }) => {
				await page.setViewportSize({
					width: viewport.width,
					height: viewport.height,
				})

				await page.goto('/fr')
				await waitForPageLoad(page)

				// Même style pour masquer les éléments dynamiques
				await page.addStyleTag({
					content: `
						.cursor-dot, .cursor-outline, [class*="cursor"] { 
							visibility: hidden !important; 
						}
						*, *::before, *::after {
							animation-duration: 0.01ms !important;
							animation-delay: -0.01ms !important;
							transition-duration: 0.01ms !important;
							transition-delay: 0.01ms !important;
						}
						video, [data-testid*="video"], [class*="video"] {
							visibility: hidden !important;
						}
						[class*="gradient"], [class*="animate"] {
							animation: none !important;
						}
					`,
				})

				await page.waitForTimeout(1000)

				await expect(page).toHaveScreenshot({
					fullPage: true,
					animations: 'disabled',
					threshold: 0.2,
				})
			})
		}
	})

	// Test pour une page de blog dynamique (si du contenu existe)
	test('Blog article dynamic page test', async ({ page }) => {
		// Essayer d'aller sur une page de blog
		const response = await page.goto('/fr/blog', { waitUntil: 'networkidle' })

		if (response && response.status() === 200) {
			await waitForPageLoad(page)

			// Vérifier s'il y a des liens vers des articles
			const articleLinks = await page.locator('a[href*="/blog/"]').count()

			if (articleLinks > 0) {
				// Prendre le premier lien d'article
				const firstArticleLink = page.locator('a[href*="/blog/"]').first()
				const href = await firstArticleLink.getAttribute('href')

				if (href && href !== '/blog') {
					await page.goto(href)
					await waitForPageLoad(page)

					await page.addStyleTag({
						content: `
							.cursor-dot, .cursor-outline, [class*="cursor"] { 
								visibility: hidden !important; 
							}
							*, *::before, *::after {
								animation-duration: 0.01ms !important;
								transition-duration: 0.01ms !important;
							}
						`,
					})

					await expect(page).toHaveScreenshot({
						fullPage: true,
						animations: 'disabled',
						threshold: 0.3, // Plus de tolérance pour le contenu dynamique
					})
				}
			}
		}
	})
})

// Tests d'accessibilité basiques (bonus)
test.describe('Basic Accessibility Tests', () => {
	test('Home page basic accessibility', async ({ page }) => {
		await page.goto('/fr')
		await waitForPageLoad(page)

		// Vérifier la présence d'éléments d'accessibilité de base
		const hasMainLandmark =
			(await page.locator('main, [role="main"]').count()) > 0
		const hasNavigation =
			(await page.locator('nav, [role="navigation"]').count()) > 0
		const hasHeadings =
			(await page.locator('h1, h2, h3, h4, h5, h6').count()) > 0

		expect(hasMainLandmark || hasNavigation || hasHeadings).toBeTruthy()
	})
})
