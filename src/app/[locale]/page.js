import {
	getArticles,
	getContentWebsite,
	getRealisations,
	getServices,
	getServicesGrid,
} from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Realisations from '@/components/Global/Realisations'
import Articles from '@/components/Global/Articles'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'
import { VideoBackground } from '@/components/Global/Animations/VideoBackground'
import { PopupMainCat } from '@/components/Global/PopupMainCat'
import { localesConstant } from '@/services/localesConstant'
import { ServicesGrid } from '@/components/Global/ServicesGrid'

export async function generateStaticParams() {
	// Map each locale to a params object expected by Next.js
	return localesConstant.map(locale => ({
		params: { locale },
	}))
}

export async function generateMetadata({ params }) {
	// fetch data
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data

	return {
		title:
			content_website?.attributes?.content_home?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			content_website?.attributes?.content_home?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.fr`),
		alternates: {
			canonical:
				content_website?.attributes?.content_home?.seo?.canonical || '/',
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}`,
			},
		},
	}
}

export default async function Page({ params }) {
	let content_website = await getContentWebsite(params.locale)
	content_website = content_website?.data
	let services = await getServicesGrid(params.locale)
	services = services?.data
	let realisations = await getRealisations(params.locale)
	realisations = realisations?.data
	let articles = await getArticles(params.locale)
	articles = articles?.data

	return (
		<>
			{/*<LoaderFullPage params={params} />*/}
			<Nav content_website={content_website} />
			<PopupMainCat content_website={content_website} />

			<div className={'mask absolute left-0 top-0 -z-10 h-screen w-screen'}>
				<div className="mask absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
					<VideoBackground />
				</div>
			</div>

			<div className={'relative'}>
				<ServicesGrid content_website={content_website} services={services} />
				<Realisations
					content_website={content_website}
					realisations={realisations}
					slice={3}
					isHome={true}
				/>
				<Articles
					content_website={content_website}
					articles={articles}
					slice={3}
					isHome={true}
				/>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
