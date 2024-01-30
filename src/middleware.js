import { i18nRouter } from 'next-i18n-router'

export function middleware(request) {
	const { host } = request.nextUrl
	console.log('request', request)

	console.log('host', host)
	let newLocale
	if (host === process.env.NEXT_PUBLIC_URL) {
		newLocale = 'fr'
	} else if (host === process.env.NEXT_PUBLIC_URL_ALT) {
		newLocale = 'en'
	} else {
		newLocale = 'en' // Locale par défaut pour les autres domaines
	}

	// Définir la locale dans les headers de la requête
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
