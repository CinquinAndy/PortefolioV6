import { redirect } from 'next/navigation'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import html from 'remark-html'
import remarkRehype from 'remark-rehype'
import type { FetchOptions, NotFoundResponse } from '@/types/api'
import type {
	About,
	Article,
	Cgu,
	ContentWebsite,
	Locale,
	NotFound,
	Realisation,
	Service,
	StrapiResponse,
	Technology,
} from '@/types/strapi'

/**
 * Fetch data from API
 */
export async function fetchAPI<T = unknown>(
	path: string,
	options: Partial<FetchOptions> = {}
): Promise<T | NotFoundResponse> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
			next: { revalidate: 86400, ...options.next },
			method: options.method ?? 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
				Accept: 'application/json',
				...options.headers,
			},
			...(options.body != null ? { body: options.body } : {}),
		})

		if (!res.ok) {
			console.error(`API Error: ${res.status} ${res.statusText}`)
			return { notFound: true }
		}

		return (await res.json()) as T
	} catch (error) {
		console.error('Fetch API Error:', error)
		return { notFound: true }
	}
}

/**
 * Get about page
 */
export async function getAbout(locale: Locale): Promise<StrapiResponse<About> | NotFoundResponse> {
	const dataAbout = await fetchAPI<StrapiResponse<About>>(`api/about?populate=deep&locale=${locale}`)

	if ('notFound' in dataAbout) {
		return dataAbout
	}

	const processedAbout = await processMarkdown(dataAbout.data.attributes.content)

	return updateNestedProperty(dataAbout, 'data.attributes.content', processedAbout)
}

/**
 * Get article by id and locale
 */
