const i18nConfig = {
	locales: ['en', 'fr'],
	defaultLocale: 'fr',
	localeDetection: true,
	domains: [
		{
			domain: 'andy-cinquin.fr',
			defaultLocale: 'fr',
		},
		{
			domain: 'andy-cinquin.com',
			defaultLocale: 'en',
		},
	],
}

module.exports = i18nConfig
