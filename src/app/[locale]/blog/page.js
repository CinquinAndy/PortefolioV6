import {getArticles, getContentWebsite} from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import {localesConstant} from '@/services/localesConstant'
import Pagination from '@/components/Global/Pagination'
import {CardMasonry} from "@/app/[locale]/blog/cardMasonry";
import {TagFilters} from "@/app/[locale]/blog/tagFilters";

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
    // Add error handling for content_website
    let content_website = await getContentWebsite(params.locale)
    content_website = content_website?.data || {}  // Provide default empty object

    // Add error handling for articles
    const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
    const pageSize = 12 // Increased for better masonry layout

    const articlesResponse = await getArticles(params.locale, page, pageSize)
    const articles = articlesResponse?.data || [] // Provide default empty array

    const totalArticles = articlesResponse?.meta?.pagination?.total || 0
    const totalPages = Math.ceil(totalArticles / pageSize)
    const currentPage = Number(searchParams.page) || 1

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
            <Nav
                content_website={content_website}
                isHome={false}
                h1={content_website?.attributes?.content_blog?.seo?.h1}
            />
            <main className="container mx-auto px-4 py-8">
                {/* Add filters/categories section */}
                <div className="mb-8">
                    <TagFilters articles={articles} />
                </div>

                {articles.length > 0 ? (
                    <CardMasonry articles={articles} params={params} />
                ) : (
                    <div className="text-center text-white py-12">
                        <p>No articles found</p>
                    </div>
                )}

                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        baseUrl={`/${params.locale}/blog`}
                    />
                </div>

                <div className="mt-16">
                    <Cta content_website={content_website} />
                </div>
            </main>
            <Footer content_website={content_website} />
        </div>
    )
}

