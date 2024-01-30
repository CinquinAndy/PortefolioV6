export function middleware(request) {
	const { host } = request.nextUrl

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

	// Utilisez le rendu conditionnel dans vos composants/pages pour afficher le contenu en fonction de la locale
	// Pas de redirection nécessaire
}

export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
