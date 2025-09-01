import { getRealisationBySlug, getRealisations, processRealisationData } from '@/services/getContentWebsite'
import { LowGradientBackground } from '@/components/Global/Animations/LowGradientBackground'
import { BackButtonComponent } from '@/components/Global/BackButton.component'
import { ImageLoadComponent } from '@/components/Global/ImageLoad.component'
import { localesConstant } from '@/services/localesConstant'

export async function generateMetadata({ params }) {
	const { slug, locale } = await params

	// fetch data
	let realisation = await getRealisationBySlug(slug, locale)

	let processedRealisation = await processRealisationData(realisation)
	processedRealisation = processedRealisation?.data

	return {
		title: processedRealisation?.attributes?.seo_title || 'Andy Cinquin - Freelance Entrepreneur & Developer',
		metadataBase: new URL(`https://andy-cinquin.com`),
		description:
			processedRealisation?.attributes?.seo_description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		alternates: {
			languages: {
				'fr-FR': `${locale === 'fr' ? process.env.NEXT_PUBLIC_URL_ALT : process.env.NEXT_PUBLIC_URL}/blog/${processedRealisation?.attributes?.slug}`,
				'en-US': `${locale === 'fr' ? process.env.NEXT_PUBLIC_URL_ALT : process.env.NEXT_PUBLIC_URL}/blog/${processedRealisation?.attributes?.slug}`,
			},
			canonical: processedRealisation?.attributes?.seo_canonical || '/',
		},
	}
}

export async function generateStaticParams() {
	let paths = []

	for (const locale of localesConstant) {
		// Assuming these are your locales
		const realisations = await getRealisations(locale) // Fetch realisations for each locale

		for (const realisation of realisations.data) {
			const images = realisation.attributes.galery.data // Assuming this is where images are stored

			if (images) {
				for (const [index, image] of images.entries()) {
					paths.push({
						params: {
							slug: realisation.attributes.slug,
							locale,
							image: String(index),
						}, // Use index as a placeholder for image
					})
				}
			}
		}
	}

	return paths
}

export default async function Page({ params }) {
	const { slug, locale, image } = await params
	let realisation = await getRealisationBySlug(slug, locale)

	let processedRealisation = await processRealisationData(realisation)
	processedRealisation = processedRealisation?.data
	const galery = processedRealisation?.attributes?.galery?.data
	const _image = galery[image]

	return (
		<>
			<LowGradientBackground />

			<div className={'fixed left-0 top-0 z-50 flex h-full min-h-screen w-screen items-center justify-center'}>
				<div className={'relative flex h-full w-full items-center justify-center'}>
					<div className={'absolute left-0 top-0 m-8'}>
						<BackButtonComponent />
					</div>
					<ImageLoadComponent
						alt={_image?.attributes?.alternativeText ?? 'Project Image'}
						className={'rounded-xl p-2 sm:p-4 md:p-8 lg:p-32'}
						height={_image?.attributes?.height}
						src={_image?.attributes?.url}
						width={_image?.attributes?.width}
					/>
				</div>
			</div>
		</>
	)
}
