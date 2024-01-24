/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	i18n: {
		localeDetection: false,
		locales: ['fr', 'en'],
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
	},
	webpack: config => {
		let modularizeImports = null
		config.module.rules.some(rule =>
			rule.oneOf?.some(oneOf => {
				modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports
				return modularizeImports
			})
		)
		if (modularizeImports?.['@headlessui/react'])
			delete modularizeImports['@headlessui/react']
		return config
	},
}

module.exports = nextConfig
