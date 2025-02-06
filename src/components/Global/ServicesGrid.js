'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
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
					className="!font-display text-2xl normal-case leading-snug xl:text-5xl [&>*]:!font-display [&>*]:text-2xl [&>*]:normal-case xl:[&>*]:text-5xl"
					dangerouslySetInnerHTML={{
						__html: replaceTitle(
							content_website?.attributes?.content_home?.title_service
						),
					}}
				/>
				{/* See All Projects Button */}
				<Link
					href={content_website?.attributes?.content_home?.link[3]?.url || '/'}
					className="button-purple rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
				>
					<span className={'button-purple-title'}>
						{content_website?.attributes?.content_home?.link[3]?.label ||
							'See all'}
					</span>
				</Link>
			</div>

			{/* Bento Grid Layout */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
				{services.map((service, index) => (
					<BentoCard
						key={service.id}
						eyebrow={service.attributes.eyebrow}
						title={service.attributes.title}
						description={service.attributes.description}
						graphic={
							<div className="relative h-80 w-full">
								<Image
									src={
										service.attributes.image ||
										`/assets/bento/bento_${index + 1}.png`
									}
									alt={service.attributes.title || 'Service illustration'}
									fill
									className="object-cover object-center"
									priority
								/>
							</div>
						}
						fade={['bottom']}
						className={clsx(
							// Last two items span 3 columns
							index >= services.length - 2 ? 'lg:col-span-3' : 'lg:col-span-2',
							// Rounded corners for first and last items
							index === 0 && 'lg:rounded-tl-4xl',
							index === services.length - 1 && 'lg:rounded-br-4xl'
						)}
					/>
				))}
			</div>
		</section>
	)
}

// BentoCard Component with hover animation
function BentoCard({
	eyebrow,
	title,
	description,
	graphic,
	fade = [],
	className,
}) {
	return (
		<motion.div
			initial="idle"
			whileHover="hover"
			variants={{
				idle: { scale: 1 },
				hover: { scale: 1.02 },
			}}
			className={clsx(
				'group relative overflow-hidden rounded-2xl bg-slate-1000',
				'transition-all duration-300 ease-out',
				className
			)}
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
