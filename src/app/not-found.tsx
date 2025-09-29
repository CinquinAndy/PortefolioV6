import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Noto_Serif_Display } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { LottieAnimation } from '@/components/Global/Animations/LottieAnimation'

const noto_serif_display = Noto_Serif_Display({
	variable: '--font-noto-serif-display',
	subsets: ['latin'],
})
const be_vietnam_pro = Be_Vietnam_Pro({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-be-vietnam-pro',
	subsets: ['latin'],
	style: ['italic', 'normal'],
})

export const metadata: Metadata = {
	title: 'Page Not Found - Andy Cinquin',
	description: "The page you are looking for could not be found. Return to Andy Cinquin's portfolio.",
}

export default function NotFound() {
	return (
		<div
			className={`relative text-slate-50 ${noto_serif_display.variable} ${be_vietnam_pro.variable} h-dvh overflow-y-hidden`}
		>
			{/*<LowGradientBackground />*/}
			<LottieAnimation />

			{/*<Cursor />*/}

			<div className="flex h-full items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
				<div className="">
					<Link href={'/'}>
						<Image
							alt="Logo Andy Cinquin"
							height={50}
							src={`${process.env.NEXT_PUBLIC_URL}/assets/icons/logov2.svg`}
							width={50}
						/>
					</Link>
					<div className={'mt-8'}>
						<h1 className={'my-8 text-2xl font-semibold text-slate-50'}>Page Not Found</h1>
						<div className="mx-auto max-w-3xl">
							<article>
								<div className={'prose prose-invert my-8'}>
									<p className="text-slate-300">The page you are looking for could not be found.</p>
								</div>
							</article>
						</div>

						<Link className="mt-8 text-slate-50 underline" href={'/'}>
							Return to Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
