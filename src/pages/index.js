import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React from 'react'
import Services from '@/components/Global/Services'
import Cta from '@/components/Global/Cta'
import Realisations from '@/components/Global/Realisations'

export default function Home({ content_website, services, realisations }) {
	return (
		<>
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
			<div>
				<Services content_website={content_website} services={services} />
				<Realisations
					content_website={content_website}
					realisations={realisations}
					slice={3}
					isHome={true}
				/>
				<Cta />
			</div>
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
	const res_realisations = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/realisations?populate=deep`,
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

	if (!res_content_website || !res_services || !res_realisations) {
		return {
			notFound: true,
		}
	}

	const data_content_website = await res_content_website.json()
	const data_services = await res_services.json()
	const data_realisations = await res_realisations.json()

	return {
		props: {
			content_website: data_content_website.data,
			services: data_services.data,
			realisations: data_realisations.data,
		},
	}
}
