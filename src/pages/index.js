import Head from 'next/head'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React from 'react'

export default function Home({ content }) {
	console.log(content)
	return (
		<>
			<Head>
				<title>ANDY CINQUIN - Andy Cinquin - Développeur Freelance</title>
				<meta
					name="description"
					content="Portefolio professionnel de Andy Cinquin, développeur informatique Freelance, Nantes et alentours. Développement sur-mesure, web, applicatifs"
				/>
				{/*	seo tag canonical link */}
				<link rel="canonical" href="https://andy-cinquin.fr" />
			</Head>

			<Nav content={content} />
			<main>here</main>
			<Footer />
		</>
	)
}

export async function getServerSideProps() {
	const res = await fetch(
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

	if (!res) {
		return {
			notFound: true,
		}
	}

	const data = await res.json()

	return {
		props: {
			content: data.data,
		},
	}
}
