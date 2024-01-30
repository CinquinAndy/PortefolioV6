export function middleware(request) {
	const locales = ['en', 'fr']
	const { pathname, host } = request.nextUrl
	let newLocale = ''

	// Determine the locale based on the domain
	if (host === process.env.NEXT_PUBLIC_URL) {
		newLocale = 'fr'
	} else if (host === process.env.NEXT_PUBLIC_URL_ALT) {
		newLocale = 'en'
	} else {
		newLocale = 'en' // Default locale for other domains
	}

	// Check if the path contains a locale
	const pathnameHasLocale = locales.some(locale => {
		if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
			return true
		}
		return false
	})

	// Redirect to [domain]/[locale] if it's the root
	if (!pathnameHasLocale && pathname === '/') {
		request.nextUrl.pathname = `/${newLocale}`
		return Response.redirect(request.nextUrl)
	}

	// Remove the locale segment from the URL if it exists
	if (pathnameHasLocale) {
		request.nextUrl.pathname = pathname.replace(`/${newLocale}`, '')
		request.headers.set('accept-language', newLocale)
		return Response.redirect(request.nextUrl)
	}

	// No change if no locale is found in the URL
}

export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
