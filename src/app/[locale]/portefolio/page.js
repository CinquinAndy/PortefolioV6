import { getContentWebsite, getRealisations } from '@/services/getContentWebsite'
import { localesConstant } from '@/services/localesConstant'
import Realisations from '@/components/Global/Realisations'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

// revalidate every 12 hours
export const revalidate = 43200 // 12 hours

export async function generateMetadata({ params }) {
	const { locale } = await params
	const content_website = await getContentWebsite(locale)

	return {
		title:
			content_website?.data?.attributes?.content_realisations?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.com`),
		description:
			content_website?.data?.attributes?.content_realisations?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: {
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/portefolio`,
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/portefolio`,
			},
			canonical: content_website?.data?.attributes?.content_realisations?.seo?.canonical || '/',
		},
	}
}

export async function generateStaticParams() {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export default async function Page({ params }) {
	const { locale } = await params
	let content_website = await getContentWebsite(locale)
	content_website = content_website?.data
	let realisations = await getRealisations(locale)
	realisations = realisations?.data

	return (
		<>
			<Nav
				content_website={content_website}
				h1={content_website?.attributes?.content_realisations?.seo?.h1}
				isHome={false}
			/>
			<div>
				<Realisations content_website={content_website} isHome={false} realisations={realisations} slice={false} />
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
