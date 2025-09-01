import type {
	StrapiResponse,
	Article,
	Realisation,
	ContentWebsite,
	Service,
	About,
	Cgu,
	NotFound,
	Locale,
} from '@/types/strapi'
import type { FetchOptions, NotFoundResponse } from '@/types/api'

import { redirect } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'

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
	return fetchAPI<StrapiResponse<Article>>(`api/articles/${id}/populate=deep&locale=${locale}`)
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
export async function getContentWebsite(
	locale: Locale
): Promise<StrapiResponse<ContentWebsite> | NotFoundResponse | undefined> {
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
		return undefined
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
	articleData: Article
): Promise<Article & { data: { attributes: Article['attributes'] & { content: string } } }> {
	if (articleData.attributes == null) {
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
 * Process markdown content
 */
export async function processMarkdown(markdownContent: string): Promise<string> {
	const result = await remark().use(html).process(markdownContent)
	return result.toString()
}

/**
 * Process realisation data
 */
export async function processRealisationData(
	realisationData: StrapiResponse<Realisation[]>
): Promise<{ data: { attributes: Realisation['attributes'] & { content: string } } }> {
	if (realisationData.data?.[0]?.attributes == null) {
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
export function updateNestedProperty<T extends Record<string, any>>(obj: T, path: string | string[], newValue: any): T {
	const keys = Array.isArray(path) ? path : path.split('.')
	const newObj = { ...obj }
	let pointer: any = newObj

	for (let i = 0; i < keys.length - 1; i++) {
		pointer[keys[i]] = { ...pointer[keys[i]] }
		pointer = pointer[keys[i]]
	}

	pointer[keys[keys.length - 1]] = newValue
	return newObj
}
