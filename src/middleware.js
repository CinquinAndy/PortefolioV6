export function middleware(request) {
	const locales = ['en', 'fr']
	const { pathname } = request.nextUrl
	let newLocale = ''

	// Check if the path contains a locale
	const pathnameHasLocale = locales.some(locale => {
		if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
			newLocale = locale
			return true
		}
		return false
	})

	if (pathnameHasLocale) {
		// Remove the locale segment from the URL
		request.nextUrl.pathname = pathname.replace(`/${newLocale}`, '')

		// Redefine the request headers for the new language
		request.headers.set('accept-language', newLocale)

		// Redirect to the new URL without the locale segment
		return Response.redirect(request.nextUrl)
	}

	// No change if no locale is found in the URL
}

export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
