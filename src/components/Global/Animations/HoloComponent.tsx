'use client'
import React from 'react'

import { HoloCard } from 'special-card'

interface HoloComponentProps {
	lang?: string
}

export function HoloComponent({ lang }: HoloComponentProps): React.JSX.Element {
	return lang === 'fr' ? (
		<>
			<div className="relative hidden w-full justify-center overflow-hidden rounded-lg p-4 md:p-8 lg:flex">
				<HoloCard
					height={845 * 0.75}
					imageShineSrc="/assets/card_holo/illusion.webp"
					imageSrc={'/assets/card_holo/holo_fr.webp'}
					radius={30}
					width={561 * 0.75}
				/>
			</div>
			<div className="relative hidden w-full justify-center overflow-hidden rounded-lg p-4 sm:flex md:p-8 lg:hidden">
				<HoloCard
					height={845 * 0.6}
					imageShineSrc="/assets/card_holo/illusion.webp"
					imageSrc={'/assets/card_holo/holo_fr.webp'}
					radius={20}
					width={561 * 0.6}
				/>
			</div>
			<div className="relative flex w-full justify-center overflow-hidden rounded-lg p-4 sm:hidden md:p-8 lg:hidden">
				<HoloCard
					height={845 * 0.5}
					imageShineSrc="/assets/card_holo/illusion.webp"
					imageSrc={'/assets/card_holo/holo_fr.webp'}
					radius={10}
					width={561 * 0.5}
				/>
			</div>
		</>
	) : (
		<>
			<div className="relative hidden w-full justify-center overflow-hidden rounded-lg p-4 md:p-8 lg:flex">
				<HoloCard
					height={845 * 0.75}
					imageShineSrc="/assets/card_holo/illusion.webp"
					imageSrc={'/assets/card_holo/holo.webp'}
					radius={30}
					width={561 * 0.75}
				/>
			</div>
			<div className="relative hidden w-full justify-center overflow-hidden rounded-lg p-4 sm:flex md:p-8 lg:hidden">
				<HoloCard
					height={845 * 0.6}
					imageShineSrc="/assets/card_holo/illusion.webp"
					imageSrc={'/assets/card_holo/holo.webp'}
					radius={20}
					width={561 * 0.6}
				/>
			</div>
			<div className="relative flex w-full justify-center overflow-hidden rounded-lg p-4 sm:hidden md:p-8 lg:hidden">
				<HoloCard
					height={845 * 0.5}
					imageShineSrc="/assets/card_holo/illusion.webp"
					imageSrc={'/assets/card_holo/holo.webp'}
					radius={10}
					width={561 * 0.5}
				/>
			</div>
		</>
	)
}
