// import React from 'react'
// import Head from 'next/head'
// import Link from 'next/link'
// import Image from 'next/image'
//
// function Custom404(props) {
// 	return (
// 		<>
// 			<Head>
// 				<title>My-Makeup</title>
// 				<meta
// 					name="description"
// 					content="Vérification de profil, sur My-Makeup, la plateforme pour les maquilleuses !"
// 				/>
// 				{/*	seo tag canonical link */}
// 				<link rel="canonical" href="https://andy-cinquin.fr/404" />
// 			</Head>
// 			<div className="relative flex h-[95vh] max-h-screen overflow-hidden md:h-screen md:overflow-auto md:bg-white">
// 				<div className="flex flex-1 flex-col justify-center bg-white px-4 sm:px-6 md:py-12 md:pt-12 lg:flex-none lg:px-20 xl:px-24">
// 					<div className="mx-auto w-full max-w-sm lg:w-96">
// 						<Link href={'/'}>
// 							<span className="sr-only">My-Makeup</span>
// 							<Image
// 								alt="Logo My-Makeup"
// 								width={50}
// 								height={50}
// 								src="/assets/logo.webp"
// 							/>
// 						</Link>
// 						<div className={'mt-8'}>
// 							<h1 className={'my-8 text-2xl font-semibold text-slate-900'}>
// 								404 - Page non trouvée
// 							</h1>
// 							<p
// 								className={'text-gray-700'}
// 							>{`Oops ! La page que vous cherchez n'existe pas.`}</p>
//
// 							<Link href={'/'} className="btn-primary-large mt-8">
// 								{`Retourner à l'accueil`}
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="relative hidden w-full flex-1 lg:block lg:object-contain">
// 					<div
// 						className={
// 							'absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-r from-white via-transparent to-transparent'
// 						}
// 					></div>
// 					<Image
// 						alt={'background my-makeup 404'}
// 						fill
// 						src="/assets/vectorials-used/cat404.svg"
// 						className={'z-10 transform object-cover'}
// 					></Image>
// 				</div>
// 			</div>
// 		</>
// 	)
// }
//
// export default Custom404
