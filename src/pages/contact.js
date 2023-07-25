// import React from 'react'
// import Nav from '@/components/Global/Nav'
// import Footer from '@/components/Global/Footer'
// import Head from 'next/head'
// import Hero from '@/components/Global/Hero'
// import { z } from 'zod'
// import CTA from '@/components/Global/CTA'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import Link from 'next/link'
// import { toast } from 'react-toastify'
//
// const schema = z
// 	.object({
// 		first_name: z.string().nonempty({ message: 'Le prénom est requis' }),
// 		last_name: z.string().nonempty({ message: 'Le nom est requis' }),
// 		email: z.string().email({ message: "L'e-mail est invalide" }),
// 		phone_number: z
// 			.string()
// 			.nonempty({ message: 'Le numéro de téléphone est requis' }),
// 		message: z.string().nonempty({ message: 'Le message est requis' }),
// 	})
// 	.required()
//
// function Contact(props) {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 		reset, // pour réinitialiser le formulaire
// 	} = useForm({
// 		resolver: zodResolver(schema),
// 	})
//
// 	// Créez une nouvelle fonction pour gérer la soumission du formulaire
// 	const onSubmit = async data => {
// 		const response = await fetch('/api/sendMail', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				first_name: data.first_name,
// 				last_name: data.last_name,
// 				email: data.email,
// 				phone_number: data.phone_number,
// 				message: data.message,
// 			}),
// 		})
//
// 		if (response.ok) {
// 			reset()
// 			toast('Le message a bien été envoyé !', {
// 				toastId: 'toast-alert',
// 			})
// 		} else {
// 			toast("Une erreur s'est produite !", {
// 				toastId: 'toast-alert',
// 			})
// 		}
// 	}
//
// 	return (
// 		<>
// 			<Head>
// 				<title>Contact - My-Makeup</title>
// 				<meta
// 					name="description"
// 					content="Contactez-nous pour toute question, suggestion ou collaboration ! L'équipe My-Makeup est à votre écoute !"
// 				/>
// 				{/*	seo tag canonical link */}
// 				<link rel="canonical" href={'https://andy-cinquin.fr/contact'} />
// 			</Head>
// 			<Nav />
// 			<main className={'relative'}>
// 				<Hero
// 					imgBackgroundSrc={'/assets/back/maquilleuse_europeenne_white.webp'}
// 					title={<>Contact</>}
// 					description={
// 						<>
// 							{
// 								"Une idée, une envie de collaborer, une question ? N'hésitez pas à nous contacter !"
// 							}
// 						</>
// 					}
// 					isSearchDisplayed={false}
// 					isCTALoginDisplayed={false}
// 					isSimpleVersionDisplayed={true}
// 				/>
// 				<div className="mx-auto mt-32 max-w-2xl px-4 text-center md:px-0">
// 					<h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
// 						Un message en particulier ?
// 					</h2>
// 					<p className="mt-2 text-lg leading-8 text-slate-600">
// 						{
// 							"Une demande particulière, un bug, une idée ? N'hésitez pas à nous contacter via le formulaire ci-dessous !"
// 						}
// 					</p>
// 				</div>
// 				<form
// 					onSubmit={handleSubmit(onSubmit)}
// 					className="mx-auto my-32 max-w-xl px-4 sm:mt-20 md:px-0"
// 				>
// 					<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
// 						<div>
// 							<label
// 								htmlFor="first_name"
// 								className="block text-sm font-semibold leading-6 text-slate-900"
// 							>
// 								Prénom
// 							</label>
// 							<div className="mt-2.5">
// 								<input
// 									type="text"
// 									name="first_name"
// 									id="first_name"
// 									{...register('first_name', {
// 										required: true,
// 									})}
// 									autoComplete="given-name"
// 									className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
// 								/>
// 								{errors.first_name && (
// 									<p className={'mt-2 text-xs text-red-500/80'}>
// 										{errors.first_name.message}
// 									</p>
// 								)}
// 							</div>
// 						</div>
// 						<div>
// 							<label
// 								htmlFor="last_name"
// 								className="block text-sm font-semibold leading-6 text-slate-900"
// 							>
// 								Nom
// 							</label>
// 							<div className="mt-2.5">
// 								<input
// 									type="text"
// 									name="last_name"
// 									id="last_name"
// 									{...register('last_name', {
// 										required: true,
// 									})}
// 									autoComplete="family-name"
// 									className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
// 								/>
// 							</div>
// 							{errors.last_name && (
// 								<p className={'mt-2 text-xs text-red-500/80'}>
// 									{errors.last_name.message}
// 								</p>
// 							)}
// 						</div>
// 						<div className="sm:col-span-2">
// 							<label
// 								htmlFor="email"
// 								className="block text-sm font-semibold leading-6 text-slate-900"
// 							>
// 								Email
// 							</label>
// 							<div className="mt-2.5">
// 								<input
// 									type="email"
// 									name="email"
// 									id="email"
// 									{...register('email', {
// 										required: true,
// 									})}
// 									autoComplete="email"
// 									className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
// 								/>
// 							</div>
// 							{errors.email && (
// 								<p className={'mt-2 text-xs text-red-500/80'}>
// 									{errors.email.message}
// 								</p>
// 							)}
// 						</div>
// 						<div className="sm:col-span-2">
// 							<label
// 								htmlFor="phone_number"
// 								className="block text-sm font-semibold leading-6 text-slate-900"
// 							>
// 								Numéro de téléphone
// 							</label>
// 							<div className="relative mt-2.5">
// 								<input
// 									type="tel"
// 									name="phone_number"
// 									id="phone_number"
// 									{...register('phone_number', {
// 										required: true,
// 									})}
// 									autoComplete="tel"
// 									className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
// 								/>
// 							</div>
// 							{errors.phone_number && (
// 								<p className={'mt-2 text-xs text-red-500/80'}>
// 									{errors.phone_number.message}
// 								</p>
// 							)}
// 						</div>
// 						<div className="sm:col-span-2">
// 							<label
// 								htmlFor="message"
// 								className="block text-sm font-semibold leading-6 text-slate-900"
// 							>
// 								Message
// 							</label>
// 							<div className="mt-2.5">
// 								<textarea
// 									name="message"
// 									id="message"
// 									rows={4}
// 									{...register('message', {
// 										required: true,
// 									})}
// 									className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
// 									defaultValue={''}
// 								/>
// 							</div>
// 							{errors.message && (
// 								<p className={'mt-2 text-xs text-red-500/80'}>
// 									{errors.message.message}
// 								</p>
// 							)}
// 						</div>
// 						<div className={'sm:col-span-2'}>
// 							<p className="text-sm leading-6 text-slate-600">
// 								En envoyant votre message, vous acceptez notre{' '}
// 								<Link
// 									href="/politique-de-confidentialite"
// 									className="font-semibold"
// 								>
// 									politique&nbsp;de&nbsp;confidentialité.
// 								</Link>
// 							</p>
// 						</div>
// 					</div>
// 					<div className="mt-10">
// 						<button
// 							type="submit"
// 							className="block w-full rounded-md bg-indigo-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
// 						>
// 							{"Envoyer l'email"}
// 						</button>
// 					</div>
// 				</form>
// 				<section className={'relative py-20'}>
// 					<div className="mx-auto flex max-w-7xl flex-col px-4 md:flex-row md:px-8 xl:px-0">
// 						<div className="mx-auto mb-10 w-full md:w-1/2">
// 							<h2 className="w-full text-start text-4xl font-bold tracking-tight text-slate-900 sm:text-4xl md:w-1/2">
// 								Contactez-nous
// 							</h2>
// 							<p className="mt-6 w-full text-start text-lg text-slate-700 md:w-1/2">
// 								{
// 									"My-Makeup, plus qu'une plateforme de mise en relation, une équipe de passionnés à votre service !"
// 								}
// 							</p>
// 						</div>
// 						<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:w-1/2 lg:col-span-2 lg:gap-8">
// 							<div className="rounded-2xl bg-slate-50 p-10">
// 								<h3 className="text-base font-semibold leading-7 text-slate-900">
// 									Contact général
// 								</h3>
// 								<dl className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
// 									<div>
// 										<dt className="sr-only">Email</dt>
// 										<dd>
// 											<a
// 												className="font-semibold text-indigo-600"
// 												href="mailto:contact@andy-cinquin.fr"
// 											>
// 												contact@andy-cinquin.fr
// 											</a>
// 										</dd>
// 									</div>
// 									<div className="mt-1">
// 										<dt className="sr-only">Phone number</dt>
// 										<dd>06 21 58 26 84</dd>
// 									</div>
// 								</dl>
// 							</div>
// 							<div className="rounded-2xl bg-slate-50 p-10">
// 								<h3 className="text-base font-semibold leading-7 text-slate-900">
// 									Travailler avec nous
// 								</h3>
// 								<dl className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
// 									<div>
// 										<dt className="sr-only">Email</dt>
// 										<dd>
// 											<a
// 												className="font-semibold text-indigo-600"
// 												href="mailto:jobs@andy-cinquin.fr"
// 											>
// 												jobs@andy-cinquin.fr
// 											</a>
// 										</dd>
// 									</div>
// 								</dl>
// 							</div>
// 							<div className="rounded-2xl bg-slate-50 p-10">
// 								<h3 className="text-base font-semibold leading-7 text-slate-900">
// 									Relation entreprise
// 								</h3>
// 								<dl className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
// 									<div>
// 										<dt className="sr-only">Email</dt>
// 										<dd>
// 											<a
// 												className="font-semibold text-indigo-600"
// 												href="mailto:pro@andy-cinquin.fr"
// 											>
// 												pro@andy-cinquin.fr
// 											</a>
// 										</dd>
// 									</div>
// 									<div className="mt-1">
// 										<dt className="sr-only">Numéro de téléphone</dt>
// 										<dd>06 21 58 26 84</dd>
// 									</div>
// 								</dl>
// 							</div>
// 							<div className="rounded-2xl bg-slate-50 p-10">
// 								<h3 className="text-base font-semibold leading-7 text-slate-900">
// 									Aide et questions
// 								</h3>
// 								<dl className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
// 									<div>
// 										<dt className="sr-only">Email</dt>
// 										<dd>
// 											<a
// 												className="font-semibold text-indigo-600"
// 												href="mailto:help@andy-cinquin.fr"
// 											>
// 												help@andy-cinquin.fr
// 											</a>
// 										</dd>
// 									</div>
// 									<div className="mt-1">
// 										<dt className="sr-only">Phone number</dt>
// 										<dd>06 21 58 26 84</dd>
// 									</div>
// 								</dl>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
//
// 				<CTA />
// 			</main>
// 			<Footer />
// 		</>
// 	)
// }
//
// export default Contact
