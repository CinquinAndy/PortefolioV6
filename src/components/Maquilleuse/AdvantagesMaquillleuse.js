import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

function AdvantagesMaquillleuse(props) {
	const advantages = [
		{
			title: 'Développez votre activité',
			description:
				'Trouvez de nouveaux clients, améliorez votre visibilité et développez votre activité avec My-Makeup. Nous vous aidons à atteindre votre plein potentiel.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Évaluez votre travail',
			description:
				"Notre système de notation vous donne l'opportunité de recevoir des retours constructifs de vos clients. Utilisez ces évaluations pour améliorer constamment la qualité de vos services et gagner encore plus la confiance de vos futurs clients.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Mettez en avant vos compétences et votre parcours',
			description:
				'My-Makeup met en lumière votre unique parcours et compétences. Notre système de recherche avancé permet aux clients de vous trouver en fonction de vos spécialités, de votre expérience et de votre formation. Montrez au monde ce qui fait de vous une maquilleuse exceptionnelle.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Définissez vos tarifs',
			description:
				'Chez My-Makeup, vous avez le contrôle total sur vos tarifs. Fixez le prix que vous estimez juste pour vos prestations. Nous respectons le travail et la créativité de nos maquilleuses et nous croyons en une rémunération équitable.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: "Profitez d'un service totalement gratuit",
			description:
				'My-Makeup est un service totalement gratuit pour les maquilleuses. Notre objectif est de vous aider à développer votre activité sans frais supplémentaires. Nous croyons au potentiel des maquilleuses professionnelles et nous sommes là pour soutenir votre croissance.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: "Facilité d'utilisation",
			description:
				'Notre plateforme est conçue pour être intuitive et facile à utiliser, ce qui vous permet de vous concentrer sur ce que vous faites le mieux : le maquillage.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Choix varié',
			description:
				"Rejoignez une communauté diversifiée de maquilleuses professionnelles. Profitez de l'occasion pour échanger des idées et des techniques.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Paiement sécurisé',
			description:
				'Recevez des paiements en toute sécurité via notre système de paiement sécurisé. Nous nous occupons des transactions pour que vous puissiez vous concentrer sur vos clients.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Publicité gratuite',
			description:
				"En rejoignant notre plateforme, vous bénéficiez d'une publicité gratuite pour votre travail. Profitez de l'exposition à une base de clients plus large.",
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Flexibilité',
			description:
				'Travaillez à votre rythme et selon vos propres horaires. Avec My-Makeup, vous pouvez gérer vos rendez-vous en fonction de vos disponibilités.',
			icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
		},
		{
			title: 'Cote de popularité',
			description:
				"Profitez de notre système de notation et d'évaluation pour mettre en valeur la qualité de votre travail et attirer plus de clients.",
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

export default AdvantagesMaquillleuse
