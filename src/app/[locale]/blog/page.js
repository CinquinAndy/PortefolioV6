import { getArticles, getContentWebsite } from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Articles from '@/components/Global/Articles'

export async function generateMetadata({ params }) {
	// fetch data
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

export default async function Page({ params }) {
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data
	let articles = await getArticles(params.locale)
	articles = articles?.data

	return (
		<>
			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_blog?.seo?.h1}
			/>
			<div>
				<Articles
					content_website={content_website}
					articles={articles}
					slice={false}
					isHome={true}
				/>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
