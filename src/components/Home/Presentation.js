import React from 'react'
import Image from 'next/image'

function Presentation() {
	return (
		<section className={'relative px-4 py-20 md:px-0'}>
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto">
					<h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						My-Makeup c&apos;est avant tout une communauté
					</h2>
					<p className="mt-6 text-center text-lg leading-8 text-gray-700">
						Où les maquilleuses et les particuliers se retrouvent pour
						collaborer en tout simplicité.
					</p>
				</div>
			</div>
			<div className={'mx-auto mt-10 max-w-7xl'}>
				<div
					className={
						'mx-auto flex flex-col items-center justify-center gap-16 md:flex-row lg:gap-32'
					}
				>
					<div className={'flex flex-col items-center justify-center gap-2'}>
						<Image
							alt={'client à la recherche de maquilleuse'}
							src={'/assets/illustrations/illustration.webp'}
							width={'140'}
							height={'140'}
						/>
						<h3
							className={
								'text-center text-4xl font-bold tracking-tight text-gray-700 sm:text-xl'
							}
						>
							Des milliers de particuliers
						</h3>
						<p className={'text-center text-sm leading-8 text-gray-600'}>
							À la recherche de maquilleuses expérimentées
						</p>
					</div>
					<div className={'flex flex-col items-center justify-center gap-2'}>
						<Image
							alt={'des maquilleuses passionnées aux multiples compétences'}
							src={'/assets/illustrations/illustration_2.webp'}
							width={'140'}
							height={'140'}
						/>
						<h3
							className={
								'text-center text-4xl font-bold tracking-tight text-gray-700 sm:text-xl'
							}
						>
							Des milliers de maquilleuses
						</h3>
						<p className={'text-center text-sm leading-8 text-gray-600'}>
							Aux multiples spécialités et personnalités
						</p>
					</div>
					<div className={'flex flex-col items-center justify-center gap-2'}>
						<Image
							alt={
								'une solution dédiée pour collaborer entre particuliers et maquilleuses'
							}
							src={'/assets/illustrations/illustration_3.webp'}
							width={'140'}
							height={'140'}
						/>
						<h3
							className={
								'text-center text-4xl font-bold tracking-tight text-gray-700 sm:text-xl'
							}
						>
							Une solution dédiée
						</h3>
						<p className={'text-center text-sm leading-8 text-gray-600'}>
							Pensée et conçue pour collaborer
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Presentation
