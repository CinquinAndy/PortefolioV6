import React from 'react'
import { readdirSync, lstatSync } from 'fs'
import * as path from 'path'

const Sitemap = () => {
	return null
}

export const getServerSideProps = async ({ res }) => {
	// Function to get files from a directory recursively
	function getFilesFromDir(startPath) {
		let results = []

		function finder(startPath) {
			let files = readdirSync(startPath)

			for (const element of files) {
				let filename = path.join(startPath, element)
				let stat = lstatSync(filename)

				if (stat.isDirectory()) {
					finder(filename) // recurse
				} else {
					results.push(filename)
				}
			}
		}

		finder(startPath)

		return results
	}

	// Common function to filter and format paths for both URLs
	function filterAndFormatPaths(staticPaths, baseUrl) {
		return staticPaths.filter(item => {
			return ![
				`${baseUrl}/api/sendMail`,
				`${baseUrl}/blog/[slug]`,
				`${baseUrl}/portefolio/[slug]`,
			].includes(item)
		})
	}

	let files = getFilesFromDir('./src/pages')

	let staticPaths = files
		.filter(staticPagePath => {
			let base = path.basename(staticPagePath)
			return ![
				'api',
				'api/sendMail',
				'_app.js',
				'_document.js',
				'404.js',
				'sitemap.xml.js',
				'index.js',
			].includes(base)
		})
		.map(staticPagePath => {
			let parsedPath = path.parse(staticPagePath)
			let newPath = `${parsedPath.dir}/${parsedPath.name}`
				.replace('src\\pages\\', '')
				.replace('src\\pages', '')
				.replace('src/pages', '')
			return `${process.env.NEXT_PUBLIC_URL}/${newPath}`.replace(
				`${process.env.NEXT_PUBLIC_URL}//`,
				`${process.env.NEXT_PUBLIC_URL}/`
			)
		})

	// Separate static paths for the alternative URL
	let staticPathsAlt = staticPaths.map(staticPath => {
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

	const pathsBlogAlt = resultBlog?.data?.map(record => {
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
		return `${process.env.NEXT_PUBLIC_URL}/realisation/${record.attributes.slug}`
	})

	const pathsPortefolioAlt = resultPortefolio?.data?.map(record => {
		return `${process.env.NEXT_PUBLIC_URL_ALT}/realisation/${record.attributes.slug}`
	})

	const allPaths = [
		...staticPaths,
		...pathsBlog,
		...pathsPortefolio,
		...staticPathsAlt,
		...pathsBlogAlt,
		...pathsPortefolioAlt,
	]

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
    </urlset>
  `

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {},
	}
}

export default Sitemap
