import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'

import { getMetadataBase, getCanonicalUrl, getLanguageAlternates } from '@/utils/seo'
import { getResponseData } from '@/types/strapi'

import { getCgu, getContentWebsite } from '@/services/getContentWebsite'
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
		title: content_website?.attributes?.content_cgu?.seo?.title ?? 'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: getMetadataBase(locale),
		description:
			content_website?.attributes?.content_cgu?.seo?.description ??
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: getLanguageAlternates('/cgu'),
			canonical: content_website?.attributes?.content_cgu?.seo?.canonical ?? getCanonicalUrl(locale, '/cgu'),
		},
	}
}

export function generateStaticParams(): { params: PageParams }[] {
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

	const cgu_response = await getCgu(locale as Locale)
	const cgu = getResponseData(cgu_response)

	return (
		<>
			<Nav locale={locale} content_website={content_website} h1={content_website?.attributes?.content_cgu?.seo?.h1} isHome={false} />
			<div>
				<div className={'relative'}>
					<div className={'my-24 grid grid-cols-1 px-6 md:my-48 2xl:px-0'}>
						<div className="mx-auto max-w-3xl">
							<article>
								<div className={'prose prose-invert my-8'}>
									<Layout value={cgu?.attributes?.content?.toString() ?? ''} />
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
