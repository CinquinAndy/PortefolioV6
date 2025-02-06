import {getArticles, getContentWebsite} from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import {localesConstant} from '@/services/localesConstant'
import Pagination from '@/components/Global/Pagination'
import {BlogContent} from "@/components/blog/BlogContent";

export async function generateStaticParams() {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export async function generateMetadata({ params }) {
	const {locale} = await params
	// fetch data
	const content_website = await getContentWebsite(locale)

	return {
		title:
			content_website?.data?.attributes?.content_blog?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			content_website?.data?.attributes?.content_blog?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical:
				content_website?.data?.attributes?.content_blog?.seo?.canonical || '/',
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/blog`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/blog`,
			},
		},
	}
}

export default async function Page({ params, searchParams }) {
	const { locale } = await params
	const { page } = await searchParams
	let content_website = await getContentWebsite(locale)
	content_website = content_website?.data

	const pageParams = page ? parseInt(page) : 1
	const pageSize = 24

	let articlesResponse = await getArticles(locale, pageParams, pageSize)
	let articles = articlesResponse?.data

	const totalArticles = articlesResponse?.meta?.pagination?.total
	const totalPages = Math.ceil(totalArticles / pageSize)

	const currentPage = Number(page) || 1

	return (
		<>
			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_blog?.seo?.h1}
			/>
			<div>
				<BlogContent
					content_website={content_website}
					articles={articles}
					params={params}
				/>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					baseUrl={`/${locale}/blog`}
				/>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}