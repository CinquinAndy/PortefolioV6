export const translations = {
	fr: {
		// Navigation
		home: 'Accueil',
		previous: 'Précédent',
		next: 'Suivant',

		// Portfolio/Realisations
		realisations: 'Réalisations',
		viewProject: 'Voir le projet',
		previousProject: 'Réalisation précédente',
		nextProject: 'Réalisation suivante',
		viewRealisation: 'Voir la réalisation',
	},
	en: {
		// Navigation
		home: 'Home',
		previous: 'Previous',
		next: 'Next',

		// Portfolio/Realisations
		realisations: 'Projects',
		viewProject: 'View project',
		previousProject: 'Previous project',
		nextProject: 'Next project',
		viewRealisation: 'View project',
	},
} as const

export type TranslationKey = keyof typeof translations.fr
export type Locale = keyof typeof translations

export function t(key: TranslationKey, locale: string = 'fr'): string {
	const lang = (locale === 'en' ? 'en' : 'fr') as Locale
	return translations[lang][key] || translations.fr[key]
}
