import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'

import { getResponseData } from '@/types/strapi'

import { HoloComponent } from '@/components/Global/Animations/HoloComponent'
import { getAbout, getContentWebsite } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import { Layout } from '@/components/Global/Layout'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

interface PageParams {
	locale: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale } = await params
	// fetch data
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	return {
		title:
			content_website?.attributes?.content_about?.seo?.title ?? 'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.com`),
		description:
			content_website?.attributes?.content_about?.seo?.description ??
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: {
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/about`,
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/about`,
			},
			canonical: content_website?.attributes?.content_about?.seo?.canonical ?? '/',
		},
	}
}

export function generateStaticParams(): { params: PageParams }[] {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

interface AboutPageProps {
	params: Promise<PageParams>
}

export default async function Page({ params }: AboutPageProps) {
	const { locale } = await params
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	const about_response = await getAbout(locale as Locale)
	const about = getResponseData(about_response)

	return (
		<>
			<Nav content_website={content_website} h1={content_website?.attributes?.content_about?.seo?.h1} isHome={false} />
			<div>
				<div className={'relative'}>
					<div className={'my-24 grid grid-cols-1 px-6 md:my-48 md:grid-cols-2 2xl:px-0'}>
						<div className={'flex w-full justify-center'}>
							<HoloComponent lang={locale} />
						</div>
						<div className="">
							<article>
								<div className={'prose prose-invert my-8'}>
									<Layout value={about?.attributes?.content?.toString() ?? ''} />
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>

			<Cta content_website={content_website} />

			<Footer content_website={content_website} />
		</>
	)
}
