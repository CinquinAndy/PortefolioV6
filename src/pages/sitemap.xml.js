import { lstatSync, readdirSync } from 'fs'
import * as path from 'path'

const Sitemap = () => {
	return null
}

export const getServerSideProps = async ({ res }) => {
	// Function to get directories from a directory recursively
	function getDirsFromDir(startPath) {
		let results = []

		function finder(startPath) {
			let files = readdirSync(startPath)

			for (const element of files) {
				let filename = path.join(startPath, element)
				let stat = lstatSync(filename)

				if (stat.isDirectory()) {
					results.push(filename) // add directory
					finder(filename) // recurse into it
				}
			}
		}

		finder(startPath)

		return results
	}

	// Function to filter and format paths
	function filterAndFormatPaths(paths, baseUrl) {
		return paths.filter(path => {
			// Exclude specific paths
			return ![
				`${baseUrl}/api/sendMail`,
				`${baseUrl}/blog/[slug]`,
				`${baseUrl}/portefolio/[slug]`,
				`${baseUrl}/page`, // Exclude the root page.js
			].includes(path)
		})
	}

	let dirs = getDirsFromDir('./src/app')

	// Filter and format paths for URLs
	let staticPaths = dirs.map(staticPagePath => {
		let newPath = staticPagePath
			.replace('src\\app\\[locale]\\', '')
			.replace(/\\/g, '/')
		return `${process.env.NEXT_PUBLIC_URL}/${newPath}`
	})
	console.log('staticPaths', staticPaths)

	// Filter out unwanted paths
	staticPaths = staticPaths.filter(item => {
		return ![
			`${process.env.NEXT_PUBLIC_URL}/api/sendMail`,
			`${process.env.NEXT_PUBLIC_URL}/blog/[slug]`,
			`${process.env.NEXT_PUBLIC_URL}/blog/[slug]`,
			`${process.env.NEXT_PUBLIC_URL}/portefolio/[slug]`,
			`${process.env.NEXT_PUBLIC_URL}/portefolio/[slug]/[image]`,
			`${process.env.NEXT_PUBLIC_URL}/src/app/[locale]`, // Exclude the root page.js
		].includes(item)
	})

	// add root path
	staticPaths.unshift(`${process.env.NEXT_PUBLIC_URL}/`)

	// Fetching blog and portfolio paths from the API and creating full URLs
	let staticPathsAltCopy = JSON.parse(JSON.stringify(staticPaths))
	// Separate static paths for the alternative URL
	let staticPathsAlt = staticPathsAltCopy.map(staticPath => {
		return staticPath.replace(
			`${process.env.NEXT_PUBLIC_URL}/`,
			`${process.env.NEXT_PUBLIC_URL_ALT}/`
		)
	})

	staticPaths = filterAndFormatPaths(staticPaths, process.env.NEXT_PUBLIC_URL)
	staticPathsAlt = filterAndFormatPaths(
		staticPathsAlt,
		process.env.NEXT_PUBLIC_URL_ALT
	)
	console.log('staticPaths', staticPaths)
	console.log('staticPathsAlt', staticPathsAlt)

	// get all article for dynamic paths
	const resultBlog = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=deep`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	).then(res => res.json())
	console.log('resultBlog', resultBlog)

	const pathsBlog = resultBlog?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL}/blog/${record.attributes.slug}`
	})
	console.log('pathsBlog', pathsBlog)

	// copy of the paths for the alternative URL
	const resultBlogAlt = JSON.parse(JSON.stringify(resultBlog))
	console.log('resultBlogAlt', resultBlogAlt)

	const pathsBlogAlt = resultBlogAlt?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL_ALT}/blog/${record.attributes.localizations?.data[0]?.attributes?.slug}`
	})
	console.log('pathsBlogAlt', pathsBlogAlt)

	// get all article for dynamic paths
	const resultPortefolio = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/realisations?populate=deep`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	).then(res => res.json())
	console.log('resultPortefolio', resultPortefolio)

	const pathsPortefolio = resultPortefolio?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL}/portefolio/${record.attributes.slug}`
	})
	console.log('pathsPortefolio', pathsPortefolio)

	const resultPortefolioAlt = JSON.parse(JSON.stringify(resultPortefolio))
	console.log('resultPortefolioAlt', resultPortefolioAlt)

	const pathsPortefolioAlt = resultPortefolioAlt?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL_ALT}/portefolio/${record.attributes.localizations?.data[0]?.attributes?.slug}`
	})
	console.log('pathsPortefolioAlt', pathsPortefolioAlt)

	const allPaths = [
		...staticPaths,
		...pathsBlog,
		...pathsPortefolio,
		...staticPathsAlt,
		...pathsBlogAlt,
		...pathsPortefolioAlt,
	]
	console.log('allPaths', allPaths)

	// Generate the sitemap
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
	  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${allPaths
			.map(url => {
				return `
			  <url>
				<loc>${url}</loc>
				<lastmod>${new Date().toISOString()}</lastmod>
				<changefreq>weekly</changefreq>
				<priority>1.0</priority>
			  </url>
			`
			})
			.join('')}
	  </urlset>`

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {},
	}
}

export default Sitemap
