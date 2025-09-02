import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'

import { getMetadataBase, getCanonicalUrl, getLanguageAlternates } from '@/utils/seo'
import { getResponseData } from '@/types/strapi'

import { getContentWebsite, getRealisations } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import Realisations from '@/components/Global/Realisations'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

interface PageParams {
	locale: string
}

// revalidate every 12 hours
export const revalidate = 43200 // 12 hours

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale } = await params
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	return {
		title:
			content_website?.attributes?.content_realisations?.seo?.title ??
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: getMetadataBase(locale),
		description:
			content_website?.attributes?.content_realisations?.seo?.description ??
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: getLanguageAlternates('/portefolio'),
			canonical:
				content_website?.attributes?.content_realisations?.seo?.canonical ?? getCanonicalUrl(locale, '/portefolio'),
		},
	}
}

export function generateStaticParams(): { params: PageParams }[] {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

interface PageProps {
	params: Promise<PageParams>
}

export default async function Page({ params }: PageProps) {
	const { locale } = await params
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	const realisations_response = await getRealisations(locale as Locale)
	const realisations = getResponseData(realisations_response)

	return (
		<>
			<Nav
				locale={locale}
				content_website={content_website}
				h1={content_website?.attributes?.content_realisations?.seo?.h1}
				isHome={false}
			/>
			<div>
				<Realisations content_website={content_website} isHome={false} realisations={realisations ?? []} />
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
