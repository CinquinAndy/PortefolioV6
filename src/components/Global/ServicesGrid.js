'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'

import { replaceTitle } from '@/services/utils'

export function ServicesGrid({ content_website, services }) {
	return (
		<section
			className="w-full p-4 pt-[100px] xl:p-20 xl:pt-[300px]"
			id="services"
		>
			{/* Header Section */}
			<div className="mb-16 flex justify-between">
				<h2
					className="!font-display text-2xl normal-case leading-snug sm:text-2xl xl:text-5xl [&>*]:!font-display [&>*]:text-2xl [&>*]:normal-case xl:[&>*]:text-5xl"
					dangerouslySetInnerHTML={{
						__html: replaceTitle(
							content_website?.attributes?.content_home?.title_service
						),
					}}
				/>
				{/* See All Projects Button */}
				<Link
					className="button-purple items-center justify-center rounded px-2 py-3 text-xs md:px-6 md:py-3 xl:px-10 xl:py-4 xl:text-sm"
					href={content_website?.attributes?.content_home?.link[3]?.url || '/'}
				>
					<span className={'button-purple-title text-center'}>
						{content_website?.attributes?.content_home?.link[3]?.label ||
							'See all'}
					</span>
				</Link>
			</div>

			{/* Bento Grid Layout */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
				{services.map((service, index) => (
					<BentoCard
						className={clsx(
							// Last two items span 3 columns
							index >= services.length - 2 ? 'lg:col-span-3' : 'lg:col-span-2',
							// Rounded corners for first and last items
							index === 0 && 'lg:rounded-tl-4xl',
							index === services.length - 1 && 'lg:rounded-br-4xl'
						)}
						description={service.attributes.description}
						eyebrow={service.attributes.eyebrow}
						fade={['bottom']}
						graphic={
							<div className="relative h-80 w-full">
								<Image
									alt={service.attributes.title || 'Service illustration'}
									className="object-cover object-center"
									fill
									priority
									src={
										service.attributes.image ||
										`/assets/bento/bento_${index + 1}.png`
									}
								/>
							</div>
						}
						key={service.id}
						title={service.attributes.title}
					/>
				))}
			</div>
		</section>
	)
}

// BentoCard Component with hover animation
function BentoCard({
	description,
	fade = [],
	className,
	eyebrow,
	graphic,
	title,
}) {
	return (
		<motion.div
			className={clsx(
				'group relative overflow-hidden rounded-2xl bg-slate-1000',
				'transition-all duration-300 ease-out',
				className
			)}
			initial="idle"
			variants={{
				hover: { scale: 1.02 },
				idle: { scale: 1 },
			}}
			whileHover="hover"
		>
			{/* Image Container */}
			<div className="relative">
				{graphic}
				{/* Gradient Overlay */}
				{fade.includes('bottom') && (
					<div className="absolute inset-0 bg-gradient-to-t from-slate-1000 to-transparent" />
				)}
			</div>

			{/* Content */}
			<div className="relative z-10 p-8">
				<span className="text-sm font-medium text-purple-400">{eyebrow}</span>
				<h3 className="mt-3 font-display text-xl text-white">{title}</h3>
				<p className="mt-2 text-sm text-gray-400">{description}</p>
			</div>
		</motion.div>
	)
}
