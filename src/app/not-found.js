import Link from 'next/link'
import Image from 'next/image'
import { Layout } from '@/components/Global/Layout'
import { LottieAnimation } from '@/components/Global/Animations/LottieAnimation'
import { getContentWebsite, getNotFound } from '@/services/getContentWebsite'
import { Be_Vietnam_Pro, Noto_Serif_Display } from 'next/font/google'

const noto_serif_display = Noto_Serif_Display({
	subsets: ['latin'],
	variable: '--font-noto-serif-display',
})
const be_vietnam_pro = Be_Vietnam_Pro({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-be-vietnam-pro',
	style: ['italic', 'normal'],
	subsets: ['latin'],
})

export async function generateMetadata() {
	// fetch data
	let content_website = await getContentWebsite('en')
	content_website = content_website?.data

	return {
		title:
			content_website?.attributes?.content_notfound?.seo?.title ||
			'Andy Cinquin - Freelance Entrepreneur & Developer',
		description:
			content_website?.attributes?.content_notfound?.seo?.description ||
			'Professional portfolio of Andy Cinquin, freelance software developer, Nantes and surrounding areas. Custom development, web, applications',
		metadataBase: new URL(`https://andy-cinquin.fr`),
		alternates: {
			canonical:
				content_website?.attributes?.content_notfound?.seo?.canonical || '/',
			languages: {
				'en-US': `${process.env.NEXT_PUBLIC_URL_ALT}/404`,
				'fr-FR': `${process.env.NEXT_PUBLIC_URL}/404`,
			},
		},
	}
}

export default async function NotFound() {
	let content_website = await getContentWebsite('en')
	content_website = content_website?.data
	let notfound = await getNotFound('en')
	notfound = notfound?.data

	return (
		<html lang={`en`} className={'overflow-y-hidden'}>
			<body
				className={`relative text-slate-50 ${noto_serif_display.variable} ${be_vietnam_pro.variable}`}
			>
				{/*<LowGradientBackground />*/}
				<LottieAnimation />

				{/*<Cursor />*/}

				<div className="h-dvh">
					<div className="flex h-full items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
						<div className="">
							<Link href={'/'}>
								<Image
									alt="Logo Andy Cinquin"
									width={50}
									height={50}
									src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/logov2.svg`}
								/>
							</Link>
							<div className={'mt-8'}>
								<h1 className={'my-8 text-2xl font-semibold text-slate-50'}>
									{content_website?.attributes?.content_notfound?.seo?.h1 ??
										'404 Not Found'}
								</h1>
								<div className="mx-auto max-w-3xl">
									<article>
										<div className={'prose prose-invert my-8'}>
											<Layout
												value={notfound?.attributes?.content.toString()}
											/>
										</div>
									</article>
								</div>

								<Link
									href={notfound?.attributes?.link?.url}
									className="mt-8 text-slate-50 underline"
								>
									{notfound?.attributes?.link?.label}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}
