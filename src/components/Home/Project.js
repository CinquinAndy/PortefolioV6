import React from 'react'
import Image from 'next/image'

const tabs = [
	{
		title: 'Soyez incroyablement rapide & efficace',
		content:
			'Communiquez en temps réel, démarrez de nouvelles prestations en quelques jours, et recevez vos demandes rapidement.',
	},
	{
		title: 'Évoluez dans un espace sûr & un service sécurisé',
		content:
			'Concentrez-vous sur la collaboration grâce aux commentaires, évaluations, et aux profils des maquilleuses vérifiés.',
	},
	{
		title: 'Gagnez beaucoup de temps',
		content:
			'Consacrez 10 fois moins de temps à vos tâches de recherche, et de planification. Grâce à notre plateforme, vous pouvez trouver les meilleures maquilleuses, et planifier vos projets, le tout dans une solution unifiée.',
	},
	{
		title: 'Rejoignez une communauté de talents',
		content:
			'Créé pour et par des professionnels de la beauté, notre plateforme attire les meilleures maquilleuses. Nos managers dédiés à la réussite des maquilleuses soutiennent leurs carrières et le développement de leurs compétences.',
	},
]

function Project() {
	return (
		<section className={'relative px-4 py-20 md:px-8 2xl:px-0'}>
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto mb-10">
					<h2 className="text-start text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Gardez votre projet beauté en tête, on s&apos;occupe du reste
					</h2>
					<p className="mt-6 text-start text-lg text-gray-700 md:w-1/2">
						Trouvez les meilleures maquilleuses, planifiez votre projet, payez
						et recevez des paiements, le tout dans une solution unifiée. Oui,
						vous avez bien lu.
					</p>
				</div>

				<section
					className={
						'mx-auto flex max-w-7xl flex-col-reverse gap-16 md:flex-row md:gap-32'
					}
				>
					<div className={'w-full md:w-1/2'}>
						<div className={'flex flex-col gap-2'}>
							{tabs.map(tab => (
								<div key={tab.title}>
									<div
										className={
											'rounded-2xl border border-gray-200 bg-gray-50 p-10 shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-lg md:border-none md:bg-none md:shadow-none'
										}
									>
										<h3 className={'mb-4 text-xl font-bold text-gray-700'}>
											{tab.title}
										</h3>
										<p className={'text-sm text-gray-500'}>{tab.content}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={'flex items-center justify-center md:w-1/2'}>
						<Image
							className={
								'h-[250px] w-full rounded-2xl object-cover object-top md:h-[500px]'
							}
							src={'/assets/maquilleuse_project.webp'}
							alt={'illustration'}
							width={'500'}
							height={'350'}
						/>
					</div>
				</section>
			</div>
		</section>
	)
}

export default Project
