// import React from 'react'
// import { readdirSync, lstatSync } from 'fs'
// import * as path from 'path'
//
// const Sitemap = () => {
// 	return null
// }
//
// export const getServerSideProps = async ({ res }) => {
// 	// Function to get files from a directory recursively
// 	function getFilesFromDir(startPath) {
// 		let results = []
//
// 		function finder(startPath) {
// 			let files = readdirSync(startPath)
//
// 			for (const element of files) {
// 				let filename = path.join(startPath, element)
// 				let stat = lstatSync(filename)
//
// 				if (stat.isDirectory()) {
// 					finder(filename) // recurse
// 				} else {
// 					results.push(filename)
// 				}
// 			}
// 		}
//
// 		finder(startPath)
//
// 		return results
// 	}
//
// 	// Common function to filter and format paths for both URLs
// 	function filterAndFormatPaths(staticPaths, baseUrl) {
// 		return staticPaths.filter(item => {
// 			return ![
// 				`${baseUrl}/api/sendMail`,
// 				`${baseUrl}/blog/[slug]`,
// 				`${baseUrl}/portefolio/[slug]`,
// 			].includes(item)
// 		})
// 	}
//
// 	let files = getFilesFromDir('./src/pages')
//
// 	let staticPaths = files
// 		.filter(staticPagePath => {
// 			let base = path.basename(staticPagePath)
// 			return ![
// 				'api',
// 				'api/sendMail',
// 				'_app.js',
// 				'_document.js',
// 				'404.js',
// 				'sitemap.xml.js',
// 				'index.js',
// 			].includes(base)
// 		})
// 		.map(staticPagePath => {
// 			let parsedPath = path.parse(staticPagePath)
// 			let newPath = `${parsedPath.dir}/${parsedPath.name}`
// 				.replace('src\\pages\\', '')
// 				.replace('src\\pages', '')
// 				.replace('src/pages', '')
// 			return `${process.env.NEXT_PUBLIC_URL}/${newPath}`.replace(
// 				`${process.env.NEXT_PUBLIC_URL}//`,
// 				`${process.env.NEXT_PUBLIC_URL}/`
// 			)
// 		})
//
// 	let staticPathsAltCopy = JSON.parse(JSON.stringify(staticPaths))
// 	// Separate static paths for the alternative URL
// 	let staticPathsAlt = staticPathsAltCopy.map(staticPath => {
// 		return staticPath.replace(
// 			`${process.env.NEXT_PUBLIC_URL}/`,
// 			`${process.env.NEXT_PUBLIC_URL_ALT}/`
// 		)
// 	})
//
// 	staticPaths = filterAndFormatPaths(staticPaths, process.env.NEXT_PUBLIC_URL)
// 	staticPathsAlt = filterAndFormatPaths(
// 		staticPathsAlt,
// 		process.env.NEXT_PUBLIC_URL_ALT
// 	)
//
// 	// get all article for dynamic paths
// 	const resultBlog = await fetch(
// 		`${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
// 		{
// 			method: 'GET',
// 			headers: {
// 				// 	token
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json',
// 				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
// 			},
// 		}
// 	).then(res => res.json())
//
// 	const pathsBlog = resultBlog?.data?.map(record => {
// 		return `${process.env.NEXT_PUBLIC_URL}/blog/${record.attributes.slug}`
// 	})
//
// 	// copy of the paths for the alternative URL
// 	const resultBlogAlt = JSON.parse(JSON.stringify(resultBlog))
//
// 	const pathsBlogAlt = resultBlogAlt?.data?.map(record => {
// 		return `${process.env.NEXT_PUBLIC_URL_ALT}/blog/${record.attributes.slug}`
// 	})
//
// 	// get all article for dynamic paths
// 	const resultPortefolio = await fetch(
// 		`${process.env.NEXT_PUBLIC_API_URL}/api/realisations`,
// 		{
// 			method: 'GET',
// 			headers: {
// 				// 	token
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json',
// 				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
// 			},
// 		}
// 	).then(res => res.json())
//
// 	const pathsPortefolio = resultPortefolio?.data?.map(record => {
// 		return `${process.env.NEXT_PUBLIC_URL}/portefolio/${record.attributes.slug}`
// 	})
//
// 	const resultPortefolioAlt = JSON.parse(JSON.stringify(resultPortefolio))
//
// 	const pathsPortefolioAlt = resultPortefolioAlt?.data?.map(record => {
// 		return `${process.env.NEXT_PUBLIC_URL_ALT}/portefolio/${record.attributes.slug}`
// 	})
//
// 	const allPaths = [
// 		...staticPaths,
// 		...pathsBlog,
// 		...pathsPortefolio,
// 		...staticPathsAlt,
// 		...pathsBlogAlt,
// 		...pathsPortefolioAlt,
// 	]
//
// 	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${allPaths
// 				.map(url => {
// 					return `
//             <url>
//               <loc>${url}</loc>
//               <lastmod>${new Date().toISOString()}</lastmod>
//               <changefreq>weekly</changefreq>
//               <priority>1.0</priority>
//             </url>
//           `
// 				})
// 				.join('')}
//     </urlset>
//   `
//
// 	res.setHeader('Content-Type', 'text/xml')
// 	res.write(sitemap)
// 	res.end()
//
// 	return {
// 		props: {},
// 	}
// }
//
// export default Sitemap

import React from 'react'
import { readdirSync, lstatSync } from 'fs'
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
		console.log(staticPagePath)
		let newPath = staticPagePath
			.replace('src\\app\\[lang]\\', '')
			.replace(/\\/g, '/')
		console.log(newPath)
		return `${process.env.NEXT_PUBLIC_URL}/${newPath}`
	})

	// Filter out unwanted paths
	staticPaths = staticPaths.filter(item => {
		return ![
			`${process.env.NEXT_PUBLIC_URL}/api/sendMail`,
			`${process.env.NEXT_PUBLIC_URL}/blog/[slug]`,
			`${process.env.NEXT_PUBLIC_URL}/blog/[slug]`,
			`${process.env.NEXT_PUBLIC_URL}/portefolio/[slug]`,
			`${process.env.NEXT_PUBLIC_URL}/src/app/[lang]`, // Exclude the root page.js
		].includes(item)
	})

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

	// get all article for dynamic paths
	const resultBlog = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
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

	const pathsBlog = resultBlog?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL}/blog/${record.attributes.slug}`
	})

	// copy of the paths for the alternative URL
	const resultBlogAlt = JSON.parse(JSON.stringify(resultBlog))

	const pathsBlogAlt = resultBlogAlt?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL_ALT}/blog/${record.attributes.slug}`
	})

	// get all article for dynamic paths
	const resultPortefolio = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/realisations`,
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

	const pathsPortefolio = resultPortefolio?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL}/portefolio/${record.attributes.slug}`
	})

	const resultPortefolioAlt = JSON.parse(JSON.stringify(resultPortefolio))

	const pathsPortefolioAlt = resultPortefolioAlt?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL_ALT}/portefolio/${record.attributes.slug}`
	})

	const allPaths = [
		...staticPaths,
		...pathsBlog,
		...pathsPortefolio,
		...staticPathsAlt,
		...pathsBlogAlt,
		...pathsPortefolioAlt,
	]

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
