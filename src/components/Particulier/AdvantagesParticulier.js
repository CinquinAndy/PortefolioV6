import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

function AdvantagesParticulier(props) {
	const advantages = [
		{
			title: 'Accès à une large sélection de maquilleuses professionnelles',
			description:
				'Grâce à My-Makeup, les utilisateurs peuvent accéder à une large sélection de maquilleuses professionnelles en un seul endroit. Cela facilite la recherche de la maquilleuse idéale en fonction de leurs besoins spécifiques.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Recherche facile et rapide',
			description:
				"La plateforme offre un système de recherche avancé qui permet aux utilisateurs de trouver rapidement des maquilleuses basées sur leur spécialité, leur expérience, leur formation et leur localisation. Cela rend la recherche d'une maquilleuse professionnelle à la fois facile et efficace.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Informations transparentes et évaluations',
			description:
				"My-Makeup fournit des informations transparentes sur chaque maquilleuse, y compris leurs tarifs, leur expérience et leurs évaluations. Les utilisateurs peuvent lire les retours d'autres clients avant de prendre une décision, assurant ainsi une expérience de qualité.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Flexibilité',
			description:
				"En plus de fournir des services de maquillage, la plateforme peut également servir de source d'inspiration pour les utilisateurs. Ils peuvent découvrir les dernières tendances en matière de maquillage, apprendre de nouvelles techniques et recevoir des conseils de professionnels.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Apprentissage et inspiration',
			description:
				"My-Makeup fournit des informations transparentes sur chaque maquilleuse, y compris leurs tarifs, leur expérience et leurs évaluations. Les utilisateurs peuvent lire les retours d'autres clients avant de prendre une décision, assurant ainsi une expérience de qualité.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Sauvegarde de temps',
			description:
				'Au lieu de passer des heures à chercher une maquilleuse, à comparer les prix et à lire des critiques sur différents sites, les utilisateurs peuvent trouver toutes ces informations en un seul endroit sur My-Makeup. Cela permet un gain de temps considérable.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Service client de qualité',
			description:
				'My-Makeup offre un support client de qualité pour aider les utilisateurs dans leur processus de recherche et de réservation. Le service client peut résoudre les problèmes et répondre aux questions rapidement et efficacement.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Communauté',
			description:
				"En utilisant My-Makeup, les utilisateurs rejoignent une communauté de passionnés de beauté. Ils peuvent partager leurs expériences, donner et recevoir des conseils, et se sentir connectés à d'autres personnes ayant les mêmes intérêts.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Des avis authentiques',
			description:
				"Sur My-Makeup, vous pouvez lire des avis honnêtes et vérifiés de clients précédents, vous permettant de choisir votre maquilleuse avec confiance. C'est un avantage considérable par rapport à d'autres plateformes où les avis peuvent être falsifiés ou non vérifiés.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Engagement envers la qualité',
			description:
				'Toutes les maquilleuses sur My-Makeup sont vérifiées et doivent respecter nos normes de qualité élevées. Cela vous assure que vous recevrez toujours un service de haut niveau lorsque vous réservez sur notre plateforme.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Réduction des coûts',
			description:
				"En mettant les clients en relation directe avec les maquilleuses, My-Makeup élimine le besoin d'intermédiaires, ce qui peut souvent réduire les coûts.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
	]

	return (
		<section className="bg-neutral-50 py-24">
			<div className="overflow-hidden bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				<div className="relative mx-auto max-w-screen-2xl">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Nos Avantages
						</h2>
						<p className="mt-4 text-lg leading-6 text-gray-500">
							Pourquoi choisir My&nbsp;Makeup ? Voici quelques-uns de nos
							avantages.
						</p>
					</div>
					<div className="mt-12">
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
							{advantages.map(advantage => (
								<div key={advantage.title} className="pt-6">
									<div className="flow-root rounded-lg px-6 pb-8">
										<div className="flex flex-col gap-4">
											<div className={'flex items-center align-middle'}>
												<div className={'flex h-full items-center'}>
													<span className="inline-block rounded-md pr-3 ">
														{advantage.icon}
													</span>
												</div>

												<h3 className="text-lg font-medium tracking-tight text-gray-900">
													{advantage.title}
												</h3>
											</div>
											<p className="text-base text-gray-500">
												{advantage.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AdvantagesParticulier
