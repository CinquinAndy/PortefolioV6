import { remark } from 'remark'
import html from 'remark-html'

/**
 * Fetch data from API
 * @param path
 * @param options
 * @returns {Promise<{notFound: boolean}|any>}
 */
export async function fetchAPI(path, options = {}) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			...options,
		},
	})

	if (!res) {
		return { notFound: true }
	}

	return await res.json()
}

/**
 * Process markdown content
 * @param markdownContent
 * @returns {Promise<string>}
 */
export async function processMarkdown(markdownContent) {
	const result = await remark().use(html).process(markdownContent)
	return result.toString()
}

/**
 * Update nested property
 * @param obj
 * @param path
 * @param newValue
 * @returns {*}
 */
export function updateNestedProperty(obj, path, newValue) {
	// Convertir le chemin en tableau de clés
	const keys = Array.isArray(path) ? path : path.split('.')

	// Cloner l'objet
	let newObj = { ...obj }

	// Pointer vers l'objet à modifier
	let pointer = newObj
	for (let i = 0; i < keys.length - 1; i++) {
		pointer[keys[i]] = { ...pointer[keys[i]] }
		pointer = pointer[keys[i]]
	}

	// Mettre à jour la propriété
	pointer[keys[keys.length - 1]] = newValue

	return newObj
}

/**
 * Get content website
 * @returns {Promise<*>}
 */
export async function getContentWebsite() {
	const data_content_website = await fetchAPI(
		'api/content-website?populate=deep'
	)

	const processedContentFooter = await processMarkdown(
		data_content_website.data.attributes.content_footer.content
	)
	const processedContentCta = await processMarkdown(
		data_content_website.data.attributes.cta.content
	)

	return updateNestedProperty(
		updateNestedProperty(
			data_content_website,
			'data.attributes.content_footer.content',
			processedContentFooter
		),
		'data.attributes.cta.content',
		processedContentCta
	)
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Get services
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getServices() {
	return await fetchAPI('api/services?populate=deep')
}

/**
 * Get realisations
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getRealisations() {
	return await fetchAPI('api/realisations?populate=deep,2&sort=rank')
}

/**
 * Get articles
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getArticles() {
	return await fetchAPI('api/articles?populate=deep,2&sort=rank')
}

/**
 * Get realisation by slug
 * @param slug
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getRealisationBySlug(slug) {
	return fetchAPI(
		`api/realisations?populate=deep,3&sort=rank&filters[slug][$eq]=${slug}`
	)
}

/**
 * Get article by slug
 * @param slug
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getArticleBySlug(slug) {
	return fetchAPI(
		`api/articles?populate=deep,3&sort=rank&filters[slug][$eq]=${slug}`
	)
}

/**
 * Get article by slug
 * @param realisationData
 * @returns {Promise<*&{data: {attributes: (*&{content: string})}}>}
 */
export async function processRealisationData(realisationData) {
	const processedContentRealisations = await processMarkdown(
		realisationData.data[0].attributes.content
	)
	return {
		...realisationData,
		data: {
			// ...realisationData.data,
			attributes: {
				...realisationData.data[0].attributes,
				content: processedContentRealisations.toString(),
			},
		},
	}
}

/**
 * Get article by slug
 * @param articleData
 * @returns {Promise<*&{data: {attributes: (*&{content: string})}}>}
 */
export async function processArticleData(articleData) {
	const processedContentArticles = await processMarkdown(
		articleData.data[0].attributes.content
	)
	return {
		...articleData,
		data: {
			// ...articleData.data,
			attributes: {
				...articleData.data[0].attributes,
				content: processedContentArticles.toString(),
			},
		},
	}
}

/**
 * Get realisation paths
 * @returns {Promise<*|*[]>}
 */
export async function getRealisationPaths() {
	const data = await getRealisations()

	return (
		data?.data?.map(record => ({
			params: {
				slug: record.attributes.slug,
			},
		})) || []
	)
}

/**
 * Get article paths
 * @returns {Promise<*|*[]>}
 */
export async function getArticlePaths() {
	const data = await getArticles()

	return (
		data?.data?.map(record => ({
			params: {
				slug: record.attributes.slug,
			},
		})) || []
	)
}
