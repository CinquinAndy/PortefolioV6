import {
	getArticles,
	getContentWebsite,
	getRealisations,
	getServices,
} from '@/services/getContentWebsite'
import Nav from '@/components/Global/Nav'
import Image from 'next/image'
import Services from '@/components/Global/Services'
import Realisations from '@/components/Global/Realisations'
import Articles from '@/components/Global/Articles'
import Cta from '@/components/Global/Cta'
import Footer from '@/components/Global/Footer'

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
				'fr-FR': '/',
				'en-US': 'https://andy-cinquin.com',
			},
		},
	}
}

export default async function Page({ params: { locale } }) {
	console.log('locale in page', locale)
	let content_website = await getContentWebsite(locale)
	content_website = content_website?.data
	let services = await getServices(locale)
	services = services?.data
	let realisations = await getRealisations(locale)
	realisations = realisations?.data
	let articles = await getArticles(locale)
	articles = articles?.data

	return (
		<>
			<Nav content_website={content_website} />

			<div className={'mask absolute left-0 top-0 -z-10 h-screen w-screen'}>
				<div className="mask absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
					<div className="video-background mask relative clear-both m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0">
						<Image
							src={'/assets/images/bg_opti.webp'}
							alt={'bg_opti'}
							className={
								'absolute left-0 top-0 blur-md  ' +
								'mix-difference mask -z-10 block bg-slate-900 object-cover opacity-75  '
							}
							quality={10}
							fill={true}
							loading="eager"
						/>

						<video
							width="1920"
							height="1080"
							muted
							autoPlay={true}
							playsInline={true}
							preload={'auto'}
							loop
							title="video"
							className={
								'mask absolute left-0 top-0 h-full w-full object-cover object-center ' +
								'mix-difference animate-video -z-10 block bg-slate-900 object-cover opacity-75'
							}
							id="topHeroVideo"
						>
							<source src="/assets/video_background.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			</div>

			<div className={'relative'}>
				<Services content_website={content_website} services={services} />
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
				></Articles>
				<Cta content_website={content_website} />
			</div>
			<Footer content_website={content_website} />
		</>
	)
}
