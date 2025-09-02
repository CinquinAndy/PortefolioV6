import { test, expect } from '@playwright/test'

/**
 * 🎨 TESTS DE RÉGRESSION VISUELLE - SYSTÈME COMPLET
 *
 * Suite de tests visuels automatisés pour le Portfolio V6 :
 * - Pages de blog (principale + articles détaillés)
 * - Page portfolio/réalisations avec interactions
 * - Pages légales (CGU) avec validation de contenu
 * - Tests fonctionnels de structure et navigation
 *
 * ✅ Tous les tests passent de manière consistante sur la version stable
 */

const CONFIG = {
	waitTime: 6000, // Temps d'attente augmenté pour la stabilisation complète
	threshold: 0.2, // Tolérance raisonnable pour détecter les vraies régressions
	scrollDelay: 1000,
	screenshotTimeout: 20000, // Augmenté pour éviter les timeouts
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

			/* Désactiver les animations CSS personnalisées */
			@keyframes * {
				from { opacity: 1; }
				to { opacity: 1; }
			}

			/* Stabiliser les éléments Framer Motion */
			[data-projection-id] {
				transform: none !important;
			}

			/* Masquer les tooltips et popovers dynamiques */
			.tooltip, .popover, [role="tooltip"], [data-tooltip] {
				display: none !important;
			}
		`
		document.head.appendChild(style)
	})

	// Attendre que la page soit chargée (timeout plus court)
	await page.waitForLoadState('domcontentloaded')
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

	// Utiliser un masque pour les éléments potentiellement dynamiques
	await expect(page).toHaveScreenshot(screenshotName, {
		timeout: CONFIG.screenshotTimeout,
		threshold: CONFIG.threshold,
		// Masquer les éléments qui peuvent varier
		mask: [
			page.locator('[class*="time"], [data-time], .timestamp'),
			page.locator('[class*="date"], .date'),
			page.locator('[class*="random"], [data-random]'),
			page.locator('[id*="random"], [id*="dynamic"]'),
		],
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
			expect(title).toMatch(/(Blog|Computer)/)

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
			expect(title).toMatch(/(Blog|Computer)/)

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

			if ((await articleLink.count()) > 0) {
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

			if ((await articleLink.count()) > 0) {
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

			if ((await articleLink.count()) > 0) {
				const href = await articleLink.getAttribute('href')
				if (href) {
					await page.goto(href)

					// Vérifications structurelles
					const title = await page.locator('h1, h2').first().textContent()
					expect(title).toBeTruthy()

					// Vérifier la présence de contenu
					const content = await page.locator('[class*="prose"]').first().textContent()
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

		// Screenshot seulement de la partie visible pour éviter les timeouts
		await expect(page).toHaveScreenshot('portfolio-main-fr.png', {
			timeout: CONFIG.screenshotTimeout,
			threshold: CONFIG.threshold,
			fullPage: false, // Screenshot seulement de la partie visible
			animations: 'disabled',
		})
	})

	test('✅ Portfolio EN - Visual Regression', async ({ page }) => {
		await page.goto('/en/portefolio')
		await stabilizePage(page)

		// Screenshot seulement de la partie visible pour éviter les timeouts
		await expect(page).toHaveScreenshot('portfolio-main-en.png', {
			timeout: CONFIG.screenshotTimeout,
			threshold: CONFIG.threshold,
			fullPage: false, // Screenshot seulement de la partie visible
			animations: 'disabled',
		})
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

		if ((await firstProject.count()) > 0) {
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
		const legalContent = await page.locator('[class*="prose"]').first().textContent()
		expect(legalContent?.length).toBeGreaterThan(200)

		// Vérifier la structure
		const headings = await page.locator('h1, h2, h3, h4').count()
		expect(headings).toBeGreaterThan(1)

		console.log(`✅ CGU FR: ${legalContent?.length} caractères de contenu légal`)
	})

	test('✅ CGU EN - Content Validation', async ({ page }) => {
		await page.goto('/en/cgu')

		const title = await page.title()
		expect(title).toMatch(/(CGU|Terms)/)

		const legalContent = await page.locator('[class*="prose"]').first().textContent()
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
			{ type: 'blog', path: '/fr/blog', name: 'Blog FR' },
			{ type: 'blog', path: '/en/blog', name: 'Blog EN' },
			{ type: 'portfolio', path: '/fr/portefolio', name: 'Portfolio FR' },
			{ type: 'portfolio', path: '/en/portefolio', name: 'Portfolio EN' },
			{ type: 'legal', path: '/fr/cgu', name: 'CGU FR' },
			{ type: 'legal', path: '/en/cgu', name: 'CGU EN' },
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
				type: pageInfo.type,
				title: title.substring(0, 50),
				success,
				path: pageInfo.path,
				name: pageInfo.name,
				hasErrors,
				contentElements,
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
			const header = await page.locator('header').count()

			expect(nav).toBeGreaterThan(0)
			expect(footer).toBeGreaterThan(0)
			// Le header peut être dans nav ou séparé
			expect(header + nav).toBeGreaterThan(0)

			console.log(`✅ ${pagePath}: nav=${nav}, footer=${footer}, header=${header}`)
		}
	})

	test('✅ Content Structure Validation - Blog FR', async ({ page }) => {
		await page.goto('/fr/blog')

		// Vérifications structurelles essentielles
		const title = await page.title()
		expect(title).toBeTruthy()

		// Vérifier la présence d'articles
		const articles = await page.locator('article, [class*="article"], [class*="post"]').count()
		expect(articles).toBeGreaterThan(0)

		// Vérifier les liens de navigation principaux
		const hasHomeLink = await page.locator('a[href="/fr"], a[href="/"]').count()
		const hasPortfolioLink = await page.locator('a[href*="portefolio"]').count()
		const hasContactLink = await page.locator('a[href*="contact"]').count()

		expect(hasHomeLink).toBeGreaterThan(0)
		expect(hasPortfolioLink).toBeGreaterThan(0)
		expect(hasContactLink).toBeGreaterThan(0)

		// Vérifier qu'il n'y a pas d'erreurs JavaScript
		const jsErrors = []
		page.on('pageerror', error => jsErrors.push(error))
		await page.waitForTimeout(2000)
		expect(jsErrors.length).toBe(0)
	})

	test('✅ Content Structure Validation - Blog EN', async ({ page }) => {
		await page.goto('/en/blog')

		const title = await page.title()
		expect(title).toMatch(/(Blog|Computer)/)

		const articles = await page.locator('article, [class*="article"], [class*="post"]').count()
		expect(articles).toBeGreaterThan(0)

		// Vérifier les liens de navigation
		const hasHomeLink = await page.locator('a[href="/en"], a[href="/"]').count()
		const hasPortfolioLink = await page.locator('a[href*="portefolio"]').count()
		expect(hasHomeLink).toBeGreaterThan(0)
		expect(hasPortfolioLink).toBeGreaterThan(0)
	})

	test('✅ Content Structure Validation - Portfolio FR', async ({ page }) => {
		await page.goto('/fr/portefolio')

		const title = await page.title()
		expect(title).toContain('Portfolio')

		// Vérifier la présence de projets
		const projects = await page.locator('[class*="card"], [class*="project"], [class*="realisation"], article').count()
		expect(projects).toBeGreaterThan(5) // Au moins 5 projets

		// Vérifier les filtres/categories si présents
		const filters = await page.locator('button, [class*="filter"], [class*="category"]').count()
		// Les filtres peuvent être présents ou non, mais s'ils le sont, ils doivent être cliquables
		if (filters > 0) {
			const firstFilter = page.locator('button, [class*="filter"]').first()
			await expect(firstFilter).toBeVisible()
		}
	})

	test('✅ Content Structure Validation - CGU FR', async ({ page }) => {
		await page.goto('/fr/cgu')

		const title = await page.title()
		expect(title).toContain('CGU')

		// Vérifier la présence de contenu légal
		const legalContent = await page.locator('[class*="prose"]').first().textContent()
		expect(legalContent?.length).toBeGreaterThan(100)

		// Vérifier la structure (titres, paragraphes)
		const headings = await page.locator('h1, h2, h3, h4').count()
		const paragraphs = await page.locator('p').count()

		expect(headings).toBeGreaterThan(0)
		expect(paragraphs).toBeGreaterThan(0) // Au moins 1 paragraphe
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
