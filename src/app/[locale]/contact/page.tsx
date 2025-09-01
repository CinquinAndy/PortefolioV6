import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'

import { getResponseData } from '@/types/strapi'

import { getContentWebsite } from '@/services/getContentWebsite'
import { ContactForm } from '@/components/Global/ContactForm'
import { localesConstant } from '@/services/localesConstant'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'

interface PageParams {
	locale: Locale
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale } = await params
	// fetch data
	const content_website_response = await getContentWebsite(locale)
	const content_website = getResponseData(content_website_response)

	return {
		title:
			content_website?.attributes?.content_contact?.seo?.title ?? 'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.com`),
		description:
			content_website?.attributes?.content_contact?.seo?.description ??
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: {
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/contact`,
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/contact`,
			},
			canonical: content_website?.attributes?.content_contact?.seo?.canonical ?? '/',
		},
	}
}

export function generateStaticParams(): { params: PageParams }[] {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map((locale: string) => ({
		params: { locale: locale as Locale },
	}))
}

interface ContactPageProps {
	params: Promise<PageParams>
}

export default async function Page({ params }: ContactPageProps) {
	const { locale } = await params
	const content_website_response = await getContentWebsite(locale)
	const content_website = getResponseData(content_website_response)

	return (
		<>
			<Nav
				content_website={content_website}
				h1={content_website?.attributes?.content_contact?.seo?.h1}
				isHome={false}
			/>
			<ContactForm content_website={content_website} />
			<Footer content_website={content_website} />
		</>
	)
}
