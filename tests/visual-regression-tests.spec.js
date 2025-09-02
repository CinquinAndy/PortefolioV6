import { test, expect } from '@playwright/test'

/**
 * 🎨 TESTS DE RÉGRESSION VISUELLE COMPLÈTS
 *
 * Tests visuels pour :
 * - Pages de blog (principale et détaillée)
 * - Page portfolio/réalisations
 * - Pages légales (CGU)
 *
 * Ces tests génèrent des screenshots de référence et vérifient
 * les régressions visuelles à chaque exécution.
 */

const CONFIG = {
	waitTime: 6000, // Temps d'attente pour la stabilisation
	threshold: 0.1, // Tolérance pour les différences (plus stricte pour le contenu)
	screenshotTimeout: 25000,
	scrollDelay: 1000,
}

// Fonction pour stabiliser la page avant les screenshots
async function stabilizePage(page) {
	// Injection de CSS avant même que la page charge
	await page.addInitScript(() => {
		const style = document.createElement('style')
		style.textContent = `
			/* Masquer tous les curseurs personnalisés */
			.cursor-dot, .cursor-outline, [class*="cursor"], [data-cursor] {
				display: none !important;
				visibility: hidden !important;
			}

			/* Masquer toutes les vidéos */
			video, [class*="video-bg"], .video-background {
				visibility: hidden !important;
				display: none !important;
			}

			/* Stopper TOUTES les animations et transitions */
			*, *::before, *::after {
				animation-duration: 0s !important;
				animation-delay: 0s !important;
				transition-duration: 0s !important;
				transition-delay: 0s !important;
				transform: none !important;
			}

			/* Masquer les animations Lottie */
			[class*="lottie"], .lf-player-container, [class*="animation"] {
				display: none !important;
			}

			/* Stabiliser les éléments hover */
			*:hover, *:focus, *:active {
				transform: none !important;
				box-shadow: none !important;
				transition: none !important;
				animation: none !important;
			}

			/* Masquer les éléments dynamiques */
			.timestamp, [data-timestamp], .live-indicator {
				display: none !important;
			}
		`
		document.head.appendChild(style)
	})

	// Attendre que la page soit complètement chargée
	await page.waitForLoadState('networkidle')
	await page.waitForTimeout(CONFIG.waitTime)
}

// Fonction pour prendre un screenshot avec scroll automatique
async function takeFullPageScreenshot(page, screenshotName) {
	// Faire défiler la page pour charger tous les éléments lazy
	await page.evaluate(async () => {
		const scrollHeight = document.body.scrollHeight
		const windowHeight = window.innerHeight
		let currentPosition = 0

		while (currentPosition < scrollHeight) {
			window.scrollTo(0, currentPosition)
			await new Promise(resolve => setTimeout(resolve, 100))
			currentPosition += windowHeight / 2
		}

		// Remonter en haut
		window.scrollTo(0, 0)
	})

	await page.waitForTimeout(CONFIG.scrollDelay)

	await expect(page).toHaveScreenshot(screenshotName, {
		timeout: CONFIG.screenshotTimeout,
		threshold: CONFIG.threshold,
		fullPage: true,
		animations: 'disabled',
	})
}

// ========================================
// TESTS DES PAGES DE BLOG
// ========================================

