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

	const hasAttributes = content_website && typeof content_website === 'object' && 'attributes' in content_website

	const defaultMetadata = {
		title: 'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		canonical: '/',
	}

	return {
		title: hasAttributes
			? (content_website.attributes?.content_blog?.seo?.title ?? defaultMetadata.title)
			: defaultMetadata.title,
		metadataBase: new URL(`https://andy-cinquin.com`),
		description: hasAttributes
			? (content_website.attributes?.content_blog?.seo?.description ?? defaultMetadata.description)
			: defaultMetadata.description,
		alternates: {
			languages: {
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/blog`,
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/blog`,
			},
			canonical: hasAttributes
				? (content_website.attributes?.content_blog?.seo?.canonical ?? defaultMetadata.canonical)
				: defaultMetadata.canonical,
		},
	}
}

export async function generateStaticParams(): Promise<{ params: PageParams }[]> {
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

	const pageParams = page ? parseInt(page) : 1
	const pageSize = 50

	const articlesResponse = await getArticles(locale as Locale, pageParams, pageSize)
	const articles = getResponseData(articlesResponse)

	const hasMeta = articlesResponse && typeof articlesResponse === 'object' && 'meta' in articlesResponse
	const totalArticles = hasMeta ? articlesResponse.meta?.pagination?.total || 0 : 0
	const totalPages = Math.ceil(totalArticles / pageSize)

	const currentPage = Number(page) || 1

	const contentWebsiteHasAttributes =
		content_website && typeof content_website === 'object' && 'attributes' in content_website

	return (
		<>
			<Nav
				content_website={content_website}
				h1={contentWebsiteHasAttributes ? content_website.attributes?.content_blog?.seo?.h1 : undefined}
				isHome={false}
			/>
			<div>
				<BlogContent articles={articles || []} content_website={content_website} locale={locale} />
				{totalArticles > pageSize && (
					<Pagination baseUrl={`/${locale}/blog`} currentPage={currentPage} totalPages={totalPages} />
				)}
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
