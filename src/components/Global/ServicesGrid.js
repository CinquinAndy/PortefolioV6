'use client'

import { clsx } from 'clsx'
import Link from 'next/link'

import { motion } from 'framer-motion'

export function ServicesGrid() {
	return (
		<section
			className="w-full p-4 pt-[100px] xl:p-20 xl:pt-[300px]"
			id="services"
		>
			{/* Header Section */}
			<div className="mb-16 flex justify-between">
				<h2 className="max-w-3xl font-display text-4xl">
					Crafting Digital Experiences That Matter
				</h2>
				<Link
					href={'/contact'}
					className="button-purple rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
				>
					<span className={'button-purple-title'}>Let's work together !</span>
				</Link>
			</div>

			{/* Bento Grid */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
				<BentoCard
					eyebrow="Full-Stack Developer"
					title="Building the Future of Web"
					description="Specialized in Next.js & React, turning complex ideas into elegant solutions."
					graphic={
						<div className="h-80 bg-[url(/assets/bento/bento_1.png)] bg-cover bg-center bg-no-repeat" />
					}
					fade={['bottom']}
					className="lg:col-span-2"
				/>

				<BentoCard
					eyebrow="Experience"
					title="6+ Years of Impact"
					description="From Wildlife Studios to successful startups, delivering premium solutions that drive business growth."
					graphic={
						<div className="h-80 bg-[url(/assets/bento/bento_2.png)] bg-cover bg-center bg-no-repeat" />
					}
					fade={['bottom']}
					className="lg:col-span-2"
				/>

				<BentoCard
					eyebrow="Open Source"
					title="Community Builder"
					description="Active contributor to npm packages, GitHub projects, Obsidian plugins, Wordpress plugins, Strapi plugins and more."
					fade={['bottom']}
					graphic={
						<div className="h-80 bg-[url(/assets/bento/bento_3.png)] bg-cover bg-center bg-no-repeat" />
					}
					className="lg:col-span-2"
				/>

				<BentoCard
					eyebrow="Startup Creator"
					title="Turning Ideas Into Reality"
					description="Co-founded ForVoyez, ForMenu, and My-Makeup."
					fade={['bottom']}
					graphic={
						<div className="h-80 bg-[url(/assets/bento/bento_4.png)] bg-cover bg-center bg-no-repeat" />
					}
					className="lg:col-span-3"
				/>

				<BentoCard
					eyebrow="Let's Connect"
					title="Ready to Build?"
					description="Looking for a developer who can take your project to the next level?"
					fade={['bottom']}
					graphic={
						<div className="h-80 bg-[url(/assets/bento/bento_5.png)] bg-cover bg-center bg-no-repeat" />
					}
					className="lg:col-span-3"
				/>
			</div>
		</section>
	)
}

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
			{/* Graphic/Image Content */}
			<div className="relative">
				{graphic}
				{fade.includes('bottom') && (
					<div className="absolute inset-0 bg-gradient-to-t from-slate-1000 to-transparent" />
				)}
			</div>

			<div className="relative z-10 p-8">
				<span className="text-sm font-medium text-purple-400">{eyebrow}</span>
				<h3 className="mt-3 font-display text-xl text-white">{title}</h3>
				<p className="mt-2 text-sm text-gray-400">{description}</p>
			</div>
		</motion.div>
	)
}
