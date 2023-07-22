// import React from 'react'
// import Nav from '@/components/Global/Nav'
// import Footer from '@/components/Global/Footer'
// import Head from 'next/head'
// import CTA from '@/components/Global/CTA'
// import Hero from '@/components/Global/Hero'
//
// function PolitiqueDeConfidentialite() {
// 	return (
// 		<>
// 			<Head>
// 				imgBackgroundSrc={'/assets/back/maquilleuse_europeenne_white.webp'}
// 				<title>La politique de confidentialité de My-Makeup !</title>
// 				<meta
// 					name="description"
// 					content="Les conditions générales d'utilisation de My-Makeup, votre plateforme de mise en relation entre maquilleuses professionnelles et clients."
// 				/>
// 				{/*	seo tag canonical link */}
// 				<link rel="canonical" href="https://andy-cinquin.fr/cgu" />
// 			</Head>
//
// 			<Nav />
// 			<main className={'relative'}>
// 				<Hero
// 					title={
// 						<>
// 							Politique de confidentialité de&nbsp;
// 							<span className={'text-indigo-900'}>My&nbsp;Makeup</span>
// 						</>
// 					}
// 					description={<>{"Tout l'aspect légal de la plateforme."}</>}
// 					isSearchDisplayed={false}
// 					isCTALoginDisplayed={false}
// 					isSimpleVersionDisplayed={true}
// 				/>
// 				<div
// 					className={'relative mx-auto my-24 max-w-7xl px-4 md:my-48 md:px-0'}
// 				>
// 					<div className="mx-auto max-w-2xl">
// 						<article>
// 							<header className="flex flex-col">
// 								<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
// 									Politique de confidentialité
// 								</h2>
// 							</header>
// 							<div className="prose my-8 xl:prose-lg">
// 								<p>
// 									Nous sommes engagés à protéger vos données personnelles
// 									conformément aux lois RGPD de l{"'"}Union Européenne sur la
// 									protection des données personnelles et aux lois françaises
// 									informatique et libertés. Cette politique de confidentialité
// 									décrit comment nous collectons, utilisons et protégeons les
// 									informations que vous nous fournissez.
// 								</p>
// 								<h2>Collecte d{"'"}informations</h2>
// 								<p>
// 									Nous collectons des informations vous concernant lorsque vous
// 									vous inscrivez sur notre site web ou lorsque vous utilisez nos
// 									services. Les informations que nous collectons peuvent inclure
// 									votre nom, votre adresse e-mail, votre numéro de téléphone et
// 									votre adresse postale. En outre, nous collectons également des
// 									informations sur les maquilleuses professionnelles qui s{"'"}
// 									inscrivent sur notre site web. Cela peut inclure leur nom,
// 									leur adresse e-mail, leur numéro de téléphone, leur adresse
// 									postale, leur statut professionnel (auto-entrepreneur,
// 									micro-entreprise, etc.), leurs qualifications, leurs
// 									expériences et les photos de leurs travaux antérieurs.
// 								</p>
// 								<h2>Utilisation d{"'"}informations</h2>
// 								<p>
// 									Nous utilisons les informations que nous collectons pour
// 									fournir et améliorer nos services. Nous pouvons également
// 									utiliser ces informations pour vous contacter concernant des
// 									offres promotionnelles ou d{"'"}autres informations
// 									susceptibles de vous intéresser. Si vous ne souhaitez pas
// 									recevoir ces communications, vous pouvez vous désabonner en
// 									suivant les instructions fournies dans les e-mails que nous
// 									envoyons. Nous utilisons également les informations que nous
// 									collectons sur les maquilleuses professionnelles pour vérifier
// 									leur statut et leur expérience professionnelle afin de nous
// 									assurer que nous ne proposons que des professionnels qualifiés
// 									et compétents sur notre site web.
// 								</p>
// 								<h2>Protection des informations</h2>
// 								<p>
// 									Nous prenons des mesures de sécurité appropriées pour protéger
// 									vos informations personnelles contre les accès non autorisés
// 									ou la modification. Nous ne vendons pas ou ne louons pas vos
// 									informations personnelles ou celles des maquilleuses
// 									professionnelles à des tiers.
// 								</p>
// 								<h2>Cookies</h2>
// 								<p>
// 									Nous utilisons des cookies pour collecter des informations sur
// 									la façon dont vous utilisez notre site web. Les cookies sont
// 									des fichiers texte stockés sur votre ordinateur qui nous
// 									aident à améliorer l{"'"}expérience utilisateur. Vous pouvez
// 									désactiver l{"'"}utilisation des cookies dans les paramètres
// 									de votre navigateur.
// 								</p>
// 								<h2>Accès aux informations</h2>
// 								<p>
// 									Vous pouvez accéder et mettre à jour les informations que nous
// 									avons sur vous en vous connectant à votre compte sur notre
// 									site web. De même, les maquilleuses professionnelles peuvent
// 									accéder et mettre à jour les informations les concernant en se
// 									connectant à leur compte sur notre site web.
// 								</p>
// 								<h2>Modifications de la politique de confidentialité</h2>
// 								<p>
// 									Nous pouvons modifier cette politique de confidentialité de
// 									temps à autre. Si nous apportons des modifications
// 									importantes, nous vous informerons par e-mail ou en publiant
// 									un avis sur notre site web.
// 								</p>
// 								<h2>Droit à l{"'"}oubli et suppression de données</h2>
// 								<p>
// 									Conformément aux lois RGPD de l{"'"}Union Européenne sur la
// 									protection des données personnelles et aux lois françaises
// 									informatiques et libertés, vous avez le droit de demander la
// 									suppression de vos données personnelles stockées sur notre
// 									site web. Les maquilleuses professionnelles peuvent également
// 									demander la suppression de leurs informations personnelles
// 									stockées sur notre site web si elles ne souhaitent plus être
// 									référencées sur notre plateforme.
// 								</p>
// 								<h2>Date d{"'"}entrée en vigueur</h2>
// 								<p>
// 									Cette politique de confidentialité est entrée en vigueur le
// 									08/04/2023 et remplace toutes les politiques de
// 									confidentialité antérieures.
// 								</p>
// 								<h2>Contactez-nous</h2>
// 								<p>
// 									Si vous avez des questions ou des préoccupations concernant
// 									notre politique de confidentialité ou la manière dont nous
// 									collectons et utilisons vos informations, veuillez nous
// 									contacter à l{"'"}adresse suivante : contact@andy-cinquin.fr
// 									Nous vous remercions de votre confiance et nous nous engageons
// 									à protéger la confidentialité de vos informations personnelles
// 									conformément aux lois RGPD de l{"'"}
// 									Union Européenne sur la protection des données personnelles et
// 									aux lois françaises informatiques et libertés.
// 								</p>
// 							</div>
// 							<h3 className={'flex items-center text-base text-gray-400'}>
// 								<span className="h-4 w-0.5 rounded-full bg-gray-200" />
// 								<span className="ml-3">{"L'équipe My-Makeup"}</span>
// 							</h3>
// 						</article>
// 					</div>
// 				</div>
// 				<CTA />
// 			</main>
//
// 			<Footer />
// 		</>
// 	)
// }
//
// export default PolitiqueDeConfidentialite
