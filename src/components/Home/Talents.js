import React from 'react'
import CardDemo from '@/components/Global/CardDemo'
import { convertStringToKebabCase } from '@/services/utils'
import Image from 'next/image'

function Talents({ talents }) {
	return (
		<section className={'relative px-4 py-20 md:px-8 2xl:px-0'}>
			<div className="mx-auto max-w-7xl py-10">
				<div className="mx-auto">
					<h2 className="text-right text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Vos projets, nos meilleurs talents.
					</h2>
				</div>
			</div>
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto flex w-full flex-col md:flex-row md:gap-24">
					<div
						className={
							'relative flex h-auto items-center justify-center gap-2 pb-10 md:w-1/5 md:gap-0 md:p-0'
						}
					>
						<div
							className={
								'md:absolute md:left-1/2 md:top-1/2 md:z-20 md:-translate-x-[40%] md:-translate-y-[40%]'
							}
						>
							<CardDemo
								src={'/assets/Maquilleuse_Professionnelle.webp'}
								heart={true}
							/>
						</div>
						<div
							className={
								'md:absolute md:left-1/2 md:top-1/2 md:z-10 md:-translate-x-[90%] md:-translate-y-[90%]'
							}
						>
							<CardDemo src={'/assets/Maquilleuse_cinema.webp'} heart={false} />
						</div>
					</div>
					<div
						className={
							'xs:grid-cols-3 grid w-full grid-cols-2 gap-4 md:w-4/5 md:grid-cols-4 md:gap-8'
						}
					>
						{talents?.map((talent, index) => (
							<a
								key={talent.attributes.title}
								href={
									'/talent/' + convertStringToKebabCase(talent.attributes.slug)
								}
								className={'group relative'}
							>
								<h2
									className={
										'flex h-full min-h-[120px] items-center justify-center rounded-xl border border-indigo-900/10 px-4 py-8 text-center font-semibold text-gray-900/70 transition duration-100 ease-in  group-hover:opacity-0'
									}
								>
									{talent.attributes.title}
								</h2>
								<div
									className={
										'absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-hidden rounded-xl'
									}
								>
									<Image
										src={'/assets/talents/' + talent.attributes.slug + '.svg'}
										width={50}
										height={50}
										className={
											'absolute -bottom-3 -right-2 -rotate-6 scale-75 transform opacity-50'
										}
										alt={'icon ' + talent.attributes.title}
									/>
								</div>
								<h2
									className={
										'absolute left-0 top-0 h-full w-full border border-indigo-900 bg-indigo-900 px-4 py-8 transition duration-100 ease-in ' +
										'-z-10 flex items-center justify-center rounded-xl text-center font-semibold text-gray-50 opacity-0 group-hover:z-10 group-hover:opacity-100'
									}
								>
									Voir cette spécialitée
								</h2>
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Talents
