/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		let modularizeImports = null
		config.module.rules.some(rule =>
			rule.oneOf?.some(oneOf => {
				modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports
				return modularizeImports
			})
		)
		if (modularizeImports?.['@headlessui/react']) delete modularizeImports['@headlessui/react']
		return config
	},
	trailingSlash: false,
	reactStrictMode: true,
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
			},
		],
		qualities: [10, 85, 90, 100],
	},
	experimental: {
		optimizeCss: true,
	},
	async headers() {
		return [
			{
				source: '/sitemap.xml',
				headers: [
					{
						key: 'Content-Type',
						value: 'application/xml; charset=utf-8',
					},
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
					},
				],
			},
		]
	},
}

module.exports = nextConfig
