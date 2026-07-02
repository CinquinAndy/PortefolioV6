import { describe, expect, test } from 'bun:test'
import { getAlternateCoursePath } from '@/utils/seo'

/**
 * Course/chapter/lesson slugs are localized in Strapi: the language switcher
 * and hreflang alternates must never reuse the current slug on the other
 * domain (it 404s). A deep path is only allowed when every localized slug is
 * known; anything else must fall back to the /course listing.
 */
describe('getAlternateCoursePath', () => {
	test('returns the localized course path when the slug is known', () => {
		expect(getAlternateCoursePath('frameworks-javascript')).toBe('/course/frameworks-javascript')
	})

	test('returns the full localized chapter path when all slugs are known', () => {
		expect(getAlternateCoursePath('frameworks-javascript', 'introduction')).toBe(
			'/course/frameworks-javascript/introduction'
		)
	})

	test('falls back to the course listing when no slug is provided', () => {
		expect(getAlternateCoursePath()).toBe('/course')
	})

	test('falls back to the course listing when any slug is missing', () => {
		// A partially-localized URL (known chapter but unknown parent) would 404
		expect(getAlternateCoursePath(undefined, 'introduction')).toBe('/course')
		expect(getAlternateCoursePath('frameworks-javascript', undefined)).toBe('/course')
		expect(getAlternateCoursePath('')).toBe('/course')
	})
})
