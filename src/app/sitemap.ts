import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getArticles, getRealisations } from '@/services/getContentWebsite'
import { getParentCourses } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const headersList = await headers()
	const host = headersList.get('host') || ''

	// Detect which domain is being accessed
	const isFrDomain = host.includes('andy-cinquin.fr') || !host.includes('andy-cinquin.com')
	const baseUrl = isFrDomain
		? (process.env.NEXT_PUBLIC_URL ?? 'https://andy-cinquin.fr')
		: (process.env.NEXT_PUBLIC_URL_ALT ?? 'https://andy-cinquin.com')
	const locale: Locale = isFrDomain ? 'fr' : 'en'

	console.log(`[Sitemap] Generated for domain: ${host} (${isFrDomain ? 'FR' : 'EN'})`)

	const sitemapEntries: MetadataRoute.Sitemap = []

	// Helper to add URL (no locale prefix in URL for this domain-specific approach)
	const addUrl = (
		path: string,
		lastModified: Date,
		changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
		priority: number
	) => {
		sitemapEntries.push({
			url: `${baseUrl}${path}`,
			lastModified,
			changeFrequency,
			priority,
		})
	}

	const now = new Date()
	const itemCounts = {
		staticPages: 0,
		articles: 0,
		realisations: 0,
		portfolioImages: 0,
		courses: 0,
		chapters: 0,
		lessons: 0,
	}

	// Static paths - same for both domains, just different base URL
	const staticPaths = ['', '/about', '/contact', '/blog', '/portefolio', '/cgu', '/course']

	for (const path of staticPaths) {
		const isHome = path === ''
		const priority = isHome ? 1.0 : path === '/blog' || path === '/portefolio' || path === '/course' ? 0.9 : 0.8
		const changeFreq = path === '/blog' ? 'daily' : path === '/cgu' ? 'monthly' : 'weekly'

		addUrl(path, now, changeFreq, priority)
		itemCounts.staticPages++
	}

	console.log(`[Sitemap] Added ${itemCounts.staticPages} static pages`)

	// Fetch and add blog articles
	try {
		const articlesResponse = await getArticles(locale, 1, 1000)

		if (!('notFound' in articlesResponse) && articlesResponse.data) {
			for (const article of articlesResponse.data) {
				const articleSlug = article.attributes.slug
				const articleUpdated = new Date(article.attributes.updatedAt)
				addUrl(`/blog/${articleSlug}`, articleUpdated, 'weekly', 0.7)
				itemCounts.articles++
			}
		}
	} catch (error) {
		console.error('[Sitemap] Error generating blog paths:', error)
	}

	console.log(`[Sitemap] Added ${itemCounts.articles} blog articles`)

	// Fetch and add portfolio/realisations with their images
	try {
		const realisationsResponse = await getRealisations(locale, 100)

		if (!('notFound' in realisationsResponse) && realisationsResponse.data) {
			for (const realisation of realisationsResponse.data) {
				const realisationSlug = realisation.attributes.slug
				const realisationUpdated = new Date(realisation.attributes.updatedAt)

				// Add main realisation page
				addUrl(`/portefolio/${realisationSlug}`, realisationUpdated, 'monthly', 0.7)
				itemCounts.realisations++

				// Add images if gallery exists
				const images = realisation.attributes.galery?.data ?? []
				for (let i = 0; i < images.length; i++) {
					addUrl(`/portefolio/${realisationSlug}/${i}`, realisationUpdated, 'monthly', 0.6)
					itemCounts.portfolioImages++
				}
			}
		}
	} catch (error) {
		console.error('[Sitemap] Error generating portfolio paths:', error)
	}

	console.log(
		`[Sitemap] Added ${itemCounts.realisations} portfolio pages and ${itemCounts.portfolioImages} portfolio images`
	)

	// Fetch and add courses with chapters and lessons
	try {
		const parentCoursesResponse = await getParentCourses(locale)

		if (!('notFound' in parentCoursesResponse) && parentCoursesResponse.data) {
			for (const parentCourse of parentCoursesResponse.data) {
				const parentSlug = parentCourse.attributes.slug
				const courseUpdated = new Date(parentCourse.attributes.updatedAt)

				// Add parent course
				addUrl(`/course/${parentSlug}`, courseUpdated, 'weekly', 0.8)
				itemCounts.courses++

				// Add chapters and lessons
				const chapters = parentCourse.attributes.chapters?.data ?? []

				for (const chapter of chapters) {
					const chapterSlug = chapter.attributes.slug
					const chapterUpdated = new Date(chapter.attributes.updatedAt)

					// Add chapter
					addUrl(`/course/${parentSlug}/${chapterSlug}`, chapterUpdated, 'weekly', 0.7)
					itemCounts.chapters++

					// Add lessons
					const lessons = chapter.attributes.lessons?.data ?? []

					for (const lesson of lessons) {
						const lessonSlug = lesson.attributes.slug
						const lessonUpdated = new Date(lesson.attributes.updatedAt)

						// Add lesson
						addUrl(`/course/${parentSlug}/${chapterSlug}/${lessonSlug}`, lessonUpdated, 'weekly', 0.6)
						itemCounts.lessons++
					}
				}
			}
		}
	} catch (error) {
		console.error('[Sitemap] Error generating course paths:', error)
	}

	console.log(
		`[Sitemap] Added ${itemCounts.courses} courses, ${itemCounts.chapters} chapters, and ${itemCounts.lessons} lessons`
	)

	const totalItems = Object.values(itemCounts).reduce((a, b) => a + b, 0)
	console.log(`[Sitemap] Generated sitemap with ${totalItems} total entries for ${isFrDomain ? 'FR' : 'EN'} domain`)

	return sitemapEntries
}
