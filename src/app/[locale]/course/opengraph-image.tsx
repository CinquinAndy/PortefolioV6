import { generateOgImage, ogImageMetadata } from '@/components/og-image/OgImageTemplate'

export const alt = 'Cours - Andy Cinquin'
export const size = ogImageMetadata.size
export const contentType = ogImageMetadata.contentType

interface PageParams {
	locale: string
}

export default async function Image({ params }: { params: Promise<PageParams> }) {
	const { locale } = await params

	// Static title for courses page
	const title = locale === 'fr' ? 'Mes Cours - Développement Web' : 'My Courses - Web Development'

	return generateOgImage({ title })
}
