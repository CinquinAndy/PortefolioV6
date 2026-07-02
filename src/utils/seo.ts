/**
 * Get the base URL for a given locale
 * @param locale - The locale ('fr' or 'en')
 * @returns The base URL for the locale
 */
export function getBaseUrl(locale: string): string {
	if (locale === 'fr') {
		return process.env.NEXT_PUBLIC_URL ?? 'https://andy-cinquin.fr'
	}
	return process.env.NEXT_PUBLIC_URL_ALT ?? 'https://andy-cinquin.com'
}

/**
 * Get the metadata base URL for a given locale
 * @param locale - The locale ('fr' or 'en')
 * @returns URL object for metadataBase
 */
export function getMetadataBase(locale: string): URL {
	return new URL(getBaseUrl(locale))
}

/**
 * Get the canonical URL for a given locale and path
 * @param locale - The locale ('fr' or 'en')
 * @param path - The path (e.g., '/blog/article-slug')
 * @returns The full canonical URL
 */
export function getCanonicalUrl(locale: string, path: string = ''): string {
	const baseUrl = getBaseUrl(locale)
	return path ? `${baseUrl}${path}` : baseUrl
}

/**
 * Get alternate language URLs
 * @param path - The path (e.g., '/blog/article-slug')
 * @param frPath - Optional specific path for French version
 * @param enPath - Optional specific path for English version
 * @returns Object with language alternates
 */
export function getLanguageAlternates(
	path: string = '',
	frPath?: string,
	enPath?: string
): { 'fr-FR': string; 'en-US': string } {
	const frUrl = process.env.NEXT_PUBLIC_URL ?? 'https://andy-cinquin.fr'
	const enUrl = process.env.NEXT_PUBLIC_URL_ALT ?? 'https://andy-cinquin.com'

	const finalFrPath = frPath ?? path
	const finalEnPath = enPath ?? path

	return {
		'fr-FR': finalFrPath && finalFrPath.length > 0 ? `${frUrl}${finalFrPath}` : frUrl,
		'en-US': finalEnPath && finalEnPath.length > 0 ? `${enUrl}${finalEnPath}` : enUrl,
	}
}

/**
 * Build the path of a course page in the other locale.
 *
 * Course, chapter and lesson slugs are localized in Strapi: reusing the
 * current slug on the other domain leads to a 404. A deep path is only
 * returned when EVERY localized slug of the URL is known (i.e. the entries
 * are linked as localizations in Strapi); otherwise we fall back to the
 * course listing, which exists on both domains.
 *
 * @param alternateSlugs - The localized slugs of each URL segment, in order
 *   (parent course, then chapter, then lesson). Pass nothing for the fallback.
 * @returns The path to use on the other domain (e.g. '/course/mon-cours' or '/course')
 */
export function getAlternateCoursePath(...alternateSlugs: Array<string | undefined>): string {
	const allKnown =
		alternateSlugs.length > 0 && alternateSlugs.every(slug => typeof slug === 'string' && slug.length > 0)

	return allKnown ? `/course/${alternateSlugs.join('/')}` : '/course'
}
