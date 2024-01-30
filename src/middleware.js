export function middleware(request) {
	const locales = ['en', 'fr']
	const { pathname } = request.nextUrl
	let newLocale = ''

	// Vérifier si le chemin contient une locale
	const pathnameHasLocale = locales.some(locale => {
		if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
			newLocale = locale
			return true
		}
		return false
	})

	if (pathnameHasLocale) {
		// Supprimer le segment de locale de l'URL
		request.nextUrl.pathname = pathname.replace(`/${newLocale}`, '')

		// Redéfinir les headers de la requête pour la nouvelle langue
		request.headers.set('accept-language', newLocale)

		// Rediriger vers la nouvelle URL sans le segment de locale
		return Response.redirect(request.nextUrl)
	}

	// Pas de changement si aucune locale n'est trouvée dans l'URL
}

export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
