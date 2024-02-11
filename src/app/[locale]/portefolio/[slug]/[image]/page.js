import {
	getRealisationBySlug,
	processRealisationData,
} from '@/services/getContentWebsite'
import { BackButton } from '@/app/[locale]/portefolio/[slug]/[image]/backButton'
import { ImageLoad } from '@/app/[locale]/portefolio/[slug]/[image]/imageLoad'

export async function generateMetadata({ params }) {
	// fetch data
	let realisation = await getRealisationBySlug(params.slug, params.locale)

	let processedRealisation = await processRealisationData(realisation)
	processedRealisation = processedRealisation?.data

	return {
		title:
			processedRealisation?.attributes?.seo_title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			processedRealisation?.attributes?.seo_description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.com`),
		alternates: {
			canonical: processedRealisation?.attributes?.seo_canonical || '/',
			languages: {
				'en-US': `${params.locale === 'fr' ? process.env.NEXT_PUBLIC_URL_ALT : process.env.NEXT_PUBLIC_URL}/blog/${processedRealisation?.attributes?.slug}`,
				'fr-FR': `${params.locale === 'fr' ? process.env.NEXT_PUBLIC_URL_ALT : process.env.NEXT_PUBLIC_URL}/blog/${processedRealisation?.attributes?.slug}`,
			},
		},
	}
}

export default async function Page({ params }) {
	let realisation = await getRealisationBySlug(params.slug, params.locale)

	let processedRealisation = await processRealisationData(realisation)
	processedRealisation = processedRealisation?.data
	const galery = processedRealisation?.attributes?.galery?.data
	const image = galery[params.image]

	return (
		<div
			className={
				'fixed left-0 top-0 z-50 flex h-full min-h-screen w-screen items-center justify-center'
			}
		>
			<div
				className={'relative flex h-full w-full items-center justify-center'}
			>
				<div className={'absolute left-0 top-0 m-8'}>
					<BackButton />
				</div>
				<ImageLoad
					className={'rounded-lg p-2 sm:p-4 md:p-8 lg:p-32'}
					src={image?.attributes?.url}
					alt={image?.attributes?.alternativeText ?? 'Project Image'}
					width={image?.attributes?.width}
					height={image?.attributes?.height}
				/>
			</div>
		</div>
	)
}
