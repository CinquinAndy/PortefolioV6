'use client'

import { motion, type Variants } from 'framer-motion'
import {
	Activity,
	BarChart3,
	BookOpen,
	Code2,
	ExternalLink,
	GitBranch,
	Github,
	Heart,
	Layers,
	Linkedin,
	Monitor,
	Palette,
	Server,
	Terminal,
	Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ExpandableSection, LinkCard, ProjectCard } from '@/components/ui/expandable-section'
import { getWhyMeTranslations } from '@/utils/whyMeTranslations'

// ============================================
// Disney-Inspired Animation Principles:
// - Anticipation: slight scale down before appearing
// - Follow-through: overshoot on springs
// - Slow in/slow out: custom easing curves
// - Staging: staggered reveals to guide the eye
// - Secondary action: icons have their own bounce
// - Exaggeration: playful scale and rotation
// ============================================

// Custom spring configs for organic movement
const springBouncy = { type: 'spring', stiffness: 400, damping: 25 } as const
const springSmooth = { type: 'spring', stiffness: 200, damping: 20 } as const
const springGentle = { type: 'spring', stiffness: 120, damping: 14 } as const

// Container with staggered children - staging principle
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.05,
		},
	},
}

// Item with anticipation (slight scale down) and follow-through (overshoot)
const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			...springBouncy,
		},
	},
}

// Icon bounce - secondary action with exaggeration
const iconVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.3,
		rotate: -15,
	},
	visible: {
		opacity: 1,
		scale: 1,
		rotate: 0,
		transition: {
			...springGentle,
			delay: 0.1,
		},
	},
}

// Text reveal with smooth slide and fade
const textVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -20,
		filter: 'blur(4px)',
	},
	visible: {
		opacity: 1,
		x: 0,
		filter: 'blur(0px)',
		transition: {
			...springSmooth,
		},
	},
}

// Hero section - dramatic entrance
const heroVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 50,
		scale: 0.98,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			...springGentle,
			staggerChildren: 0.15,
		},
	},
}

// Card pop with 3D feel
const cardVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 40,
		scale: 0.9,
		rotateX: 10,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		rotateX: 0,
		transition: {
			...springBouncy,
		},
	},
}

// List item stagger with playful offset
const listItemVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -15,
		y: 10,
	},
	visible: {
		opacity: 1,
		x: 0,
		y: 0,
		transition: {
			...springSmooth,
		},
	},
}

// GitHub image special reveal
const imageRevealVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
		y: 20,
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			...springGentle,
			delay: 0.2,
		},
	},
}

