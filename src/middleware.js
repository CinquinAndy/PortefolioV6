import { i18nRouter } from 'next-i18n-router'

export function middleware(request) {
	return i18nRouter(request, {
		locales: ['en', 'fr'],
		defaultLocale: 'en',
		serverSetCookie: 'always',
	})
	// let newLocale
	// if (
	// 	request.headers.get('host') ===
	// 	process.env.NEXT_PUBLIC_URL.replace('https://', '')
	// ) {
	// 	newLocale = 'fr'
	// } else if (
	// 	request.headers.get('host') ===
	// 	process.env.NEXT_PUBLIC_URL_ALT.replace('https://', '')
	// ) {
	// 	newLocale = 'en'
	// } else {
	// 	newLocale = 'en'
	// }
	//
	// request.headers.set('accept-language', newLocale)
	//
	// if (
	// 	request.headers.get('host') ===
	// 	process.env.NEXT_PUBLIC_URL.replace('https://', '')
	// ) {
	// 	return i18nRouter(request, {
	// 		locales: ['en', 'fr'],
	// 		defaultLocale: 'fr',
	// 		serverSetCookie: 'always',
	// 	})
	// } else {
	// 	return i18nRouter(request, {
	// 		locales: ['en', 'fr'],
	// 		defaultLocale: 'en',
	// 		serverSetCookie: 'always',
	// 	})
	// }
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
