'use client'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

export function ArrowLeft() {
	return (
		<div className={'mx-auto max-w-5xl'}>
			<div className={'flex w-full justify-start'}>
				<button
					onClick={() => {
						// Scroll to the top of the page smoothly when button is clicked
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}}
					className={
						'flex cursor-pointer items-center justify-center rounded-xl border border-white bg-white/5 p-2 ' +
						`backdrop-blur-sm`
					}
				>
					<ChevronLeftIcon className="h-8 w-8 text-white" />
				</button>
			</div>
		</div>
	)
}
