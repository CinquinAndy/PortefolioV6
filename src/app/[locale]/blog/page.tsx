import type { Metadata } from 'next'
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
	const content_website = await getContentWebsite(locale)

	return {
		title:
			content_website?.data?.attributes?.content_blog?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.com`),
		description:
			content_website?.data?.attributes?.content_blog?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: {
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/blog`,
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/blog`,
			},
			canonical: content_website?.data?.attributes?.content_blog?.seo?.canonical || '/',
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
	let content_website = await getContentWebsite(locale)
	content_website = content_website?.data

	const pageParams = page ? parseInt(page) : 1
	const pageSize = 50

	let articlesResponse = await getArticles(locale, pageParams, pageSize)
	let articles = articlesResponse?.data

	const totalArticles = articlesResponse?.meta?.pagination?.total
	const totalPages = Math.ceil(totalArticles / pageSize)

	const currentPage = Number(page) || 1

	return (
		<>
			<Nav content_website={content_website} h1={content_website?.attributes?.content_blog?.seo?.h1} isHome={false} />
			<div>
				<BlogContent articles={articles} content_website={content_website} locale={locale} />
				{articlesResponse.meta.pagination.total > pageSize && (
					<Pagination baseUrl={`/${locale}/blog`} currentPage={currentPage} totalPages={totalPages} />
				)}
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
