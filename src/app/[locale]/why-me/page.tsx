import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { getContentWebsite } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'
import { getCanonicalUrl, getLanguageAlternates, getMetadataBase } from '@/utils/seo'
import WhyMeContent from './WhyMeContent'

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
	const _content_website = getResponseData(content_website_response)

	return {
		title: 'Why Me? | Andy Cinquin - Freelance Developer',
		metadataBase: getMetadataBase(locale),
		description:
			'Discover why Andy Cinquin is the right choice for your development needs. Full-stack expertise, proven track record, and passion for creating exceptional web experiences.',
		alternates: {
			languages: getLanguageAlternates('/why-me'),
			canonical: getCanonicalUrl(locale, '/why-me'),
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

	return (
		<>
			<Nav locale={locale} content_website={content_website} h1="Why Me?" isHome={false} />
			<div>
				<WhyMeContent />
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
