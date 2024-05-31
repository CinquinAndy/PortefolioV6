const Sitemap = () => {
	return null
}

export const getServerSideProps = async ({ res }) => {
	const baseUrl = process.env.NEXT_PUBLIC_URL
	const alternateBaseUrl = process.env.NEXT_PUBLIC_URL_ALT

	// Define static paths manually or generate them dynamically
	const staticPaths = [
		`${baseUrl}/`,
		`${baseUrl}/about`,
		`${baseUrl}/contact`,
		`${baseUrl}/blog`,
		`${baseUrl}/portefolio`,
		`${baseUrl}/cgu`,
		// Add more static paths if needed
	]

	const staticPathsAlt = staticPaths.map(path =>
		path.replace(baseUrl, alternateBaseUrl)
	)

	// Fetch dynamic paths for blog posts and portfolio items via the Vercel API
	const resBlog = await fetch(`${baseUrl}/api/getBlogPaths`)
	const blogPaths = await resBlog.json()

	const resPortfolio = await fetch(`${baseUrl}/api/getPortfolioPaths`)
	const portfolioPaths = await resPortfolio.json()

	const allPaths = [
		...staticPaths,
		...blogPaths,
		...portfolioPaths,
		...staticPathsAlt,
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