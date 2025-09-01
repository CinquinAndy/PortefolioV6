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