// Tech item component with Disney-style animation
function TechItem({
	icon,
	iconBgColor,
	iconColor,
	title,
	description,
}: {
	icon: React.ReactNode
	iconBgColor: string
	iconColor: string
	title: string
	description: string
}) {
	return (
		<motion.div variants={itemVariants} className="flex items-start gap-4">
			{/* Icon with secondary action (bounce) */}
			<motion.div
				variants={iconVariants}
				className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBgColor} ${iconColor}`}
			>
				{icon}
			</motion.div>
			{/* Text content with smooth reveal */}
			<div className="flex-1">
				<motion.h4 variants={textVariants} className="mb-1 font-semibold text-white">
					{title}
				</motion.h4>
				<motion.p variants={textVariants} className="text-sm leading-relaxed text-slate-400">
					{description}
				</motion.p>
			</div>
		</motion.div>
	)
}

// Animated paragraph with smooth entrance
function AnimatedParagraph({ children }: { children: React.ReactNode }) {
	return (
		<motion.div variants={itemVariants}>
			<motion.p variants={textVariants} className="text-sm leading-relaxed text-slate-300">
				{children}
			</motion.p>
		</motion.div>
	)
}

interface WhyMeContentProps {
	locale: 'en' | 'fr'
}

export default function WhyMeContent({ locale }: WhyMeContentProps) {
	const t = getWhyMeTranslations(locale)

	return (
		<section className="relative w-full px-4 py-12 md:px-20 md:py-24">
			{/* Hero Section - Dramatic Entrance */}
			<motion.div
				className="mx-auto mb-16 max-w-4xl text-center md:mb-24"
				initial="hidden"
				animate="visible"
				variants={heroVariants}
			>
				<motion.p
					variants={itemVariants}
					className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
				>
					{t.hero.intro}
				</motion.p>

				<motion.p variants={itemVariants} className="mt-4 text-sm text-slate-400">
					{t.hero.moreInfo}{' '}
					<Link href="https://andy-cinquin.com/portefolio" className="text-cyan-400 underline hover:text-cyan-300">
						{t.hero.portfolioLink}
					</Link>{' '}
					{t.hero.portfolioSuffix}
				</motion.p>

				<motion.p variants={itemVariants} className="mt-4 text-sm italic text-slate-500">
					{t.hero.javaJoke}
					<br />
					{t.hero.javaException}
				</motion.p>
			</motion.div>

			{/* GitHub Activity Image - Special Reveal */}
			<motion.div
				className="mx-auto mb-16 max-w-4xl md:mb-24"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-50px' }}
				variants={imageRevealVariants}
			>
				<div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-sm md:p-6">
					<div className="relative aspect-3/1 w-full overflow-hidden rounded-xl">
						<Image
							src="https://ghchart.rshah.org/6366f1/CinquinAndy"
							alt="Andy's GitHub Contribution Chart"
							fill
							className="object-contain"
							unoptimized
						/>
					</div>
					<p className="mt-4 text-center text-sm text-slate-500">{t.github.caption}</p>
					<Link
						className="mt-4 flex w-full justify-center text-center text-sm text-cyan-400 transition-colors hover:text-cyan-300"
						href="https://github.com/CinquinAndy"
					>
						{t.github.checkItOut}
					</Link>
				</div>
			</motion.div>

			{/* Intro Text */}
			<motion.div
				className="mx-auto mb-8 max-w-4xl text-center"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={heroVariants}
			>
				<motion.p variants={itemVariants} className="text-sm text-slate-400">
					{t.intro.knowCantJudge}
				</motion.p>
				<motion.p variants={itemVariants} className="mt-2 text-sm italic text-slate-500">
					{t.intro.touchEverything}
				</motion.p>
			</motion.div>

			{/* Expandable Sections */}
			<div className="mx-auto max-w-4xl space-y-6">
				{/* Tech Section */}
				<ExpandableSection title={t.tech.title} summary={t.tech.summary} icon={<Code2 className="h-5 w-5" />}>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-6"
					>
						<TechItem
							icon={<Terminal className="h-4 w-4" />}
							iconBgColor="bg-orange-500/20"
							iconColor="text-orange-400"
							title={t.tech.linux.title}
							description={t.tech.linux.description}
						/>
						<TechItem
							icon={<Server className="h-4 w-4" />}
							iconBgColor="bg-blue-500/20"
							iconColor="text-blue-400"
							title={t.tech.servers.title}
							description={t.tech.servers.description}
						/>
						<TechItem
							icon={<GitBranch className="h-4 w-4" />}
							iconBgColor="bg-green-500/20"
							iconColor="text-green-400"
							title={t.tech.cicd.title}
							description={t.tech.cicd.description}
						/>
						<TechItem
							icon={<Activity className="h-4 w-4" />}
							iconBgColor="bg-red-500/20"
							iconColor="text-red-400"
							title={t.tech.monitoring.title}
							description={t.tech.monitoring.description}
						/>
						<TechItem
							icon={<BarChart3 className="h-4 w-4" />}
							iconBgColor="bg-yellow-500/20"
							iconColor="text-yellow-400"
							title={t.tech.analytics.title}
							description={t.tech.analytics.description}
						/>
						<TechItem
							icon={<Palette className="h-4 w-4" />}
							iconBgColor="bg-pink-500/20"
							iconColor="text-pink-400"
							title={t.tech.uiux.title}
							description={t.tech.uiux.description}
						/>
						<TechItem
							icon={<Monitor className="h-4 w-4" />}
							iconBgColor="bg-indigo-500/20"
							iconColor="text-indigo-400"
							title={t.tech.frontend.title}
							description={t.tech.frontend.description}
						/>
					</motion.div>
				</ExpandableSection>

				{/* Featured Projects */}
				<ExpandableSection title={t.projects.title} summary={t.projects.summary} icon={<Layers className="h-5 w-5" />}>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid gap-4 md:grid-cols-2"
						style={{ perspective: 1000 }}
					>
						<motion.div variants={cardVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/beswib"
								href="https://beswib.com/"
								githubUrl="https://github.com/For-Hives/beswib"
								title="Beswib"
								description={t.projects.beswib.description}
								highlight={t.projects.beswib.highlight}
							/>
						</motion.div>
						<motion.div variants={cardVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/forvoyez"
								href="https://forvoyez.com/"
								githubUrl="https://github.com/For-Hives/ForVoyez"
								title="ForVoyez"
								description={t.projects.forvoyez.description}
								highlight={t.projects.forvoyez.highlight}
							/>
						</motion.div>
						<motion.div variants={cardVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/mae"
								href="https://cinquin-maeva.com/"
								githubUrl="https://github.com/CinquinAndy/MaevaSiteV2"
								title="Maeva Site"
								description={t.projects.maeva.description}
								highlight={t.projects.maeva.highlight}
							/>
						</motion.div>
						<motion.div variants={cardVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.com/portefolio/wildlife-aws-realtime-racetrack-f1"
								title="Wildlife F1 App"
								description={t.projects.wildlife.description}
								highlight={t.projects.wildlife.highlight}
							/>
						</motion.div>
						<motion.div variants={cardVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.com/portefolio/wildlife-aws-sticker-generator"
								title="Wildlife Sticker Generator"
								description={t.projects.sticker.description}
								highlight={t.projects.sticker.highlight}
							/>
						</motion.div>
					</motion.div>
				</ExpandableSection>

				{/* Client Relations */}
				<ExpandableSection
					title={t.clientRelations.title}
					summary={t.clientRelations.summary}
					icon={<Users className="h-5 w-5" />}
				>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-4"
					>
						<AnimatedParagraph>{t.clientRelations.p1}</AnimatedParagraph>
						<motion.div variants={itemVariants}>
							<p className="text-sm leading-relaxed text-slate-300">
								{t.clientRelations.p2}{' '}
								<Link
									href={t.clientRelations.p2Link}
									target="_blank"
									className="text-cyan-400 underline hover:text-cyan-300"
								>
									<ExternalLink className="inline h-3 w-3" />
								</Link>
							</p>
						</motion.div>
						<motion.div variants={itemVariants}>
							<p className="text-sm leading-relaxed text-slate-300">
								{t.clientRelations.p3}{' '}
								<Link
									href={t.clientRelations.p3Link}
									target="_blank"
									className="text-cyan-400 underline hover:text-cyan-300"
								>
									<ExternalLink className="inline h-3 w-3" />
								</Link>
							</p>
						</motion.div>
					</motion.div>
				</ExpandableSection>

				{/* Open Source */}
				<ExpandableSection
					title={t.openSource.title}
					summary={t.openSource.summary}
					icon={<GitBranch className="h-5 w-5" />}
				>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-4"
					>
						<AnimatedParagraph>{t.openSource.intro}</AnimatedParagraph>
						<motion.ul variants={containerVariants} className="ml-4 list-disc space-y-2 text-sm text-slate-400">
							{t.openSource.projects.map((project, i) => (
								<motion.li key={i} variants={listItemVariants}>
									{project}
								</motion.li>
							))}
						</motion.ul>
						<motion.p variants={itemVariants} className="text-sm">
							<Link
								href="https://21st.dev/community/cinquinandy"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-cyan-400 underline hover:text-cyan-300"
							>
								{t.openSource.viewContributions} <ExternalLink className="h-3 w-3" />
							</Link>
						</motion.p>
					</motion.div>
				</ExpandableSection>

				{/* Personal */}
				<ExpandableSection title={t.personal.title} summary={t.personal.summary} icon={<Heart className="h-5 w-5" />}>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-4"
					>
						<AnimatedParagraph>{t.personal.p1}</AnimatedParagraph>
						<AnimatedParagraph>{t.personal.p2}</AnimatedParagraph>
						<AnimatedParagraph>{t.personal.p3}</AnimatedParagraph>
						<AnimatedParagraph>{t.personal.p4}</AnimatedParagraph>
						<AnimatedParagraph>{t.personal.p5}</AnimatedParagraph>
					</motion.div>
				</ExpandableSection>

				{/* Links Section */}
				<motion.div
					className="mt-12 border-t border-white/10 pt-12"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={heroVariants}
				>
					<motion.h3
						variants={itemVariants}
						className="mb-6 text-center font-serif text-2xl font-semibold text-white md:text-3xl"
					>
						{t.links.title}
					</motion.h3>
					<motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2">
						<motion.div variants={cardVariants}>
							<LinkCard
								href="https://andy-cinquin.com/portefolio"
								icon={<ExternalLink className="h-5 w-5" />}
								title={t.links.portfolio.title}
								description={t.links.portfolio.description}
							/>
						</motion.div>
						<motion.div variants={cardVariants}>
							<LinkCard
								href="https://github.com/CinquinAndy"
								icon={<Github className="h-5 w-5" />}
								title={t.links.github.title}
								description={t.links.github.description}
							/>
						</motion.div>
						<motion.div variants={cardVariants}>
							<LinkCard
								href="https://www.linkedin.com/in/andy-cinquin/"
								icon={<Linkedin className="h-5 w-5" />}
								title={t.links.linkedin.title}
								description={t.links.linkedin.description}
							/>
						</motion.div>
						<motion.div variants={cardVariants}>
							<LinkCard
								href="https://andy-cinquin.com/blog"
								icon={<BookOpen className="h-5 w-5" />}
								title={t.links.blog.title}
								description={t.links.blog.description}
							/>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
