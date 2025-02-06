import {
	getArticles,
	getContentWebsite,
	getRealisations,
	getServicesGrid,
} from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { localesConstant } from '@/services/localesConstant'
import { BlogContent } from '@/components/blog/BlogContent'

export async function generateStaticParams() {
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export async function generateMetadata({ params }) {
	const content_website = await getContentWebsite(params.locale)

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
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data

	const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
	const pageSize = 12

	let articles = await getArticles(params.locale, page, pageSize)
	articles = articles?.data

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_blog?.seo?.h1}
			/>

			<BlogContent
				articles={articles}
				params={params}
				pagination={{
					currentPage: page,
					totalPages: Math.ceil(
						(articles?.meta?.pagination?.total || 0) / pageSize
					),
					baseUrl: `/${params.locale}/blog`,
				}}
			/>

			<div className="container mx-auto px-4">
				<div className="mt-16">
					<Cta content_website={content_website} />
				</div>
			</div>

			<Footer content_website={content_website} />
		</div>
	)
}
