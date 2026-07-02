import type { NextRequest, NextResponse } from 'next/server'
import { i18nRouter } from 'next-i18n-router'
import type { I18nConfig } from '@/types/middleware'

export function middleware(request: NextRequest): NextResponse {
	const host = request.headers.get('host')
	const frenchUrl = process.env.NEXT_PUBLIC_URL?.replace('https://', '') ?? ''

	// Locale is determined SOLELY by the domain (fr domain => fr, anything else => en).
	// The NEXT_LOCALE cookie and the browser accept-language header must never influence
	// routing: slugs are localized per locale (e.g. /course/javascript-frameworks-training
	// only exists in "en"), so a stale "fr" cookie on the EN domain would redirect
	// /course/<en-slug> to /fr/course/<en-slug> which 404s.
	const i18nConfig: I18nConfig = {
		locales: ['en', 'fr'],
		defaultLocale: host === frenchUrl ? 'fr' : 'en',
		localeCookie: '',
		localeDetector: false,
		serverSetCookie: 'never',
	}

	return i18nRouter(request, i18nConfig)
}

export const config = {
	matcher: [
		// Match all pathnames except for:
		// - API routes
		// - _next (Next.js internals)
		// - Static files (images, fonts, etc.)
		// - Files with extensions (.map, .js, .css, etc.)
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
	],
}
