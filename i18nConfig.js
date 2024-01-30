const i18nConfig = {
	locales: ['en-US', 'fr'],
	defaultLocale: 'en-US',
	localeDetection: true,
	domains: [
		{
			domain: 'andy-cinquin.fr',
			defaultLocale: 'fr',
		},
		{
			domain: 'andy-cinquin.com',
			defaultLocale: 'en-US',
		},
	],
}

module.exports = i18nConfig
