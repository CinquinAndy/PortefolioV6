'use client'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import Image from 'next/image'

export function LottieAnimation() {
	return (
		<Player
			autoplay
			loop
			src="/assets/background_animation/Animation - 1706890285931.json"
			style={{ height: '1080px', width: '1920px' }}
		>
			<Controls
				visible={false}
				buttons={['play', 'repeat', 'frame', 'debug']}
			/>
		</Player>
	)
}
