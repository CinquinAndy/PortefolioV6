import Image from 'next/image'
import Link from 'next/link'

function Cta() {
	return (
		<div className={'relative w-full py-10 md:py-20'}>
			<div
				className={
					'absolute left-0 top-0 -z-10 h-full w-full scale-125 transform overflow-x-hidden md:scale-150 xl:scale-125 2xl:scale-100'
				}
			>
				<div
					className={
						'flex h-full w-full scale-125 scale-y-150 transform items-center justify-center overflow-x-hidden overflow-y-visible md:scale-100'
					}
				>
					<Image
						className={'-z-10 scale-150 transform object-cover md:scale-100'}
						alt={'blob'}
						fill
						src={'/assets/blob.svg'}
					/>
				</div>
			</div>
			<div className="relative mx-auto max-w-7xl px-4 py-40 md:px-0 md:py-64">
				<div className="z-20 mx-auto flex w-full flex-col gap-8 md:w-2/3 md:gap-16 xl:w-1/2">
					<h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-4xl sm:leading-snug md:text-4xl">
						Rejoignez&nbsp;My-Makeup, la communauté qui fait la différence.
					</h2>
					<div
						className={
							'flex flex-col items-center justify-center gap-6 px-8 md:flex-row md:items-start md:gap-8'
						}
					>
						<Link
							href="/search"
							className={
								'btn-secondary-white flex w-full items-center justify-center text-center sm:w-2/3 md:w-auto'
							}
						>
							Je cherche des maquilleuses
						</Link>
						<Link
							href="/auth/signup"
							className={
								'btn-secondary-white-bordered flex w-full items-center justify-center text-center sm:w-2/3 md:w-auto'
							}
						>
							Je cherche des missions
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cta
