import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React from 'react'

export default function Home({ content_website, services }) {
	return (
		<>
			{/*<Head>*/}
			{/*	<title>{ANDY CINQUIN - Andy Cinquin - Développeur Freelance}</title>*/}
			{/*	<meta*/}
			{/*		name="description"*/}
			{/*		content="Portefolio professionnel de Andy Cinquin, développeur informatique Freelance, Nantes et alentours. Développement sur-mesure, web, applicatifs"*/}
			{/*	/>*/}
			{/*	/!*	seo tag canonical link *!/*/}
			{/*	<link rel="canonical" href="https://andy-cinquin.fr" />*/}
			{/*</Head>*/}
			<Head>
				<title>{content_website?.attributes?.content_home?.seo_title}</title>
				<meta
					name="description"
					content={content_website?.attributes?.content_home?.seo_description}
				/>
				{/*	seo tag canonical link */}
				<link
					rel="canonical"
					href={content_website?.attributes?.content_home?.seo_canonical}
				/>
			</Head>

			<Nav content_website={content_website} />
			<main>
				<Services content_website={content_website} services={services} />
			</main>
			<Footer />
		</>
	)
}

export async function getServerSideProps() {
	const res_content_website = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/content-website?populate=deep`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// 	bearer token
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	)
	const res_services = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/services?populate=deep`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// 	bearer token
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	)

	if (!res_content_website || !res_services) {
		return {
			notFound: true,
		}
	}

	const data_content_website = await res_content_website.json()
	const data_services = await res_services.json()

	return {
		props: {
			content_website: data_content_website.data,
			services: data_services.data,
		},
	}
}
