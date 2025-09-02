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
		],
	},
	experimental: {
		optimizeCss: true,
	},
}

module.exports = nextConfig
