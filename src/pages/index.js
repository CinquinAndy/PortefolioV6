import Head from 'next/head'
import Hero from '@/components/Global/Hero'
import Nav from '@/components/Global/Nav'
import Footer from '@/components/Global/Footer'
import React from 'react'
import CTA from '@/components/Global/CTA'

export default function Home({ talents }) {
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

			<Nav />
			<main className={'relative'}>
				<Hero
					title={
						<>
							Trouver la maquilleuse qui vous correspond n&apos;a jamais été
							aussi simple
						</>
					}
				/>
				<CTA />
			</main>
			<Footer />
		</>
	)
}

export async function getServerSideProps() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/talents`, {
		method: 'GET',
		headers: {
			// 	token
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})

	if (!res) {
		return {
			notFound: true,
		}
	}

	const data = await res.json()

	return {
		props: {
			talents: data.data,
		},
	}
}
