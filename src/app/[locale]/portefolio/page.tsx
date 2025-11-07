import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Realisations from '@/components/Global/Realisations'
import { getContentWebsite, getRealisations } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'
import { getCanonicalUrl, getLanguageAlternates, getMetadataBase } from '@/utils/seo'

interface PageParams {
	locale: string
}

// revalidate every 1 minute for faster updates from CMS
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale } = await params

	// Validate locale
	if (!localesConstant.includes(locale as Locale)) {
		return {}
	}

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

	// Validate locale - return 404 for invalid locales like .map files
	if (!localesConstant.includes(locale as Locale)) {
		notFound()
	}

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
