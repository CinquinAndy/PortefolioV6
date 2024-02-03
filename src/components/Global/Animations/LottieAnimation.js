'use client'
import { Player } from '@lottiefiles/react-lottie-player'

export function LottieAnimation() {
	return (
		<div className={'container-lottie'}>
			<div className={'lottie-1'}>
				<Player
					autoplay
					loop
					src="/assets/background_animation/Animation - 1706890285931.json"
					style={{ height: '1080px', width: '1920px' }}
				/>
			</div>
			<div className={'lottie-2'}>
				<Player
					autoplay
					loop
					src="/assets/background_animation/Animation - 1706890285931.json"
					style={{ height: '1080px', width: '1920px' }}
				/>
			</div>
		</div>
	)
}