test.describe('📝 Blog Pages Visual Tests', () => {
	test.describe('Blog Main Page', () => {
		test('✅ Blog FR - Visual Regression', async ({ page }) => {
			await page.goto('/fr/blog')
			await stabilizePage(page)
			await takeFullPageScreenshot(page, 'blog-main-fr.png')
		})

		test('✅ Blog EN - Visual Regression', async ({ page }) => {
			await page.goto('/en/blog')
			await stabilizePage(page)
			await takeFullPageScreenshot(page, 'blog-main-en.png')
		})

		test('✅ Blog FR - Content Validation', async ({ page }) => {
			await page.goto('/fr/blog')

			// Vérifications fonctionnelles
			const title = await page.title()
			expect(title).toContain('Blog')

			// Vérifier la présence d'articles
			const articles = await page.locator('article, [class*="article"], [class*="post"]').count()
			expect(articles).toBeGreaterThan(0)

			// Vérifier la navigation
			const nav = await page.locator('nav').count()
			expect(nav).toBeGreaterThan(0)
		})

		test('✅ Blog EN - Content Validation', async ({ page }) => {
			await page.goto('/en/blog')

			const title = await page.title()
			expect(title).toContain('Blog')

			const articles = await page.locator('article, [class*="article"], [class*="post"]').count()
			expect(articles).toBeGreaterThan(0)
		})
	})

	test.describe('Blog Detail Pages', () => {
		test('✅ Blog Article FR - Visual Regression', async ({ page }) => {
			// Essayer de récupérer un article réel ou utiliser une URL connue
			await page.goto('/fr/blog')
			await page.waitForTimeout(2000)

			// Chercher le premier lien d'article disponible
			const articleLink = page.locator('a[href*="/blog/"]').first()

			if (await articleLink.count() > 0) {
				const href = await articleLink.getAttribute('href')
				if (href) {
					await page.goto(href)
					await stabilizePage(page)
					await takeFullPageScreenshot(page, 'blog-article-detail-fr.png')
				}
			} else {
				// Fallback : test avec une URL connue ou skip
				console.warn('⚠️ Aucun article trouvé pour le test détaillé')
				test.skip()
			}
		})

		test('✅ Blog Article EN - Visual Regression', async ({ page }) => {
			await page.goto('/en/blog')
			await page.waitForTimeout(2000)

			const articleLink = page.locator('a[href*="/blog/"]').first()

			if (await articleLink.count() > 0) {
				const href = await articleLink.getAttribute('href')
				if (href) {
					await page.goto(href)
					await stabilizePage(page)
					await takeFullPageScreenshot(page, 'blog-article-detail-en.png')
				}
			} else {
				console.warn('⚠️ Aucun article trouvé pour le test détaillé')
				test.skip()
			}
		})

		test('✅ Blog Article - Content Structure', async ({ page }) => {
			await page.goto('/fr/blog')
			await page.waitForTimeout(2000)

			const articleLink = page.locator('a[href*="/blog/"]').first()

			if (await articleLink.count() > 0) {
				const href = await articleLink.getAttribute('href')
				if (href) {
					await page.goto(href)

					// Vérifications structurelles
					const title = await page.locator('h1, h2').first().textContent()
					expect(title).toBeTruthy()

					// Vérifier la présence de contenu
					const content = await page.locator('[class*="prose"], article, .content').textContent()
					expect(content?.length).toBeGreaterThan(100)

					// Vérifier les métadonnées
					const hasDate = await page.locator('text=/Publié le|Posted on/').count()
					expect(hasDate).toBeGreaterThan(0)
				}
			}
		})
	})
})

// ========================================
// TESTS DE LA PAGE PORTFOLIO/RÉALISATIONS
// ========================================

test.describe('🚀 Portfolio/Realisations Visual Tests', () => {
	test('✅ Portfolio FR - Visual Regression', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await stabilizePage(page)
		await takeFullPageScreenshot(page, 'portfolio-main-fr.png')
	})

	test('✅ Portfolio EN - Visual Regression', async ({ page }) => {
		await page.goto('/en/portefolio')
		await stabilizePage(page)
		await takeFullPageScreenshot(page, 'portfolio-main-en.png')
	})

	test('✅ Portfolio FR - Content Validation', async ({ page }) => {
		await page.goto('/fr/portefolio')

		const title = await page.title()
		expect(title).toContain('Portfolio')

		// Vérifier la présence de projets/réalisations
		const projects = await page.locator('[class*="card"], [class*="project"], [class*="realisation"], article').count()
		expect(projects).toBeGreaterThan(0)

		console.log(`✅ Portfolio FR: ${projects} projets trouvés`)
	})

	test('✅ Portfolio EN - Content Validation', async ({ page }) => {
		await page.goto('/en/portefolio')

		const title = await page.title()
		expect(title).toContain('Portfolio')

		const projects = await page.locator('[class*="card"], [class*="project"], [class*="realisation"], article').count()
		expect(projects).toBeGreaterThan(0)

		console.log(`✅ Portfolio EN: ${projects} projects found`)
	})

	test('✅ Portfolio - Project Interaction', async ({ page }) => {
		await page.goto('/fr/portefolio')
		await page.waitForTimeout(2000)

		// Tester l'interaction avec le premier projet
		const firstProject = page.locator('[class*="card"], [class*="project"]').first()

		if (await firstProject.count() > 0) {
			// Vérifier que l'élément est visible et cliquable
			await expect(firstProject).toBeVisible()

			// Tester le hover (si applicable)
			await firstProject.hover()
			await page.waitForTimeout(500)

			console.log('✅ Premier projet interactif et visible')
		}
	})
})

// ========================================
// TESTS DES PAGES LÉGALES
// ========================================

