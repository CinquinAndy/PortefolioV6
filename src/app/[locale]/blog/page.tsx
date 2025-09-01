import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'

import { getResponseData } from '@/types/strapi'

import { getArticles, getContentWebsite } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import { Pagination } from '@/components/Global/Pagination'
import { BlogContent } from '@/components/blog/BlogContent'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

// revalidate every 12 hours
export const revalidate = 43200 // 12 hours

interface PageParams {
	locale: string
}

interface SearchParams {
	page?: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale } = await params
	// fetch data
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	return {
		title: content_website?.attributes?.content_blog?.seo?.title,
		metadataBase: new URL(`https://andy-cinquin.com`),
		description: content_website?.attributes?.content_blog?.seo?.description,
		alternates: {
			languages: {
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/blog`,
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/blog`,
			},
			canonical: content_website?.attributes?.content_blog?.seo?.canonical,
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
	searchParams: Promise<SearchParams>
	params: Promise<PageParams>
}

export default async function Page({ searchParams, params }: BlogPageProps) {
	const { locale } = await params
	const { page } = await searchParams
	const content_website_response = await getContentWebsite(locale as Locale)
	const content_website = getResponseData(content_website_response)

	const pageParams = page != null ? parseInt(page) : 1
	const pageSize = 50

	const articlesResponse = await getArticles(locale as Locale, pageParams, pageSize)
	const articles = getResponseData(articlesResponse)

	const hasMeta = articlesResponse != null && typeof articlesResponse === 'object' && 'meta' in articlesResponse
	const totalArticles = hasMeta ? (articlesResponse.meta?.pagination?.total ?? 0) : 0
	const totalPages = Math.ceil(totalArticles / pageSize)

	const currentPage = Number(page) || 1

	return (
		<>
			{content_website && (
				<Nav
					content_website={content_website}
					h1={content_website.attributes?.content_blog?.seo?.h1 ?? ''}
					isHome={false}
				/>
			)}
			<div>
				<BlogContent articles={articles ?? []} locale={locale} />
				{totalArticles > pageSize && <Pagination currentPage={currentPage} totalPages={totalPages} />}
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
