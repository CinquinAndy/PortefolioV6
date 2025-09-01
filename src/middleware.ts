import { i18nRouter } from 'next-i18n-router'
import type { NextRequest, NextResponse } from 'next/server'
import type { I18nConfig } from '@/types/middleware'

export function middleware(request: NextRequest): NextResponse {
	let newLocale: string
	
	const host = request.headers.get('host')
	const frenchUrl = process.env.NEXT_PUBLIC_URL?.replace('https://', '') || ''
	const englishUrl = process.env.NEXT_PUBLIC_URL_ALT?.replace('https://', '') || ''
	
	if (host === frenchUrl) {
		newLocale = 'fr'
	} else if (host === englishUrl) {
		newLocale = 'en'
	} else {
		newLocale = 'en'
	}

	request.headers.set('accept-language', newLocale)

	const i18nConfig: I18nConfig = {
		serverSetCookie: 'always',
		locales: ['en', 'fr'],
		defaultLocale: host === frenchUrl ? 'fr' : 'en',
	}

	return i18nRouter(request, i18nConfig)
}

export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}