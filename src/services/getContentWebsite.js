import { redirect } from 'next/navigation'
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
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...options,
		},
		next: { revalidate: 86400 },
		method: 'GET',
	})

	if (!res) {
		return { notFound: true }
	}

	return await res.json()
}

/**
 * Get about page
 * @param locale
 * @returns {Promise<*>}
 */
export async function getAbout(locale) {
	const data_about = await fetchAPI(`api/about?populate=deep&locale=${locale}`)

	const processedAbout = await processMarkdown(
		data_about.data.attributes.content
	)

	return updateNestedProperty(
		data_about,
		'data.attributes.content',
		processedAbout
	)
}

/**
 * get article by id and locale
 * @param id
 * @param locale
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getArticleById(id, locale) {
	return fetchAPI(`api/articles/${id}/populate=deep&locale=${locale}`)
}

/**
 * Get article by slug
 * @param slug
 * @param locale
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getArticleBySlug(slug, locale) {
	return fetchAPI(
		`api/articles?populate=deep,3&sort=rank&filters[slug][$eq]=${slug}&locale=${locale}`
	)
}

/**
 * Get article paths
 * @returns {Promise<*|*[]>}
 */
export async function getArticlePaths(locale) {
	const data = await getArticles(locale)

	return (
		data?.data?.map(record => ({
			params: {
				slug: record.attributes.slug,
			},
		})) || []
	)
}

/**
 * Get articles
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getArticles(locale, page = 1, pageSize = 5) {
	return await fetchAPI(
		`api/articles?populate=deep,2&sort=rank&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
	)
}

/**
 * Get cgu page
 * @param locale
 * @returns {Promise<*>}
 */
export async function getCgu(locale) {
	const data_cgu = await fetchAPI(`api/cgu?populate=deep&locale=${locale}`)

	const processedCgu = await processMarkdown(data_cgu.data.attributes.content)

	return updateNestedProperty(data_cgu, 'data.attributes.content', processedCgu)
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Get content website
 * @returns {Promise<*>}
 */
export async function getContentWebsite(locale) {
	try {
		const data_content_website = await fetchAPI(
			`api/content-website?populate=deep&locale=${locale}`
		)

		const processedContentFooter = await processMarkdown(
			data_content_website.data?.attributes?.content_footer?.content || ''
		)

		const processedContentCta = await processMarkdown(
			data_content_website.data?.attributes?.cta?.content || ''
		)

		const processedContentSignature = await processMarkdown(
			data_content_website.data?.attributes?.content_footer
				?.content_signature || ''
		)

		return updateNestedProperty(
			updateNestedProperty(
				updateNestedProperty(
					data_content_website,
					'data.attributes.content_footer.content',
					processedContentFooter
				),
				'data.attributes.cta.content',
				processedContentCta
			),
			'data.attributes.content_footer.content_signature',
			processedContentSignature
		)
	} catch (error) {
		console.error('Error in getContentWebsite:', error)
	}
}

export async function getNotFound(locale) {
	const data_not_found = await fetchAPI(
		`api/not-found?populate=deep&locale=${locale}`
	)

	const processedNotFound = await processMarkdown(
		data_not_found.data.attributes.content
	)

	return updateNestedProperty(
		data_not_found,
		'data.attributes.content',
		processedNotFound
	)
}

/**
 * Get realisation by slug
 * @param slug
 * @param locale
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getRealisationBySlug(slug, locale) {
	return fetchAPI(
		`api/realisations?populate=deep,4&sort=rank&filters[slug][$eq]=${slug}&locale=${locale}`
	)
}

/**
 * Get realisation paths
 * @returns {Promise<*|*[]>}
 */
export async function getRealisationPaths(locale) {
	const data = await getRealisations(locale)

	return (
		data?.data?.map(record => ({
			params: {
				slug: record.attributes.slug,
			},
		})) || []
	)
}

/**
 * Get realisations
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getRealisations(locale) {
	return await fetchAPI(
		`api/realisations?populate=deep,2&sort=rank&locale=${locale}`
	)
}

/**
 * Get services
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getServices(locale) {
	return await fetchAPI(`api/services?populate=deep&locale=${locale}`)
}

/**
 * Get services grid
 * @param locale
 * @returns {Promise<{notFound: boolean}|*>}
 */
export async function getServicesGrid(locale) {
	return await fetchAPI(`api/service-grids?populate=deep&locale=${locale}`)
}

/**
 * Get article by slug
 * @param articleData
 * @returns {Promise<*&{data: {attributes: (*&{content: string})}}>}
 */
export async function processArticleData(articleData) {
	if (!articleData) {
		redirect('/404')
	}

	const processedContentArticles = await processMarkdown(
		articleData.attributes.content
	)

	return {
		...articleData,
		data: {
			// ...articleData.data,
			attributes: {
				...articleData.attributes,
				content: processedContentArticles.toString(),
			},
		},
	}
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
 * Get article by slug
 * @param realisationData
 * @returns {Promise<*&{data: {attributes: (*&{content: string})}}>}
 */
export async function processRealisationData(realisationData) {
	if (!realisationData) {
		redirect('/404')
	}

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