test.describe('⚖️ Legal Pages Visual Tests', () => {
	test('✅ CGU FR - Visual Regression', async ({ page }) => {
		await page.goto('/fr/cgu')
		await stabilizePage(page)
		await takeFullPageScreenshot(page, 'cgu-main-fr.png')
	})

	test('✅ CGU EN - Visual Regression', async ({ page }) => {
		await page.goto('/en/cgu')
		await stabilizePage(page)
		await takeFullPageScreenshot(page, 'cgu-main-en.png')
	})

	test('✅ CGU FR - Content Validation', async ({ page }) => {
		await page.goto('/fr/cgu')

		const title = await page.title()
		expect(title).toContain('CGU')

		// Vérifier la présence de contenu légal
		const legalContent = await page.locator('[class*="prose"], article, .content').textContent()
		expect(legalContent?.length).toBeGreaterThan(200)

		// Vérifier la structure
		const headings = await page.locator('h1, h2, h3, h4').count()
		expect(headings).toBeGreaterThan(1)

		console.log(`✅ CGU FR: ${legalContent?.length} caractères de contenu légal`)
	})

	test('✅ CGU EN - Content Validation', async ({ page }) => {
		await page.goto('/en/cgu')

		const title = await page.title()
		expect(title).toContain('Terms')

		const legalContent = await page.locator('[class*="prose"], article, .content').textContent()
		expect(legalContent?.length).toBeGreaterThan(200)

		const headings = await page.locator('h1, h2, h3, h4').count()
		expect(headings).toBeGreaterThan(1)

		console.log(`✅ CGU EN: ${legalContent?.length} characters of legal content`)
	})
})

// ========================================
// TESTS DE VALIDATION GLOBALE
// ========================================

test.describe('🎯 Global Validation Tests', () => {
	test('✅ All Target Pages Load Successfully', async ({ page }) => {
		const pages = [
			{ path: '/fr/blog', name: 'Blog FR', type: 'blog' },
			{ path: '/en/blog', name: 'Blog EN', type: 'blog' },
			{ path: '/fr/portefolio', name: 'Portfolio FR', type: 'portfolio' },
			{ path: '/en/portefolio', name: 'Portfolio EN', type: 'portfolio' },
			{ path: '/fr/cgu', name: 'CGU FR', type: 'legal' },
			{ path: '/en/cgu', name: 'CGU EN', type: 'legal' },
		]

		const results = []

		for (const pageInfo of pages) {
			await page.goto(pageInfo.path)
			await page.waitForTimeout(2000)

			const title = await page.title()
			const contentElements = await page.locator('main, [role="main"], nav, h1, h2, article, section').count()
			const hasErrors = (await page.locator('text=404').count()) > 0
			const hasFatalErrors = (await page.locator('text=500').count()) > 0

			const success = title !== '' && !hasErrors && !hasFatalErrors && contentElements > 2

			results.push({
				name: pageInfo.name,
				path: pageInfo.path,
				type: pageInfo.type,
				success,
				title: title.substring(0, 50),
				contentElements,
				hasErrors,
			})
		}

		// Afficher le résumé
		console.log('\n🎨 VISUAL REGRESSION TEST SUMMARY:')
		results.forEach(r => {
			const status = r.success ? '✅' : '❌'
			console.log(`${status} ${r.name}: ${r.contentElements} elements`)
		})

		// Vérifier que toutes les pages principales passent
		const failedPages = results.filter(r => !r.success)
		expect(failedPages.length).toBe(0)

		console.log(`\n📊 Status: ${results.length}/6 target pages ready for visual testing`)
	})

	test('✅ Navigation Consistency Across Pages', async ({ page }) => {
		const testPages = ['/fr/blog', '/fr/portefolio', '/fr/cgu']

		for (const pagePath of testPages) {
			await page.goto(pagePath)
			await page.waitForTimeout(1000)

			// Vérifier la présence des éléments de navigation communs
			const nav = await page.locator('nav').count()
			const footer = await page.locator('footer').count()
			const logo = await page.locator('[class*="logo"], img[alt*="logo"]').count()

			expect(nav).toBeGreaterThan(0)
			expect(footer).toBeGreaterThan(0)
			expect(logo).toBeGreaterThan(0)

			console.log(`✅ ${pagePath}: nav=${nav}, footer=${footer}, logo=${logo}`)
		}
	})
})

/**
 * 📋 INSTRUCTIONS D'UTILISATION:
 *
 * 1. GÉNÉRER LES SCREENSHOTS DE BASE:
 *    npm run test:visual:update -- tests/visual-regression-tests.spec.js
 *
 * 2. LANCER LES TESTS VISUELS:
 *    npm run test:visual -- tests/visual-regression-tests.spec.js
 *
 * 3. TESTS AVEC INTERFACE VISUELLE:
 *    npm run test:visual:ui -- tests/visual-regression-tests.spec.js
 *
 * 4. TESTS EN MODE HEADLESS AVEC NAVIGATEUR:
 *    npm run test:visual:headed -- tests/visual-regression-tests.spec.js
 *
 * RÉSULTATS ATTENDUS:
 * - 6 screenshots de référence générés
 * - Tests de validation fonctionnelle pour chaque page
 * - Vérification de la structure et du contenu
 * - Tests d'interaction de base
 */
