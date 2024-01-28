'use client'
import { HoloCard } from 'special-card'

export function HoloComponent() {
	return (
		<div className="relative flex w-full justify-center overflow-hidden rounded-lg p-8">
			<HoloCard
				height={500}
				width={300}
				radius={30}
				imageSrc={'/assets/card_holo/holo.webp'}
				imageShineSrc="/assets/card_holo/illusion.webp"
			/>
		</div>
	)
}
