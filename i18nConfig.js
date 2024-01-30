const i18nConfig = {
	locales: ['en', 'fr'],
	defaultLocale: 'fr',
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
//
// const i18nConfig = {
// 	locales: ['en', 'fr'],
// 	defaultLocale: 'fr',
// 	localeDetection: false,
// 	domains: [
// 		{
// 			domain: 'andy-cinquin.fr',
// 			defaultLocale: 'fr',
// 		},
// 		{
// 			domain: 'andy-cinquin.com',
// 			defaultLocale: 'en',
// 		},
// 	],
// }
//
// module.exports = i18nConfig
