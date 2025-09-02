import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'

import { getMetadataBase, getCanonicalUrl, getLanguageAlternates } from '@/utils/seo'
import { getResponseData } from '@/types/strapi'

import { getArticles, getContentWebsite } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import { BlogContent } from '@/components/blog/BlogContent'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

// revalidate every 12 hours
export const revalidate = 43200 // 12 hours

interface PageParams {
	locale: Locale
}


export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale } = await params
	// fetch data
	const content_website_response = await getContentWebsite(locale)
	const content_website = getResponseData(content_website_response)

	return {
		title: content_website?.attributes?.content_blog?.seo?.title,
		metadataBase: getMetadataBase(locale),
		description: content_website?.attributes?.content_blog?.seo?.description,
		alternates: {
			languages: getLanguageAlternates('/blog'),
			canonical: content_website?.attributes?.content_blog?.seo?.canonical ?? getCanonicalUrl(locale, '/blog'),
		},
	}
}

export function generateStaticParams(): { params: PageParams }[] {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

interface BlogPageProps {
	params: Promise<PageParams>
}

export default async function Page({ params }: BlogPageProps) {
	const { locale } = await params
	const content_website_response = await getContentWebsite(locale)
	const content_website = getResponseData(content_website_response)

	// Fetch all articles without pagination for client-side handling
	const articlesResponse = await getArticles(locale, 1, 1000) // Large page size to get all articles
	const articles = getResponseData(articlesResponse)

	return (
		<>
			{content_website && (
				<Nav
					locale={locale}
					content_website={content_website}
					h1={content_website.attributes?.content_blog?.seo?.h1 ?? ''}
					isHome={false}
				/>
			)}
			<div>
				<BlogContent articles={articles ?? []} locale={locale} />
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
