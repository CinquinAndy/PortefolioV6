import type { MetadataRoute } from 'next'
import { getArticles, getRealisations } from '@/services/getContentWebsite'
import { getParentCourses } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_URL ?? '' // andy-cinquin.fr
	const alternateBaseUrl = process.env.NEXT_PUBLIC_URL_ALT ?? '' // andy-cinquin.com

	const sitemapEntries: MetadataRoute.Sitemap = []

	// Helper to add both versioned (with /fr or /en) and clean URLs (without locale prefix)
	const addUrl = (
		domain: string,
		locale: Locale,
		path: string,
		lastModified: Date,
		changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
		priority: number
	) => {
		// Add URL with locale prefix (for explicit locale access)
		sitemapEntries.push({
			url: `${domain}/${locale}${path}`,
			lastModified,
			changeFrequency,
			priority,
		})

		// Add clean URL without locale (middleware handles redirection based on domain)
		sitemapEntries.push({
			url: `${domain}${path}`,
			lastModified,
			changeFrequency,
			priority,
		})
	}

	// Static paths - French domain (andy-cinquin.fr)
	const staticPaths = ['', '/about', '/contact', '/blog', '/portefolio', '/cgu', '/course']
	const now = new Date()

	for (const path of staticPaths) {
		const isHome = path === ''
		const priority = isHome ? 1.0 : path === '/blog' || path === '/portefolio' || path === '/course' ? 0.9 : 0.8
		const changeFreq = path === '/blog' ? 'daily' : path === '/cgu' ? 'monthly' : 'weekly'

		// French version on .fr domain
		addUrl(baseUrl, 'fr', path, now, changeFreq, priority)

		// English version on .com domain
		addUrl(alternateBaseUrl, 'en', path, now, changeFreq, priority)
	}

	// Fetch dynamic course paths for both locales
	const locales: Array<{ locale: Locale; baseUrl: string }> = [
		{ locale: 'fr', baseUrl },
		{ locale: 'en', baseUrl: alternateBaseUrl },
	]

	try {
		for (const { locale, baseUrl: url } of locales) {
			// Fetch parent courses with chapters and lessons
			const parentCoursesResponse = await getParentCourses(locale)

			if ('notFound' in parentCoursesResponse || !parentCoursesResponse.data) {
				continue
			}

			const parentCourses = parentCoursesResponse.data

			for (const parentCourse of parentCourses) {
				const parentSlug = parentCourse.attributes.slug
				const courseUpdated = new Date(parentCourse.attributes.updatedAt)

				// Add parent course (both with /locale and without)
				addUrl(url, locale, `/course/${parentSlug}`, courseUpdated, 'weekly', 0.8)

				// Process chapters
				const chapters = parentCourse.attributes.chapters?.data ?? []

				for (const chapter of chapters) {
					const chapterSlug = chapter.attributes.slug
					const chapterUpdated = new Date(chapter.attributes.updatedAt)

					// Add chapter (both with /locale and without)
					addUrl(url, locale, `/course/${parentSlug}/${chapterSlug}`, chapterUpdated, 'weekly', 0.7)

					// Process lessons in this chapter
					const lessons = chapter.attributes.lessons?.data ?? []

					for (const lesson of lessons) {
						const lessonSlug = lesson.attributes.slug
						const lessonUpdated = new Date(lesson.attributes.updatedAt)

						// Add lesson (both with /locale and without)
						addUrl(url, locale, `/course/${parentSlug}/${chapterSlug}/${lessonSlug}`, lessonUpdated, 'weekly', 0.6)
					}
				}
			}
		}
	} catch (error) {
		console.error('Error generating course paths for sitemap:', error)
	}

	// Add blog articles for both locales
	try {
		for (const { locale, baseUrl: url } of locales) {
			const articlesResponse = await getArticles(locale, 1, 1000)

			if ('notFound' in articlesResponse || !articlesResponse.data) {
				continue
			}

			const articles = articlesResponse.data

			for (const article of articles) {
				const articleSlug = article.attributes.slug
				const articleUpdated = new Date(article.attributes.updatedAt)

				// Add article (both with /locale and without)
				addUrl(url, locale, `/blog/${articleSlug}`, articleUpdated, 'weekly', 0.7)
			}
		}
	} catch (error) {
		console.error('Error generating blog paths for sitemap:', error)
	}

	// Add portfolio/realisations for both locales
	try {
		for (const { locale, baseUrl: url } of locales) {
			const realisationsResponse = await getRealisations(locale)

			if ('notFound' in realisationsResponse || !realisationsResponse.data) {
				continue
			}

			const realisations = realisationsResponse.data

			for (const realisation of realisations) {
				const realisationSlug = realisation.attributes.slug
				const realisationUpdated = new Date(realisation.attributes.updatedAt)

				// Add realisation (both with /locale and without)
				addUrl(url, locale, `/portefolio/${realisationSlug}`, realisationUpdated, 'monthly', 0.7)
			}
		}
	} catch (error) {
		console.error('Error generating portfolio paths for sitemap:', error)
	}

	return sitemapEntries
}
