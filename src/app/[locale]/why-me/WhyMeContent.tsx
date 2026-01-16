'use client'

import { motion } from 'framer-motion'
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
import { TextEffect } from '@/components/ui/text-effect'
import { getWhyMeTranslations, type WhyMeTranslations } from '@/utils/whyMeTranslations'

// Container variants for staggered children appearing one by one
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 1.5,
			delayChildren: 0.1,
		},
	},
}

// Item variants - each element slides up and fades in
const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.25, 0.1, 0.25, 1] as const,
		},
	},
}

// Helper function to calculate animation duration based on content
function calculateAnimationDuration(text: string, per: 'char' | 'word', transitionDuration = 0.3) {
	if (per === 'char') {
		const charCount = text.length
		return charCount * 0.03 + transitionDuration
	} else {
		const wordCount = text.split(/\s+/).length
		return wordCount * 0.05 + transitionDuration
	}
}

// Calculate cumulative delays for tech items based on translations
function calculateTechItemDelays(t: WhyMeTranslations) {
	const techItems = [
		t.tech.linux,
		t.tech.servers,
		t.tech.cicd,
		t.tech.monitoring,
		t.tech.analytics,
		t.tech.uiux,
		t.tech.frontend,
	]

	const delays: number[] = []
	let cumulative = 0
	for (const item of techItems) {
		delays.push(cumulative)
		const titleDuration = calculateAnimationDuration(item.title, 'char', 0.3)
		const descDuration = calculateAnimationDuration(item.description, 'word', 0.3)
		cumulative += titleDuration + descDuration + 0.2
	}
	return delays
}

