import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * API Route for On-Demand Revalidation
 *
 * This endpoint allows you to trigger cache revalidation from external sources like Strapi webhooks.
 *
 * Usage:
 * 1. Revalidate by path:
 *    POST /api/revalidate?secret=YOUR_SECRET&path=/course
 *
 * 2. Revalidate by tag:
 *    POST /api/revalidate?secret=YOUR_SECRET&tag=courses
 *
 * 3. Revalidate multiple tags:
 *    POST /api/revalidate?secret=YOUR_SECRET&tags=courses,articles,realisations
 *
 * Setup in Strapi:
 * 1. Add a webhook in Strapi settings
 * 2. URL: https://your-domain.com/api/revalidate?secret=YOUR_SECRET&tag=courses
 * 3. Events: Entry Create, Entry Update, Entry Delete
 * 4. Configure for each content type (courses, articles, realisations, etc.)
 */
export async function POST(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams
		const secret = searchParams.get('secret')
		const path = searchParams.get('path')
		const tag = searchParams.get('tag')
		const tags = searchParams.get('tags')

		// Check for secret to confirm this is a valid request
		if (!secret || secret !== process.env.REVALIDATION_SECRET) {
			return NextResponse.json(
				{
					revalidated: false,
					message: 'Invalid or missing secret token',
					now: Date.now()
				},
				{ status: 401 }
			)
		}

		// Revalidate by path
		if (path) {
			// Revalidate both locales if needed
			revalidatePath(path, 'page')
			revalidatePath(`/fr${path}`, 'page')
			revalidatePath(`/en${path}`, 'page')

			return NextResponse.json({
				revalidated: true,
				type: 'path',
				path,
				message: `Successfully revalidated path: ${path}`,
				now: Date.now(),
			})
		}

		// Revalidate by single tag
		if (tag) {
			revalidateTag(tag)

			return NextResponse.json({
				revalidated: true,
				type: 'tag',
				tag,
				message: `Successfully revalidated tag: ${tag}`,
				now: Date.now(),
			})
		}

		// Revalidate by multiple tags
		if (tags) {
			const tagList = tags.split(',').map(t => t.trim())
			for (const t of tagList) {
				revalidateTag(t)
			}

			return NextResponse.json({
				revalidated: true,
				type: 'tags',
				tags: tagList,
				message: `Successfully revalidated tags: ${tagList.join(', ')}`,
				now: Date.now(),
			})
		}

		// No path or tag provided
		return NextResponse.json(
			{
				revalidated: false,
				message: 'Missing path or tag parameter. Use ?path=/your-path or ?tag=your-tag or ?tags=tag1,tag2',
				now: Date.now(),
			},
			{ status: 400 }
		)
	} catch (error) {
		console.error('Error in revalidation:', error)
		return NextResponse.json(
			{
				revalidated: false,
				message: 'Error during revalidation',
				error: error instanceof Error ? error.message : 'Unknown error',
				now: Date.now(),
			},
			{ status: 500 }
		)
	}
}

// Also support GET for testing purposes
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const secret = searchParams.get('secret')

	if (!secret || secret !== process.env.REVALIDATION_SECRET) {
		return NextResponse.json(
			{
				message: 'Invalid or missing secret token. This endpoint requires authentication.',
				usage: 'POST /api/revalidate?secret=YOUR_SECRET&path=/course or &tag=courses',
			},
			{ status: 401 }
		)
	}

	return NextResponse.json({
		message: 'Revalidation API is ready',
		usage: {
			path: 'POST /api/revalidate?secret=YOUR_SECRET&path=/course',
			tag: 'POST /api/revalidate?secret=YOUR_SECRET&tag=courses',
			tags: 'POST /api/revalidate?secret=YOUR_SECRET&tags=courses,articles',
		},
		availableTags: [
			'courses',
			'articles',
			'realisations',
			'content-website',
			'strapi-content',
		],
	})
}
