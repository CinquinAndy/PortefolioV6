import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { Layout } from '@/components/Global/Layout'
import { Signature } from '@/components/Global/Signature'
import { AnimatedUnderline } from '@/components/ui/animated-underline'
import type { ContentWebsite, Sitemap } from '@/types/strapi'

interface FooterProps {
	content_website?: ContentWebsite
}

function Footer({ content_website }: FooterProps): React.JSX.Element {
	// Sitemap data from Strapi
	const sitemapData = content_website?.attributes?.Sitemap

	// Filter sitemap items by category
	const sitemap = sitemapData?.filter((item: Sitemap) => item?.categorie === 'sitemap') ?? []

	// Filter legal items by category
	const legals = sitemapData?.filter((item: Sitemap) => item?.categorie === 'legals') ?? []

	// Socials
	const socials = content_website?.attributes?.socials

	return (
		<>
			<footer className="mt-[100px] grid grid-cols-8 gap-12 px-6 pt-6 xl:mt-[150px] md:gap-4 md:px-20 md:pt-20">
				<div className="col-span-8 col-start-1 flex flex-col gap-4 text-xs xl:col-span-4 xl:col-start-2 md:col-span-4">
					<Image
						alt={content_website?.attributes?.content_footer?.image?.data?.attributes?.alternativeText ?? 'logo'}
						className="h-6 w-6"
						height={24}
						src={content_website?.attributes?.content_footer?.image?.data?.attributes?.url ?? ''}
						width={24}
					/>
					<div className="">
						<Layout
							className={'prose-xs flex flex-col gap-4'}
							value={content_website?.attributes?.content_footer?.content ?? ''}
						/>
					</div>
				</div>

				<div className="col-span-4 flex flex-col gap-4 xl:col-span-1 md:col-span-2 md:col-start-5 lg:gap-10">
					<h2 className="font-display text-sm font-bold! xl:text-xl">
						{content_website?.attributes?.content_footer?.title_sitemap}
					</h2>
					{sitemap?.map((item: Sitemap, index: number) => {
						return (
							<Link href={item?.Link?.url ?? '/'} key={`sitemap-${item?.id ?? index}`}>
								<AnimatedUnderline className="text-xs xl:text-sm">{item?.Link?.label}</AnimatedUnderline>
							</Link>
						)
					})}
				</div>
				<div className="col-span-4 flex flex-col gap-4 xl:col-span-1 md:col-span-2 md:col-start-7 lg:gap-10">
					<h2 className="font-display text-sm font-bold! xl:text-xl">
						{content_website?.attributes?.content_footer?.title_legals}
					</h2>
					{legals?.map((item: Sitemap, index: number) => {
						return (
							<Link href={item?.Link?.url ?? '/'} key={`legals-${item?.id ?? index}`}>
								<AnimatedUnderline className="text-xs xl:text-sm">{item?.Link?.label}</AnimatedUnderline>
							</Link>
						)
					})}
					<Link href="/sitemap.xml">
						<AnimatedUnderline className="text-xs xl:text-sm">Sitemap</AnimatedUnderline>
					</Link>
					<Link href="/robots.txt">
						<AnimatedUnderline className="text-xs xl:text-sm">Robots.txt</AnimatedUnderline>
					</Link>
				</div>
				<div className="col-span-8 col-start-1 mt-10 flex justify-between text-xs xl:col-span-6 xl:col-start-2">
					<div className="flex w-full justify-center gap-4">
						<div className="flex items-center justify-evenly gap-8 xl:gap-10">
							<div className={'relative p-3'}>
								<Link
									className="slider-nav-item relative flex h-7 w-7 items-center justify-center text-indigo-50 hover:text-slate-50 lg:h-9 lg:w-9"
									href={socials?.facebook ?? '/'}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg className="h-5 w-5 lg:h-7 lg:w-7" fill="currentColor" viewBox="0 0 24 24" aria-label="Facebook">
										<path d="m15.997 3.985h2.191v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.323 1.987-5.323 5.639v3.361h-3.486v4.266h3.486v10.734h4.274v-10.733h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077z" />
									</svg>
								</Link>
							</div>
							<div className={'relative p-3'}>
								<Link
									className="slider-nav-item relative flex h-7 w-7 items-center justify-center text-indigo-50 hover:text-slate-50 lg:h-9 lg:w-9"
									href={socials?.instagram ?? '/'}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg className="h-5 w-5 lg:h-7 lg:w-7" fill="currentColor" viewBox="0 0 24 24" aria-label="Instagram">
										<path d="m12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c.001 2.208-1.788 3.997-3.997 3.997z" />
										<path d="m16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941-2.308 2.308-2.013 5.418-2.013 9.979 0 4.668-.26 7.706 2.013 9.979 2.317 2.316 5.472 2.013 9.979 2.013 4.624 0 6.22.003 7.855-.63 2.223-.863 3.901-2.85 4.065-6.419.104-2.209.098-7.677 0-9.887-.198-4.213-2.459-6.768-6.976-6.976zm3.495 20.372c-1.513 1.513-3.612 1.378-8.468 1.378-5 0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453 0-5.525-.567-9.504 4.978-9.788 1.274-.045 1.649-.06 4.856-.06l.045.03c5.329 0 9.51-.558 9.761 4.986.057 1.265.07 1.645.07 4.847-.001 4.942.093 6.959-1.394 8.453z" />
										<circle cx="18.406" cy="5.595" r="1.439" />
									</svg>
								</Link>
							</div>
							<div className={'relative p-3'}>
								<Link
									className="slider-nav-item relative flex h-7 w-7 items-center justify-center text-indigo-50 hover:text-slate-50 lg:h-9 lg:w-9"
									href={socials?.linkedin ?? '/'}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg className="h-5 w-5 lg:h-7 lg:w-7" fill="currentColor" viewBox="0 0 24 24" aria-label="Linkedin">
										<path d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z" />
										<path d="m.396 7.977h4.976v16.023h-4.976z" />
										<path d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z" />
									</svg>
								</Link>
							</div>
							<div className={'relative p-3'}>
								<Link
									className="slider-nav-item relative flex h-7 w-7 items-center justify-center text-indigo-50 hover:text-slate-50 lg:h-9 lg:w-9"
									href={socials?.github ?? '/'}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg className="h-5 w-5 lg:h-7 lg:w-7" fill="currentColor" viewBox="0 0 24 24" aria-label="Github">
										<path d="m12.29 21.499c3.73 0 8.94.09 10.835-3.701.715-1.449.875-3.122.875-4.7h-.001c0-2.073-.575-4.047-1.95-5.651.255-.766.385-1.573.385-2.385 0-1.064-.24-1.598-.73-2.563-2.24 0-3.69.42-5.39 1.742-1.31-.311-2.67-.455-4.02-.455-1.495 0-2.986.154-4.435.495-1.725-1.336-3.175-1.781-5.44-1.781-.484.965-.729 1.499-.729 2.563 0 .811.125 1.632.385 2.414-1.38 1.589-2.075 3.548-2.075 5.621 0 1.578.281 3.266 1.01 4.701 1.97 3.835 7.49 3.7 11.28 3.7zm-5.289-9.99c.95 0 1.865.168 2.8.297 3.418.52 5.215-.297 7.31-.297 2.339 0 3.675 1.915 3.675 4.087 0 4.349-4.015 5.012-7.53 5.012h-2.41c-3.5 0-7.52-.667-7.52-5.012 0-2.172 1.334-4.087 3.675-4.087z" />
										<path d="m16.655 18.323c1.29 0 1.835-1.692 1.835-2.727s-.545-2.727-1.835-2.727-1.835 1.692-1.835 2.727.545 2.727 1.835 2.727z" />
										<path d="m7.47 18.323c1.29 0 1.835-1.692 1.835-2.727s-.546-2.726-1.835-2.726-1.835 1.692-1.835 2.727.545 2.726 1.835 2.726z" />
									</svg>
								</Link>
							</div>
							<div className={'relative p-3'}>
								<Link
									className="slider-nav-item relative flex h-7 w-7 items-center justify-center text-indigo-50 hover:text-slate-50 lg:h-9 lg:w-9"
									href={socials?.malt ?? '/'}
									rel="noopener nofollow noreferrer"
									target="_blank"
								>
									<svg className="h-5 w-5 lg:h-7 lg:w-7" fill="currentColor" viewBox="0 0 1000 1000" aria-label="Malt">
										<path
											d="M855.8,144.4c-75.3-75.3-156.2-26.7-206.4,23.9L172.5,644.8c-50.6,50.6-103.2,127.1-23.9,206.4
		c79.3,79.3,156.2,26.7,206.4-23.9l476.5-476.5C882.5,300.2,931.1,219.7,855.8,144.4z"
										/>
										<path
											d="M400.4,124.9l100.8,100.8L604,122.9c7.2-7.2,13.9-13.5,21.1-19.5C614.3,49.2,583.3,0.2,501.2,0.2
		c-82.5,0-113.1,49.4-123.9,103.6C384.9,110.2,392.4,116.9,400.4,124.9z"
										/>
										<path
											d="M604,874.3L501.2,771.5L400.4,872.7c-7.6,7.6-15.1,14.7-22.7,21.1c11.6,55.4,44.2,106,123.5,106
		c79.7,0,112.4-51,123.9-106.4C617.9,887.5,610.8,881.5,604,874.3z"
										/>
										<path d="M357.4,369.5H162.9C91.6,369.5,0,391.8,0,498.6C0,578.3,51,611,106.4,622.5C113.1,614.9,357.4,369.5,357.4,369.5z" />
										<path d="M896.4,374.7c-6,7.2-251,253.4-251,253.4h191.6c71.3,0,162.9-16.7,162.9-129.1C1000,416.1,950.6,385.5,896.4,374.7z" />
										<path
											d="M421.1,305.4l34.7-34.7L355,169.9C304.4,119.3,227.9,66.7,148.6,146c-58.2,58.2-45.4,114.7-14.3,161
		C143.8,306.2,421.1,305.4,421.1,305.4z"
										/>
										<path
											d="M581.3,691.8l-34.7,34.7l102.8,102.8c50.6,50.6,131.1,99.2,206.4,23.9c56.2-56.2,43.4-115.5,12.4-162.9
		C857.8,691,581.3,691.8,581.3,691.8z"
										/>
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<Signature content_website={content_website} />
		</>
	)
}

export default Footer