// Tech item component with animation
function TechItem({
	icon,
	iconBgColor,
	iconColor,
	title,
	description,
	delay = 0,
}: {
	icon: React.ReactNode
	iconBgColor: string
	iconColor: string
	title: string
	description: string
	delay?: number
}) {
	const titleDuration = calculateAnimationDuration(title, 'char', 0.3)

	return (
		<motion.div variants={itemVariants} className="flex items-start gap-4">
			<div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBgColor} ${iconColor}`}>
				{icon}
			</div>
			<div className="flex-1">
				<TextEffect as="h4" per="char" preset="blur" delay={delay} className="mb-1 font-semibold text-white">
					{title}
				</TextEffect>
				<TextEffect
					as="p"
					per="word"
					preset="fade"
					delay={delay + titleDuration}
					className="text-sm leading-relaxed text-slate-400"
				>
					{description}
				</TextEffect>
			</div>
		</motion.div>
	)
}

// Animated paragraph for other sections
function AnimatedParagraph({ children, delay = 0 }: { children: string; delay?: number }) {
	return (
		<motion.div variants={itemVariants}>
			<TextEffect as="p" per="word" preset="fade" delay={delay} className="text-sm leading-relaxed text-slate-300">
				{children}
			</TextEffect>
		</motion.div>
	)
}

interface WhyMeContentProps {
	locale: 'en' | 'fr'
}

export default function WhyMeContent({ locale }: WhyMeContentProps) {
	const t = getWhyMeTranslations(locale)
	const techDelays = calculateTechItemDelays(t)

	return (
		<section className="relative w-full px-4 py-12 md:px-20 md:py-24">
			{/* Hero Section */}
			<div className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
				<p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">{t.hero.intro}</p>

				<p className="mt-4 text-sm text-slate-400">
					{t.hero.moreInfo}{' '}
					<Link href="https://andy-cinquin.com/portefolio" className="text-cyan-400 underline hover:text-cyan-300">
						{t.hero.portfolioLink}
					</Link>{' '}
					{t.hero.portfolioSuffix}
				</p>

				<p className="mt-4 text-sm italic text-slate-500">
					{t.hero.javaJoke}
					<br />
					{t.hero.javaException}
				</p>
			</div>

			{/* GitHub Activity Image */}
			<div className="mx-auto mb-16 max-w-4xl md:mb-24">
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
			</div>

			{/* Intro Text */}
			<div className="mx-auto mb-8 max-w-4xl text-center">
				<p className="text-sm text-slate-400">{t.intro.knowCantJudge}</p>
				<p className="mt-2 text-sm italic text-slate-500">{t.intro.touchEverything}</p>
			</div>

			{/* Expandable Sections */}
			<div className="mx-auto max-w-4xl space-y-6">
				{/* Tech Section */}
				<ExpandableSection title={t.tech.title} summary={t.tech.summary} icon={<Code2 className="h-5 w-5" />}>
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
						<TechItem
							delay={techDelays[0]}
							icon={<Terminal className="h-4 w-4" />}
							iconBgColor="bg-orange-500/20"
							iconColor="text-orange-400"
							title={t.tech.linux.title}
							description={t.tech.linux.description}
						/>
						<TechItem
							delay={techDelays[1]}
							icon={<Server className="h-4 w-4" />}
							iconBgColor="bg-blue-500/20"
							iconColor="text-blue-400"
							title={t.tech.servers.title}
							description={t.tech.servers.description}
						/>
						<TechItem
							delay={techDelays[2]}
							icon={<GitBranch className="h-4 w-4" />}
							iconBgColor="bg-green-500/20"
							iconColor="text-green-400"
							title={t.tech.cicd.title}
							description={t.tech.cicd.description}
						/>
						<TechItem
							delay={techDelays[3]}
							icon={<Activity className="h-4 w-4" />}
							iconBgColor="bg-red-500/20"
							iconColor="text-red-400"
							title={t.tech.monitoring.title}
							description={t.tech.monitoring.description}
						/>
						<TechItem
							delay={techDelays[4]}
							icon={<BarChart3 className="h-4 w-4" />}
							iconBgColor="bg-yellow-500/20"
							iconColor="text-yellow-400"
							title={t.tech.analytics.title}
							description={t.tech.analytics.description}
						/>
						<TechItem
							delay={techDelays[5]}
							icon={<Palette className="h-4 w-4" />}
							iconBgColor="bg-pink-500/20"
							iconColor="text-pink-400"
							title={t.tech.uiux.title}
							description={t.tech.uiux.description}
						/>
						<TechItem
							delay={techDelays[6]}
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
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-4 md:grid-cols-2">
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/beswib"
								href="https://beswib.com/"
								githubUrl="https://github.com/For-Hives/beswib"
								title="Beswib"
								description={t.projects.beswib.description}
								highlight={t.projects.beswib.highlight}
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/forvoyez"
								href="https://forvoyez.com/"
								githubUrl="https://github.com/For-Hives/ForVoyez"
								title="ForVoyez"
								description={t.projects.forvoyez.description}
								highlight={t.projects.forvoyez.highlight}
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/mae"
								href="https://cinquin-maeva.com/"
								githubUrl="https://github.com/CinquinAndy/MaevaSiteV2"
								title="Maeva Site"
								description={t.projects.maeva.description}
								highlight={t.projects.maeva.highlight}
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.com/portefolio/wildlife-aws-realtime-racetrack-f1"
								title="Wildlife F1 App"
								description={t.projects.wildlife.description}
								highlight={t.projects.wildlife.highlight}
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
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
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
						<AnimatedParagraph delay={0}>{t.clientRelations.p1}</AnimatedParagraph>
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
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
						<AnimatedParagraph delay={0}>{t.openSource.intro}</AnimatedParagraph>
						<motion.ul variants={itemVariants} className="ml-4 list-disc space-y-2 text-sm text-slate-400">
							{t.openSource.projects.map((project, i) => (
								<li key={i}>{project}</li>
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
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
						<AnimatedParagraph delay={0}>{t.personal.p1}</AnimatedParagraph>
						<AnimatedParagraph delay={1.2}>{t.personal.p2}</AnimatedParagraph>
						<AnimatedParagraph delay={2.0}>{t.personal.p3}</AnimatedParagraph>
						<AnimatedParagraph delay={3.5}>{t.personal.p4}</AnimatedParagraph>
						<AnimatedParagraph delay={4.5}>{t.personal.p5}</AnimatedParagraph>
					</motion.div>
				</ExpandableSection>

				{/* Links Section */}
				<div className="mt-12 border-t border-white/10 pt-12">
					<h3 className="mb-6 text-center font-serif text-2xl font-semibold text-white md:text-3xl">
						{t.links.title}
					</h3>
					<div className="grid gap-4 md:grid-cols-2">
						<LinkCard
							href="https://andy-cinquin.com/portefolio"
							icon={<ExternalLink className="h-5 w-5" />}
							title={t.links.portfolio.title}
							description={t.links.portfolio.description}
						/>
						<LinkCard
							href="https://github.com/CinquinAndy"
							icon={<Github className="h-5 w-5" />}
							title={t.links.github.title}
							description={t.links.github.description}
						/>
						<LinkCard
							href="https://www.linkedin.com/in/andy-cinquin/"
							icon={<Linkedin className="h-5 w-5" />}
							title={t.links.linkedin.title}
							description={t.links.linkedin.description}
						/>
						<LinkCard
							href="https://andy-cinquin.com/blog"
							icon={<BookOpen className="h-5 w-5" />}
							title={t.links.blog.title}
							description={t.links.blog.description}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
