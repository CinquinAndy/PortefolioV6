import { i18nRouter } from 'next-i18n-router'

export function middleware(request) {
	const { host } = request.nextUrl
	console.log('request', request.headers.get('x-forwarded-host'))
	console.log('request.headers', request.headers)

	console.log('host', host)
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

	request.headers.set('accept-language', newLocale)

	return i18nRouter(request, {
		locales: ['en', 'fr'],
		defaultLocale: 'en',
		serverSetCookie: 'if-empty',
	})
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