export async function getArticleById(id: number, locale: Locale): Promise<StrapiResponse<Article> | NotFoundResponse> {
	return fetchAPI<StrapiResponse<Article>>(`api/articles/${id}?populate=deep&locale=${locale}`)
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(
	slug: string,
	locale: Locale
): Promise<StrapiResponse<Article[]> | NotFoundResponse> {
	return fetchAPI<StrapiResponse<Article[]>>(
		`api/articles?populate=deep,3&sort=rank&filters[slug][$eq]=${slug}&locale=${locale}`
	)
}

/**
 * Get article paths
 */
export async function getArticlePaths(locale: Locale): Promise<Array<{ params: { slug: string } }>> {
	const data = await getArticles(locale)

	if ('notFound' in data) {
		return []
	}

	return (
		data.data?.map(record => ({
			params: {
				slug: record.attributes.slug,
			},
		})) ?? []
	)
}

/**
 * Get articles
 */
export async function getArticles(
	locale: Locale,
	page: number = 1,
	pageSize: number = 5
): Promise<StrapiResponse<Article[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Article[]>>(
		`api/articles?populate=deep,2&sort=rank&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
	)
}

/**
 * Get CGU page
 */
export async function getCgu(locale: Locale): Promise<StrapiResponse<Cgu> | NotFoundResponse> {
	const dataCgu = await fetchAPI<StrapiResponse<Cgu>>(`api/cgu?populate=deep&locale=${locale}`)

	if ('notFound' in dataCgu) {
		return dataCgu
	}

	const processedCgu = await processMarkdown(dataCgu.data.attributes.content)

	return updateNestedProperty(dataCgu, 'data.attributes.content', processedCgu)
}

/**
 * Get content website
 */
export async function getContentWebsite(locale: Locale): Promise<StrapiResponse<ContentWebsite> | NotFoundResponse> {
	try {
		const dataContentWebsite = await fetchAPI<StrapiResponse<ContentWebsite>>(
			`api/content-website?populate=deep&locale=${locale}`
		)

		if ('notFound' in dataContentWebsite) {
			return dataContentWebsite
		}

		const processedContentFooter = await processMarkdown(
			dataContentWebsite.data?.attributes?.content_footer?.content ?? ''
		)

		const processedContentCta = await processMarkdown(dataContentWebsite.data?.attributes?.cta?.content ?? '')

		const processedContentSignature = await processMarkdown(
			dataContentWebsite.data?.attributes?.content_footer?.content_signature ?? ''
		)

		return updateNestedProperty(
			updateNestedProperty(
				updateNestedProperty(dataContentWebsite, 'data.attributes.content_footer.content', processedContentFooter),
				'data.attributes.cta.content',
				processedContentCta
			),
			'data.attributes.content_footer.content_signature',
			processedContentSignature
		)
	} catch (error) {
		console.error('Error in getContentWebsite:', error)
		return { notFound: true }
	}
}

export async function getNotFound(locale: Locale): Promise<StrapiResponse<NotFound> | NotFoundResponse> {
	const dataNotFound = await fetchAPI<StrapiResponse<NotFound>>(`api/not-found?populate=deep&locale=${locale}`)

	if ('notFound' in dataNotFound) {
		return dataNotFound
	}

	const processedNotFound = await processMarkdown(dataNotFound.data.attributes.content)

	return updateNestedProperty(dataNotFound, 'data.attributes.content', processedNotFound)
}

/**
 * Get realisation by slug
 */
export async function getRealisationBySlug(
	slug: string,
	locale: Locale
): Promise<StrapiResponse<Realisation[]> | NotFoundResponse> {
	return fetchAPI<StrapiResponse<Realisation[]>>(
		`api/realisations?populate=deep,4&sort=rank&filters[slug][$eq]=${slug}&locale=${locale}`
	)
}

/**
 * Get realisation paths
 */
export async function getRealisationPaths(locale: Locale): Promise<Array<{ params: { slug: string } }>> {
	const data = await getRealisations(locale)

	if ('notFound' in data) {
		return []
	}

	return (
		data.data?.map(record => ({
			params: {
				slug: record.attributes.slug,
			},
		})) ?? []
	)
}

/**
 * Get realisations
 */
export async function getRealisations(locale: Locale): Promise<StrapiResponse<Realisation[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Realisation[]>>(`api/realisations?populate=deep,2&sort=rank&locale=${locale}`)
}

/**
 * Get services
 */
export async function getServices(locale: Locale): Promise<StrapiResponse<Service[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Service[]>>(`api/services?populate=deep&locale=${locale}`)
}

/**
 * Get services grid
 */
export async function getServicesGrid(locale: Locale): Promise<StrapiResponse<Service[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Service[]>>(`api/service-grids?populate=deep&locale=${locale}`)
}

/**
 * Process article data
 */
export async function processArticleData(
	articleData: Article | NotFoundResponse
): Promise<Article & { data: { attributes: Article['attributes'] & { content: string } } }> {
	if ('notFound' in articleData || articleData.attributes == null) {
		redirect('/404')
	}

	const processedContentArticles = await processMarkdown(articleData.attributes.content)

	return {
		...articleData,
		data: {
			attributes: {
				...articleData.attributes,
				content: processedContentArticles.toString(),
			},
		},
	}
}

/**
 * Process markdown content with automatic heading IDs
 */
export async function processMarkdown(markdownContent: string): Promise<string> {
	const result = await remark()
		.use(remarkRehype) // Convert markdown to HTML AST
		.use(rehypeSlug) // Add IDs to headings
		.use(rehypeStringify) // Convert HTML AST to string
		.process(markdownContent)
	return result.toString()
}

/**
 * Process realisation data
 */
export async function processRealisationData(
	realisationData: StrapiResponse<Realisation[]> | NotFoundResponse
): Promise<{ data: { attributes: Realisation['attributes'] & { content: string } } }> {
	if ('notFound' in realisationData || realisationData.data?.[0]?.attributes == null) {
		redirect('/404')
	}

	const processedContentRealisations = await processMarkdown(realisationData.data[0].attributes.content)

	return {
		data: {
			attributes: {
				...realisationData.data[0].attributes,
				content: processedContentRealisations.toString(),
			},
		},
	}
}

/**
 * Update nested property
 */
/**
 * Get all articles (without pagination)
 */
export async function getAllArticles(locale: Locale): Promise<StrapiResponse<Article[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Article[]>>(
		`api/articles?populate=deep,2&sort=rank&locale=${locale}&pagination[pageSize]=100`
	)
}

/**
 * Get all realisations (without pagination)
 */
export async function getAllRealisations(locale: Locale): Promise<StrapiResponse<Realisation[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Realisation[]>>(
		`api/realisations?populate=deep,2&sort=rank&locale=${locale}&pagination[pageSize]=100`
	)
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(locale: Locale): Promise<StrapiResponse<Article[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Article[]>>(
		`api/articles?populate=deep,2&sort=rank&filters[featured][$eq]=true&locale=${locale}`
	)
}

/**
 * Get featured realisations
 */
export async function getFeaturedRealisations(
	locale: Locale
): Promise<StrapiResponse<Realisation[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Realisation[]>>(
		`api/realisations?populate=deep,2&sort=rank&filters[featured][$eq]=true&locale=${locale}`
	)
}

/**
 * Get articles by tag
 */
export async function getArticlesByTag(
	tag: string,
	locale: Locale
): Promise<StrapiResponse<Article[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Article[]>>(
		`api/articles?populate=deep,2&sort=rank&filters[tags][name][$eq]=${tag}&locale=${locale}`
	)
}

/**
 * Get realisations by technology
 */
export async function getRealisationsByTechnology(
	technology: string,
	locale: Locale
): Promise<StrapiResponse<Realisation[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Realisation[]>>(
		`api/realisations?populate=deep,2&sort=rank&filters[technologies][name][$eq]=${technology}&locale=${locale}`
	)
}

/**
 * Search content (articles and realisations)
 */
export async function searchContent(
	query: string,
	locale: Locale
): Promise<{
	articles: StrapiResponse<Article[]> | NotFoundResponse
	realisations: StrapiResponse<Realisation[]> | NotFoundResponse
}> {
	const [articles, realisations] = await Promise.all([
		fetchAPI<StrapiResponse<Article[]>>(
			`api/articles?populate=deep,2&sort=rank&filters[$or][0][title][$containsi]=${query}&filters[$or][1][content][$containsi]=${query}&locale=${locale}`
		),
		fetchAPI<StrapiResponse<Realisation[]>>(
			`api/realisations?populate=deep,2&sort=rank&filters[$or][0][title][$containsi]=${query}&filters[$or][1][content][$containsi]=${query}&locale=${locale}`
		),
	])

	return { realisations, articles }
}

/**
 * Get recent articles
 */
export async function getRecentArticles(
	limit: number = 5,
	locale: Locale
): Promise<StrapiResponse<Article[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Article[]>>(
		`api/articles?populate=deep,2&sort=publishedAt:desc&locale=${locale}&pagination[pageSize]=${limit}`
	)
}

/**
 * Get recent realisations
 */
export async function getRecentRealisations(
	limit: number = 5,
	locale: Locale
): Promise<StrapiResponse<Realisation[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Realisation[]>>(
		`api/realisations?populate=deep,2&sort=publishedAt:desc&locale=${locale}&pagination[pageSize]=${limit}`
	)
}

/**
 * Get technologies
 */
export async function getTechnologies(locale: Locale): Promise<StrapiResponse<Technology[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Technology[]>>(`api/technologies?populate=deep&sort=order&locale=${locale}`)
}

/**
 * Get technology by id
 */
export async function getTechnologyById(
	id: number,
	locale: Locale
): Promise<StrapiResponse<Technology> | NotFoundResponse> {
	return fetchAPI<StrapiResponse<Technology>>(`api/technologies/${id}?populate=deep&locale=${locale}`)
}

/**
 * Get technologies by category
 */
export async function getTechnologiesByCategory(
	category: string,
	locale: Locale
): Promise<StrapiResponse<Technology[]> | NotFoundResponse> {
	return await fetchAPI<StrapiResponse<Technology[]>>(
		`api/technologies?populate=deep&sort=order&filters[category][$eq]=${category}&locale=${locale}`
	)
}

export function updateNestedProperty<T>(obj: T, path: string | string[], newValue: unknown): T {
	const keys = Array.isArray(path) ? path : path.split('.')
	const newObj = { ...obj } as Record<string, unknown>
	let pointer: Record<string, unknown> = newObj

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i]
		const currentValue = pointer[key]
		if (currentValue != null && typeof currentValue === 'object') {
			pointer[key] = { ...(currentValue as Record<string, unknown>) }
		} else {
			pointer[key] = {}
		}
		pointer = pointer[key] as Record<string, unknown>
	}

	pointer[keys[keys.length - 1]] = newValue
	return newObj as T
}
