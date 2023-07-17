import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Signature } from '@/components/Global/Signature'

function Footer() {
	return (
		<>
			<footer
				className={
					'relative mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 pt-52 md:flex-row md:px-8 2xl:px-0'
				}
			>
				<div className={'flex flex-col gap-6'}>
					<div className={'flex items-center justify-start gap-3'}>
						<Image
							src={'/assets/logo.webp'}
							alt={'Logo My-Makeup'}
							width={'50'}
							height={'50'}
						/>
						<p className={'text-my-makeup-900 text-2xl font-bold'}>My-Makeup</p>
					</div>
					<p className={'text-sm text-gray-600'}>
						72 avenue Camus,
						<br />
						44000 Nantes
					</p>
					<div className={'flex flex-row gap-3 md:flex-col lg:flex-row'}>
						<Link
							href="https://www.instagram.com/forhives.my_makeup.fr/"
							rel={'noopener nofollow noreferrer '}
						>
							<Image
								src={'/assets/brand/037-instagram.svg'}
								className={'fill-white'}
								width={'35'}
								height={'35'}
								alt={'Instagram My-Makeup'}
							/>
						</Link>
						<Link
							href="https://www.linkedin.com/company/forhives-my-makeup/"
							rel={'noopener nofollow noreferrer'}
						>
							<Image
								src={'/assets/brand/030-linkedin.svg'}
								className={'fill-indigo-700'}
								width={'35'}
								height={'35'}
								alt={'Linkedin My-Makeup'}
							/>
						</Link>
						<Link
							href="mailto:contact@andy-cinquin.fr"
							rel={'noopener nofollow noreferrer'}
						>
							<Image
								src={'/assets/brand/017-telegram.svg'}
								className={'fill-indigo-700'}
								width={'35'}
								height={'35'}
								alt={'Mail My-Makeup'}
							/>
						</Link>
						<Link
							href="https://facebook.com/forhives.my.makeup"
							rel={'noopener nofollow noreferrer'}
						>
							<Image
								src={'/assets/brand/006-facebook.svg'}
								className={'fill-indigo-700'}
								width={'35'}
								height={'35'}
								alt={'Facebook My-Makeup'}
							/>
						</Link>
					</div>
				</div>
				<div className={'flex flex-col gap-6'}>
					<div className={'mb-2 flex items-center justify-start gap-3'}>
						<p className={'text-xl font-bold text-indigo-800'}>Particuliers</p>
					</div>
					<Link
						href={'/pourquoi-utiliser-my-makeup-en-tant-que-particulier'}
						className={'text-sm text-gray-600'}
					>
						Pourquoi My-Makeup ?
					</Link>
					<Link
						href={'/particulier/trouver-une-maquilleuse'}
						className={'text-sm text-gray-600'}
					>
						Trouver une maquilleuse
					</Link>
					<Link
						href={'/particulier/centraliser-ses-recherches'}
						className={'text-sm text-gray-600'}
					>
						Centraliser ses recherches
					</Link>
					<Link
						href={'/particulier/explorer-les-profils'}
						className={'text-sm text-gray-600'}
					>
						Explorer les profils
					</Link>
				</div>
				<div className={'flex flex-col gap-6'}>
					<div className={'mb-2 flex items-center justify-start gap-3'}>
						<p className={'text-xl font-bold text-indigo-800'}>Maquilleuses</p>
					</div>
					<Link
						href={'/pourquoi-rejoindre-my-makeup-en-tant-que-maquilleuse'}
						className={'text-sm text-gray-600'}
					>
						Pourquoi My-Makeup ?
					</Link>
					<Link
						href={'/maquilleuse/partenariats'}
						className={'text-sm text-gray-600'}
					>
						Communautés & Partenariats
					</Link>
					{/*<Link*/}
					{/*	href={'/maquilleuse/partenaires'}*/}
					{/*	className={'text-sm text-gray-600'}*/}
					{/*>*/}
					{/*	Nos partenaires*/}
					{/*</Link>*/}
					{/* todo : plus tard */}
					{/*<Link href={'/affiliation'} className={'text-sm text-gray-600'}>*/}
					{/*	Programme d&apos;affiliation*/}
					{/*</Link>*/}
					{/*<Link href={'/parrainage'} className={'text-sm text-gray-600'}>*/}
					{/*	Programme de parrainage*/}
					{/*</Link>*/}
				</div>
				<div className={'flex flex-col gap-6'}>
					<div className={'mb-2 flex items-center justify-start gap-3'}>
						<p className={'text-xl font-bold text-indigo-800'}>Ressources</p>
					</div>
					<Link
						href={'/solutions/pour-les-particuliers'}
						className={'text-sm text-gray-600'}
					>
						Solution pour les particuliers
					</Link>
					<Link
						href={'/solutions/pour-les-maquilleuses'}
						className={'text-sm text-gray-600'}
					>
						Solution pour les maquilleuses
					</Link>
					<Link href={'/blog'} className={'text-sm text-gray-600'}>
						Blog
					</Link>
					{/*<Link href={'/help'} className={'text-sm text-gray-600'}>*/}
					{/*	Aide*/}
					{/*</Link>*/}
				</div>
				<div className={'flex flex-col gap-6'}>
					<div className={'mb-2 flex items-center justify-start gap-3'}>
						<p className={'text-xl font-bold text-indigo-800'}>My-Makeup</p>
					</div>
					<Link href={'/a-propos'} className={'text-sm text-gray-600'}>
						À propos de My-Makeup
					</Link>
					<Link href={'/contact'} className={'text-sm text-gray-600'}>
						Contact
					</Link>
					<Link href={'/cgu'} className={'text-sm text-gray-600'}>
						Mentions légales
					</Link>
					{/* todo : remplir les cgv plus tard */}
					{/*<Link href={'/cgv'} className={'text-sm text-gray-600'}>*/}
					{/*	Conditions générales de vente*/}
					{/*</Link>*/}
					<Link href={'/cgu'} className={'text-sm text-gray-600'}>
						Conditions générales d&apos;utilisation
					</Link>
					<Link
						href={'/politique-de-confidentialite'}
						className={'text-sm text-gray-600'}
					>
						Politique de confidentialité
					</Link>
					<Link href={'/site-map'} className={'text-sm text-gray-600'}>
						Plan du site
					</Link>
				</div>
			</footer>
			<Signature />
		</>
	)
}

export default Footer
