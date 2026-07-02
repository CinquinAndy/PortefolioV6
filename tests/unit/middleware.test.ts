import { beforeAll, describe, expect, test } from 'bun:test'
import { NextRequest } from 'next/server'
import { middleware } from '@/middleware'

/**
 * Regression tests for the domain-based i18n middleware.
 *
 * Context (bug fixed in 2026-07): course slugs are localized per locale
 * (EN: /course/javascript-frameworks-training, FR: /course/frameworks-javascript).
 * A stale NEXT_LOCALE=fr cookie on the EN domain used to make next-i18n-router
 * redirect /course/<en-slug> to /fr/course/<en-slug>, which does not exist -> 404.
 * The locale must be determined SOLELY by the domain, never by cookie or
 * accept-language header.
 */

const FR_HOST = 'andy-cinquin.fr'
const EN_HOST = 'andy-cinquin.com'

beforeAll(() => {
	process.env.NEXT_PUBLIC_URL = `https://${FR_HOST}`
	process.env.NEXT_PUBLIC_URL_ALT = `https://${EN_HOST}`
})

function makeRequest(host: string, path: string, headers: Record<string, string> = {}): NextRequest {
	return new NextRequest(new URL(`https://${host}${path}`), {
		headers: { host, ...headers },
	})
}

function rewriteTarget(response: Response): string | null {
	const rewrite = response.headers.get('x-middleware-rewrite')
	return rewrite ? new URL(rewrite).pathname : null
}

describe('domain-based locale resolution', () => {
	test('EN domain rewrites unprefixed course URL to /en (no redirect)', () => {
		const response = middleware(makeRequest(EN_HOST, '/course/javascript-frameworks-training'))

		expect(response.status).toBe(200)
		expect(rewriteTarget(response)).toBe('/en/course/javascript-frameworks-training')
	})

	test('FR domain rewrites unprefixed course URL to /fr (no redirect)', () => {
		const response = middleware(makeRequest(FR_HOST, '/course/frameworks-javascript'))

		expect(response.status).toBe(200)
		expect(rewriteTarget(response)).toBe('/fr/course/frameworks-javascript')
	})
})

describe('NEXT_LOCALE cookie must never influence routing (404 regression)', () => {
	test('EN domain with stale fr cookie still serves the EN course page', () => {
		const response = middleware(
			makeRequest(EN_HOST, '/course/javascript-frameworks-training', { cookie: 'NEXT_LOCALE=fr' })
		)

		// The bug: a 307 redirect to /fr/course/javascript-frameworks-training (which 404s)
		expect(response.status).toBe(200)
		expect(response.headers.get('location')).toBeNull()
		expect(rewriteTarget(response)).toBe('/en/course/javascript-frameworks-training')
	})

	test('FR domain with stale en cookie still serves the FR course page', () => {
		const response = middleware(makeRequest(FR_HOST, '/course/frameworks-javascript', { cookie: 'NEXT_LOCALE=en' }))

		expect(response.status).toBe(200)
		expect(response.headers.get('location')).toBeNull()
		expect(rewriteTarget(response)).toBe('/fr/course/frameworks-javascript')
	})

	test('middleware never sets a NEXT_LOCALE cookie', () => {
		const paths: Array<[string, string]> = [
			[EN_HOST, '/course/javascript-frameworks-training'],
			[EN_HOST, '/fr/course/frameworks-javascript'],
			[FR_HOST, '/course/frameworks-javascript'],
			[FR_HOST, '/en/course/javascript-frameworks-training'],
		]

		for (const [host, path] of paths) {
			const response = middleware(makeRequest(host, path))
			expect(response.headers.get('set-cookie')).toBeNull()
		}
	})
})

describe('accept-language must never influence routing', () => {
	test('French browser landing on EN domain gets the EN page', () => {
		const response = middleware(
			makeRequest(EN_HOST, '/course/javascript-frameworks-training', {
				'accept-language': 'fr-FR,fr;q=0.9,en;q=0.5',
			})
		)

		expect(response.status).toBe(200)
		expect(rewriteTarget(response)).toBe('/en/course/javascript-frameworks-training')
	})

	test('English browser landing on FR domain gets the FR page', () => {
		const response = middleware(
			makeRequest(FR_HOST, '/course/frameworks-javascript', {
				'accept-language': 'en-US,en;q=0.9',
			})
		)

		expect(response.status).toBe(200)
		expect(rewriteTarget(response)).toBe('/fr/course/frameworks-javascript')
	})
})

describe('explicit locale prefixes keep working', () => {
	test('/fr/... on the EN domain is served (cross-locale deep link)', () => {
		const response = middleware(makeRequest(EN_HOST, '/fr/course/frameworks-javascript'))

		expect(response.status).toBe(200)
		expect(response.headers.get('location')).toBeNull()
	})

	test('/en/... on the EN domain redirects to the canonical unprefixed URL', () => {
		const response = middleware(makeRequest(EN_HOST, '/en/course/javascript-frameworks-training'))

		expect(response.status).toBe(307)
		expect(new URL(response.headers.get('location') ?? '', `https://${EN_HOST}`).pathname).toBe(
			'/course/javascript-frameworks-training'
		)
	})

	test('/fr/... on the FR domain redirects to the canonical unprefixed URL', () => {
		const response = middleware(makeRequest(FR_HOST, '/fr/course/frameworks-javascript'))

		expect(response.status).toBe(307)
		expect(new URL(response.headers.get('location') ?? '', `https://${FR_HOST}`).pathname).toBe(
			'/course/frameworks-javascript'
		)
	})
})
