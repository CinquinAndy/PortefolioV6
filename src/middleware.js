import { i18nRouter } from 'next-i18n-router'

export function middleware(request) {
	console.log('middleware', request.headers)
	let newLocale
	if (
		request.headers.get('x-forwarded-host') ===
		process.env.NEXT_PUBLIC_URL.replace('https://', '')
	) {
		newLocale = 'fr'
	} else if (
		request.headers.get('x-forwarded-host') ===
		process.env.NEXT_PUBLIC_URL_ALT.replace('https://', '')
	) {
		newLocale = 'en'
	} else {
		newLocale = 'en'
	}

	console.log('newLocale', newLocale)
	request.headers.set('accept-language', newLocale)

	if (
		request.headers.get('x-forwarded-host') ===
		process.env.NEXT_PUBLIC_URL.replace('https://', '')
	) {
		console.log('fr', request.headers.get('x-forwarded-host'))
		return i18nRouter(request, {
			locales: ['en', 'fr'],
			defaultLocale: 'fr',
			serverSetCookie: 'always',
		})
	} else if (
		request.headers.get('x-forwarded-host') ===
		process.env.NEXT_PUBLIC_URL_ALT.replace('https://', '')
	) {
		console.log('en', request.headers.get('x-forwarded-host'))
		return i18nRouter(request, {
			locales: ['en', 'fr'],
			defaultLocale: 'en',
			serverSetCookie: 'always',
		})
	} else {
		console.log('en', request.headers.get('x-forwarded-host'))
		return i18nRouter(request, {
			locales: ['en', 'fr'],
			defaultLocale: 'en',
			serverSetCookie: 'always',
		})
	}
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
