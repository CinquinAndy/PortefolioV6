import { getArticles, getContentWebsite } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import { Pagination } from '@/components/Global/Pagination'
import { BlogContent } from '@/components/blog/BlogContent'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

// revalidate every 12 hours
export const revalidate = 43200 // 12 hours

export async function generateMetadata({ params }) {
	const { locale } = await params
	// fetch data
	const content_website = await getContentWebsite(locale)

	return {
		alternates: {
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/blog`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/blog`,
			},
			canonical: content_website?.data?.attributes?.content_blog?.seo?.canonical || '/',
		},
		description:
			content_website?.data?.attributes?.content_blog?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		title:
			content_website?.data?.attributes?.content_blog?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.com`),
	}
}

export async function generateStaticParams() {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export default async function Page({ searchParams, params }) {
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
