import type { Locale } from '@/types/strapi'

/**
 * Get the base URL for a given locale
 * @param locale - The locale ('fr' or 'en')
 * @returns The base URL for the locale
 */
export function getBaseUrl(locale: Locale): string {
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
export function getMetadataBase(locale: Locale): URL {
	return new URL(getBaseUrl(locale))
}

/**
 * Get the canonical URL for a given locale and path
 * @param locale - The locale ('fr' or 'en')
 * @param path - The path (e.g., '/blog/article-slug')
 * @returns The full canonical URL
 */
export function getCanonicalUrl(locale: Locale, path: string = ''): string {
	const baseUrl = getBaseUrl(locale)
	return path ? `${baseUrl}${path}` : baseUrl
}

/**
 * Get alternate language URLs
 * @param path - The path (e.g., '/blog/article-slug')
 * @returns Object with language alternates
 */
export function getLanguageAlternates(path: string = ''): { 'fr-FR': string; 'en-US': string } {
	const frUrl = process.env.NEXT_PUBLIC_URL ?? 'https://andy-cinquin.fr'
	const enUrl = process.env.NEXT_PUBLIC_URL_ALT ?? 'https://andy-cinquin.com'

	return {
		'fr-FR': path ? `${frUrl}${path}` : frUrl,
		'en-US': path ? `${enUrl}${path}` : enUrl,
	}
}
