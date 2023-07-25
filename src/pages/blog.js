// import React from 'react'
// import Footer from '@/components/Global/Footer'
// import Nav from '@/components/Global/Nav'
// import Head from 'next/head'
// import Image from 'next/image'
// import Hero from '@/components/Global/Hero'
// import CTA from '@/components/Global/CTA'
// import Link from 'next/link'
// import { convertToStringDate } from '@/services/utils'
//
// /**
//  * @param props
//  * @constructor
//  */
// function Blog({ articles }) {
// 	// take only the first 3 articles
// 	const lastArticles = articles.slice(0, 3)
//
// 	return (
// 		<>
// 			<Head>
// 				<title>Blog de My-Makeup</title>
// 				<meta
// 					name="description"
// 					content="L'actualité de My-Makeup, ce que nous faisons pour améliorer votre quotidien !
// 					Et les nouveautés qui arrivent bientôt !"
// 				/>
// 				{/*	seo tag canonical link */}
// 				<link rel="canonical" href={'https://andy-cinquin.fr/blog'} />
// 			</Head>
//
// 			<Nav />
// 			<main className={'relative'}>
// 				<Hero
// 					imgBackgroundSrc={'/assets/back/maquilleuse_metisse_white.webp'}
// 					title={<>Blog & News</>}
// 					description={
// 						<>
// 							Les actualités de My-Makeup, ce que nous faisons pour améliorer
// 							votre quotidien ! Et les nouveautés qui arrivent bientôt !
// 						</>
// 					}
// 					isSearchDisplayed={false}
// 					isCTALoginDisplayed={false}
// 					isSimpleVersionDisplayed={true}
// 				/>
// 				<section className={'relative px-4 py-20 md:px-8 2xl:px-0'}>
// 					<div className="mx-auto max-w-7xl">
// 						<div className="mx-auto md:mb-10">
// 							<h2 className="w-full text-start text-4xl font-bold tracking-tight text-slate-900 sm:text-4xl md:w-1/2">
// 								Nos derniers articles & actualités !
// 							</h2>
// 							<p className="mt-6 w-full text-start text-lg text-slate-700 md:w-1/2">
// 								{
// 									"My-Makeup, plus qu'une plateforme de mise en relation, une équipe de passionnés à votre service !"
// 								}
// 							</p>
// 						</div>
//
// 						<section
// 							className={
// 								'mx-auto mb-16 mt-16 flex max-w-7xl flex-col-reverse gap-16 md:mb-32 md:flex-row md:gap-32'
// 							}
// 						>
// 							<div className={'w-full md:w-1/2'}>
// 								<div className={'flex flex-col gap-16'}>
// 									{articles ? (
// 										lastArticles.map(article => (
// 											<div className={'flex flex-col gap-2'} key={article.id}>
// 												<div
// 													className={'relative pl-2 text-base text-slate-400'}
// 												>
// 													{convertToStringDate(article.attributes.updatedAt)}
// 													<div
// 														className={
// 															'absolute left-0 top-0 h-full w-0.5 bg-slate-300'
// 														}
// 													></div>
// 												</div>
// 												<h2 className={'text-lg font-semibold text-slate-900'}>
// 													{article.attributes.title}
// 												</h2>
// 												<p className={'text-sm text-slate-700'}>
// 													{article.attributes.excerpt}
// 												</p>
// 												<Link
// 													className={
// 														'flex items-center font-medium text-indigo-900'
// 													}
// 													href={`/blog/${article.attributes.slug}`}
// 												>
// 													{"Lire l'article"}
// 													<span className="material-icons-round text-base text-indigo-900">
// 														chevron_right
// 													</span>
// 												</Link>
// 											</div>
// 										))
// 									) : (
// 										<p>{"Il n'y a pas d'articles"}</p>
// 									)}
// 								</div>
// 							</div>
// 							<div
// 								className={
// 									'flex w-full flex-col items-center justify-center md:w-1/2'
// 								}
// 							>
// 								<Image
// 									className={
// 										'h-[300px] w-full rounded-2xl object-cover object-top md:h-[500px]'
// 									}
// 									src={'/assets/maquilleuse_blog.webp'}
// 									alt={'illustration'}
// 									width={'500'}
// 									height={'350'}
// 								/>
// 								<div className={'mt-8 flex w-full justify-end'}>
// 									<Link
// 										href={'/toutes-les-news'}
// 										className={'btn-primary flex items-center font-medium'}
// 									>
// 										Voir toutes les news & articles
// 										<span className="material-icons-round text-base">
// 											chevron_right
// 										</span>
// 									</Link>
// 								</div>
// 							</div>
// 						</section>
// 					</div>
// 				</section>
// 				<CTA />
// 			</main>
// 			<Footer />
// 		</>
// 	)
// }
//
// export default Blog
//
// export async function getServerSideProps() {
// 	const res = await fetch(
// 		`${process.env.NEXT_PUBLIC_API_URL}/api/articles?sort[publishedAt]=desc`,
// 		{
// 			method: 'GET',
// 			headers: {
// 				// 	token
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json',
// 			},
// 		}
// 	)
// 	const data = await res.json()
//
// 	return {
// 		props: {
// 			articles: data.data,
// 		},
// 	}
// }
