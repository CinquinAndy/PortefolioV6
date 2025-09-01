import {
	getArticles,
	getContentWebsite,
	getRealisations,
	getServicesGrid,
} from '@/services/getContentWebsite'
import { VideoBackground } from '@/components/Global/Animations/VideoBackground'
import LoaderFullPage from '@/components/Global/Animations/LoaderFullPage'
import { PopupMainCat } from '@/components/Global/PopupMainCat'
import { ServicesGrid } from '@/components/Global/ServicesGrid'
import { localesConstant } from '@/services/localesConstant'
import Realisations from '@/components/Global/Realisations'
import Articles from '@/components/Global/Articles'
import Footer from '@/components/Global/Footer'
import Nav from '@/components/Global/Nav'
import Cta from '@/components/Global/Cta'

export async function generateMetadata({ params }) {
	const { locale } = await params
	// fetch data
	let content_website = await getContentWebsite(locale)
	content_website = content_website?.data

	return {
		title: content_website?.attributes?.content_home?.seo?.title || 'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.fr`),
		description:
			content_website?.attributes?.content_home?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: {
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}`,
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}`,
			},
			canonical: content_website?.attributes?.content_home?.seo?.canonical || '/',
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
	let services = await getServicesGrid(locale)
	services = services?.data
	let realisations = await getRealisations(locale)
	realisations = realisations?.data
	let articles = await getArticles(locale)
	articles = articles?.data

	return (
		<>
			<LoaderFullPage locale={locale} />
			<Nav content_website={content_website} />
			<PopupMainCat content_website={content_website} />

			<div className={'mask absolute left-0 top-0 -z-10 h-screen w-screen'}>
				<div className="mask absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
					<VideoBackground />
				</div>
			</div>

			<div className={'relative'}>
				<ServicesGrid content_website={content_website} services={services} />
				<Realisations content_website={content_website} isHome={true} realisations={realisations} slice={3} />
				<Articles articles={articles} content_website={content_website} isHome={true} slice={3} />
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
