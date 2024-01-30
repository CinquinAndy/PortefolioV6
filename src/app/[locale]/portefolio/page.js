import {
	getContentWebsite,
	getRealisations,
} from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import Realisations from '@/components/Global/Realisations'

export async function generateMetadata({ params }) {
	// fetch data
	const content_website = await getContentWebsite(params.locale)

	return {
		title:
			content_website?.data?.attributes?.content_realisations?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			content_website?.data?.attributes?.content_realisations?.seo
				?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical:
				content_website?.data?.attributes?.content_realisations?.seo
					?.canonical || '/',
			languages: {
				'en-US': '/',
				'fr-FR': 'https://andy-cinquin.fr',
			},
		},
	}
}

export default async function Page({ params }) {
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data
	let realisations = await getRealisations(params.locale)
	realisations = realisations?.data

	return (
		<>
			<Nav
				content_website={content_website}
				isHome={false}
				h1={content_website?.attributes?.content_realisations?.seo?.h1}
			/>
			<div>
				<Realisations
					content_website={content_website}
					realisations={realisations}
					slice={false}
					isHome={true}
				/>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
