import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogContent } from '@/components/blog/BlogContent'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import { getArticles, getContentWebsite } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import type { Locale } from '@/types/strapi'
import { getResponseData } from '@/types/strapi'
import { getCanonicalUrl, getLanguageAlternates, getMetadataBase } from '@/utils/seo'

// revalidate every 1 minute for faster updates from CMS
export const revalidate = 60

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

	// Format dates on the server to prevent hydration mismatch
	const articlesWithFormattedDates =
		articles?.map(article => ({
			...article,
			attributes: {
				...article.attributes,
				createdAt: formatDateForLocale(article.attributes.createdAt, locale),
			},
		})) ?? []

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
				<Suspense fallback={<BlogContentSkeleton />}>
					<BlogContent articles={articlesWithFormattedDates} locale={locale} />
				</Suspense>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}

function formatDateForLocale(dateString: string, locale: Locale): string {
	try {
		const date = new Date(dateString)
		if (locale === 'fr') {
			return new Intl.DateTimeFormat('fr-FR', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}).format(date)
		}
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(date)
	} catch (error) {
		console.error('Error formatting date:', error)
		return dateString
	}
}

function BlogContentSkeleton() {
	return (
		<section className="relative w-full">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative space-y-8 py-12 md:py-16 lg:py-20">
					{/* Search skeleton */}
					<div className="mx-auto max-w-2xl">
						<div className="h-12 bg-gray-300 rounded-lg animate-pulse" />
					</div>

					{/* Grid skeleton */}
					<div className="mx-auto max-w-360">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from({ length: 6 }, (_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton items never reorder
								<div key={`skeleton-${i}`} className="bg-gray-300 rounded-lg h-64 animate-pulse" />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
