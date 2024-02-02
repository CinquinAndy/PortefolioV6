'use client'
import { HoloCard } from 'special-card'

export function HoloComponent({ lang }) {
	return lang === 'fr' ? (
		<>
			<div className="relative hidden w-full justify-center overflow-hidden rounded-lg p-4 md:p-8 lg:flex">
				<HoloCard
					height={845 * 0.75}
					width={561 * 0.75}
					radius={30}
					imageSrc={'/assets/card_holo/holo_fr.webp'}
					imageShineSrc="/assets/card_holo/illusion.webp"
				/>
			</div>
			<div className="relative hidden w-full justify-center overflow-hidden rounded-lg p-4 sm:flex md:p-8 lg:hidden">
				<HoloCard
					height={845 * 0.5}
					width={561 * 0.5}
					radius={30}
					imageSrc={'/assets/card_holo/holo_fr.webp'}
					imageShineSrc="/assets/card_holo/illusion.webp"
				/>
			</div>
			<div className="relative flex w-full justify-center overflow-hidden rounded-lg p-4 sm:hidden md:p-8 lg:hidden">
				<HoloCard
					height={845 * 0.3}
					width={561 * 0.3}
					radius={30}
					imageSrc={'/assets/card_holo/holo_fr.webp'}
					imageShineSrc="/assets/card_holo/illusion.webp"
				/>
			</div>
		</>
	) : (
		<>
			<div className="relative hidden w-full justify-center overflow-hidden rounded-lg p-4 md:p-8 lg:flex">
				<HoloCard
					height={845 * 0.75}
					width={561 * 0.75}
					radius={30}
					imageSrc={'/assets/card_holo/holo.webp'}
					imageShineSrc="/assets/card_holo/illusion.webp"
				/>
			</div>
			<div className="relative hidden w-full justify-center overflow-hidden rounded-lg p-4 sm:flex md:p-8 lg:hidden">
				<HoloCard
					height={845 * 0.5}
					width={561 * 0.5}
					radius={30}
					imageSrc={'/assets/card_holo/holo.webp'}
					imageShineSrc="/assets/card_holo/illusion.webp"
				/>
			</div>
			<div className="relative flex w-full justify-center overflow-hidden rounded-lg p-4 sm:hidden md:p-8 lg:hidden">
				<HoloCard
					height={845 * 0.3}
					width={561 * 0.3}
					radius={30}
					imageSrc={'/assets/card_holo/holo.webp'}
					imageShineSrc="/assets/card_holo/illusion.webp"
				/>
			</div>
		</>
	)
}
