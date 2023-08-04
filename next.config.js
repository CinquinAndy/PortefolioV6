/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.andy-cinquin.fr',
			},
		],
	},
	experimental: {
		// Defaults to 50MB
		isrMemoryCacheSize: 0,
		largePageDataBytes: 5000000,
	},
	i18n: {
		locales: ['fr', 'en'],
		defaultLocale: 'fr',
	},
}

module.exports = nextConfig
