import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'

import { getResponseData } from '@/types/strapi'

import { getArticles, getContentWebsite, getRealisations, getServicesGrid } from '@/services/getContentWebsite'
import { VideoBackground } from '@/components/Global/Animations/VideoBackground'
import LoaderFullPage from '@/components/Global/Animations/LoaderFullPage'
import { PopupMainCat } from '@/components/Global/PopupMainCat'
import { ServicesGrid } from '@/components/Global/ServicesGrid'
import { localesConstant } from '@/services/localesConstant'
import Realisations from '@/components/Global/Realisations'
import Articles from '@/components/Global/Articles'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

interface PageParams {
	locale: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale } = await params

	// Fetch data
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	// Extract SEO data safely
	const seoTitle = content_website?.attributes?.content_home?.seo?.title
	const seoDescription = content_website?.attributes?.content_home?.seo?.description
	const seoCanonical = content_website?.attributes?.content_home?.seo?.canonical

	return {
		title: seoTitle ?? '',
		metadataBase: new URL(`https://andy-cinquin.fr`),
		description: seoDescription ?? '',
		alternates: {
			languages: {
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}`,
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}`,
			},
			canonical: seoCanonical ?? '/',
		},
	}
}

export function generateStaticParams(): { params: PageParams }[] {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

interface HomePageProps {
	params: Promise<PageParams>
}

export default async function Page({ params }: HomePageProps) {
	const { locale } = await params
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	const services_response = await getServicesGrid(locale as Locale)
	const services = getResponseData(services_response)
	const safeServices = Array.isArray(services) ? services : []

	const realisations_response = await getRealisations(locale as Locale)
	const realisations = getResponseData(realisations_response)
	const safeRealisations = Array.isArray(realisations) ? realisations : []

	const articles_response = await getArticles(locale as Locale)
	const articles = getResponseData(articles_response)
	const safeArticles = Array.isArray(articles) ? articles : []

	return (
		<>
			<LoaderFullPage locale={locale} />
			<Nav content_website={content_website} />
			<PopupMainCat content_website={content_website} />

			<div className={'mask absolute left-0 top-0 -z-10 h-screen w-screen'}>
				<div className="mask absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
					<VideoBackground />
				</div>
			</div>

			<div className={'relative'}>
				<ServicesGrid content_website={content_website} services={safeServices} />
				<Realisations content_website={content_website} isHome={true} realisations={safeRealisations} slice={3} />
				<Articles articles={safeArticles} content_website={content_website} isHome={true} slice={3} />
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
