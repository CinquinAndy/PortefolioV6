'use client'

import { CameraIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import type React from 'react'
import { useState } from 'react'
import Galery from '@/components/Global/Galery'

import { replaceTitle } from '@/services/utils'
import type { ContentWebsite, Realisation } from '@/types/strapi'

interface GalerySectionProps {
	processedRealisation?: Realisation
	content_website?: ContentWebsite
}

export function GalerySection({ processedRealisation, content_website }: GalerySectionProps): React.JSX.Element {
	const [open, setOpen] = useState(false)

	const handleClick = () => {
		setOpen(!open)
	}

	return (
		<div
			className={'shadow-innercustom relative mx-auto max-w-5xl cursor-pointer p-8 md:col-span-2 md:p-20'}
			onClick={handleClick}
		>
			<div className={'flex w-full items-start gap-4 md:gap-8'}>
				<div className={'flex items-center gap-2'}>
					<h2
						className={
							'text-md [&>*]:text-md !font-display font-black md:text-3xl [&>*]:!font-display *:font-black md:*:text-3xl'
						}
						dangerouslySetInnerHTML={{
							__html: replaceTitle(content_website?.attributes?.content_realisations?.title_galery ?? ''),
						}}
					/>
					<div className={'hidden h-full items-center md:flex'}>
						<ChevronRightIcon className={'h-6 w-6 md:h-8 md:w-8'} />
					</div>
				</div>
				<button
					className={
						'custom-button-icons relative flex items-center gap-4 rounded border border-indigo-600 bg-transparent px-6 py-2 text-xs xl:px-8 xl:py-2 xl:text-sm'
					}
					onClick={() => {
						handleClick()
					}}
				>
					{content_website?.attributes?.content_realisations?.btn_galery?.label}
					<CameraIcon className={'absolute -right-2 -top-2 h-4 w-4 rotate-6'} />
				</button>
			</div>
			<Galery
				galery={processedRealisation?.attributes?.galery?.data}
				handleClick={handleClick}
				open={open}
				title_galery={content_website?.attributes?.content_realisations?.title_galery}
			/>
		</div>
	)
}
