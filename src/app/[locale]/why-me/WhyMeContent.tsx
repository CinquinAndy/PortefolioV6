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

// Container variants for staggered children appearing one by one
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 1.5, // 1.5s entre chaque élément
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
			ease: [0.25, 0.1, 0.25, 1] as const, // cubic-bezier for easeOut
		},
	},
}

// Tech item component with animation
function TechItem({
	icon,
	iconBgColor,
	iconColor,
	title,
	description,
	index = 0,
}: {
	icon: React.ReactNode
	iconBgColor: string
	iconColor: string
	title: string
	description: string
	index?: number
}) {
	// Délai basé sur l'index de l'item (1.5s entre chaque item)
	const baseDelay = index * 1.5

	return (
		<motion.div variants={itemVariants} className="flex items-start gap-4">
			<div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBgColor} ${iconColor}`}>
				{icon}
			</div>
			<div className="flex-1">
				<TextEffect as="h4" per="char" preset="blur" delay={baseDelay} className="mb-1 font-semibold text-white">
					{title}
				</TextEffect>
				<TextEffect
					as="p"
					per="word"
					preset="fade"
					delay={baseDelay + 0.3}
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

export default function WhyMeContent() {
	return (
		<section className="relative w-full px-4 py-12 md:px-20 md:py-24">
			{/* Hero Section */}
			<div className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
				<p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
					Andy, 27 years old, ultra-active enthusiast, and way too eager to learn and progress. Check out the crazy
					activity on GitHub — it&apos;s 100% real!
				</p>

				<p className="mt-4 text-sm italic text-slate-500">
					→ Yes, I know what Java is, and no, I don&apos;t want to touch it! (unless it&apos;s truly a matter of life or
					death ❤️)
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
					<p className="mt-4 text-center text-sm text-slate-500">
						Just look at the number of &quot;grey&quot; days over the last year — not many! 🚀
					</p>
					<Link
						className="w-full flex justify-center mt-4 text-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
						href={'https://github.com/CinquinAndy'}
					>
						Check it out! →
					</Link>
				</div>
			</div>

			{/* Expandable Sections */}
			<div className="mx-auto max-w-4xl space-y-6">
				{/* Tech Section */}
				<ExpandableSection
					title="Tech Stack"
					summary="Linux enthusiast, self-hosted infrastructure, and Next.js lover"
					icon={<Code2 className="h-5 w-5" />}
				>
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
						<TechItem
							index={0}
							icon={<Terminal className="h-4 w-4" />}
							iconBgColor="bg-orange-500/20"
							iconColor="text-orange-400"
							title="Linux"
							description="I've been on Fedora as my daily driver for a few years now, so I know the environment well. I have my workflow habits and feel right at home in the terminal."
						/>
						<TechItem
							index={1}
							icon={<Server className="h-4 w-4" />}
							iconBgColor="bg-blue-500/20"
							iconColor="text-blue-400"
							title="Servers & Infrastructure"
							description="Infra/archi-wise, I tinker often. I've tested plenty of PaaS and configured my own servers. Started with Apache and natively installed services, then migrated to CapRover, and now Coolify. Today, I have 55 services running on a €20/month VPS at Netcup!"
						/>
						<TechItem
							index={2}
							icon={<GitBranch className="h-4 w-4" />}
							iconBgColor="bg-green-500/20"
							iconColor="text-green-400"
							title="CI/CD"
							description="GitHub Actions, Docker, Dockerfile, scripting, GitLab CI, self-hosted workers — I've touched a lot. Today, Coolify handles it for me with Nixpacks, so I worry less about this."
						/>
						<TechItem
							index={3}
							icon={<Activity className="h-4 w-4" />}
							iconBgColor="bg-red-500/20"
							iconColor="text-red-400"
							title="Monitoring & Alerting"
							description="BetterUptime, then Kuma self-hosted. Now using Coolify's built-in tools, plus Sentry on certain projects."
						/>
						<TechItem
							index={4}
							icon={<BarChart3 className="h-4 w-4" />}
							iconBgColor="bg-yellow-500/20"
							iconColor="text-yellow-400"
							title="Analytics"
							description="Google Analytics then Umami self-hosted — sometimes both depending on clients and needs!"
						/>
						<TechItem
							index={5}
							icon={<Palette className="h-4 w-4" />}
							iconBgColor="bg-pink-500/20"
							iconColor="text-pink-400"
							title="UI/UX Design"
							description="Front-end is what I prefer! I've learned Adobe Illustrator, Photoshop, Animate, Premiere Pro, After Effects. I master Figma, and I've used tools like Rive and Lottie for motion design."
						/>
						<TechItem
							index={6}
							icon={<Monitor className="h-4 w-4" />}
							iconBgColor="bg-indigo-500/20"
							iconColor="text-indigo-400"
							title="Frontend"
							description="I've touched many technologies. Even if I'm able to adapt, I have a very strong preference for the React ecosystem, especially Next.js, with libs like Shadcn/TailwindCSS."
						/>
					</motion.div>
				</ExpandableSection>

				{/* Featured Projects */}
				<ExpandableSection
					title="Featured Projects"
					summary="Repos that best represent my Next.js expertise"
					icon={<Layers className="h-5 w-5" />}
				>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid gap-4 md:grid-cols-2"
					>
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/beswib"
								href="https://beswib.com/"
								githubUrl="https://github.com/For-Hives/beswib"
								title="Beswib"
								description="The most complete: translations, preprod + prod, marketplace for running race bibs, designed from A to Z!"
								highlight="Most Complete"
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/forvoyez"
								href="https://forvoyez.com/"
								githubUrl="https://github.com/For-Hives/ForVoyez"
								title="ForVoyez"
								description="A full SaaS environment built with Next.js, demonstrating my ability to build scalable applications."
								highlight="SaaS"
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.fr/portefolio/mae"
								href="https://cinquin-maeva.com/"
								githubUrl="https://github.com/CinquinAndy/MaevaSiteV2"
								title="Maeva Site"
								description="The prettiest one! Made for my little sister recently with lots of love and attention to detail."
								highlight="Design Focus"
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.com/portefolio/wildlife-aws-experiences-ia"
								title="Wildlife F1 App"
								description="I greatly participated in creating the app for F1 — Lewis Hamilton and Charles Leclerc both tested our app! 🏎️"
								highlight="F1 Experience"
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<ProjectCard
								portfolioUrl="https://andy-cinquin.com/portefolio/redesign-neova"
								title="Neova Redesign"
								description="Complete redesign of Neova's corporate identity and digital presence."
								highlight="Corporate Redesign"
							/>
						</motion.div>
					</motion.div>
				</ExpandableSection>

				{/* Client Relations */}
				<ExpandableSection
					title="Client Relations"
					summary="Freelance experience, teaching, and project leadership"
					icon={<Users className="h-5 w-5" />}
				>
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
						<AnimatedParagraph>
							Being a freelancer for a long time, I have the ability to talk simply with anyone, gather client needs,
							engineer them, think them through, and adapt to other people's fields. That's what I've done in dozens and
							dozens of projects: websites, apps, e-commerce platforms...
						</AnimatedParagraph>
						<AnimatedParagraph>
							I think one of my greatest qualities is knowing how to speak in front of people, being able to listen,
							understand, adapt to my audience, and popularize technical skills.
						</AnimatedParagraph>
						<AnimatedParagraph>
							I also have the ability to pass on my skills — I gave classes in an engineering school for 3rd-year
							students.
						</AnimatedParagraph>
						<AnimatedParagraph>
							I can also lead a project from a commercial and administrative standpoint — like when I went to sign a
							specific contract to have the right to act as a marketplace by obtaining a partnership with PayPal US.
						</AnimatedParagraph>
					</motion.div>
				</ExpandableSection>

				{/* Open Source */}
				<ExpandableSection
					title="Open Source"
					summary="Contributing to 21st, Strapi, Obsidian, and more"
					icon={<GitBranch className="h-5 w-5" />}
				>
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
						<AnimatedParagraph>I've participated in quite a few Open Source contributions, notably:</AnimatedParagraph>
						<motion.ul variants={itemVariants} className="ml-4 list-disc space-y-2 text-slate-400 text-sm">
							<li>Strapi CMS</li>
							<li>Obsidian</li>
							<li>Components in 21st.dev (accepted to be listed publicly)</li>
							<li>WordPress plugins</li>
						</motion.ul>
						<motion.p variants={itemVariants} className="text-sm">
							<Link
								href="https://21st.dev/community/cinquinandy"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-cyan-400 underline hover:text-cyan-300"
							>
								View my 21st.dev contributions <ExternalLink className="h-3 w-3" />
							</Link>
						</motion.p>
					</motion.div>
				</ExpandableSection>

				{/* Personal */}
				<ExpandableSection
					title="Personal"
					summary="Marathon runner, hockey player, and gamer"
					icon={<Heart className="h-5 w-5" />}
				>
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
						<AnimatedParagraph>
							I'm athletic — I ran a marathon in 2024 🏃 and I plan on doing another one in 2026!
						</AnimatedParagraph>
						<AnimatedParagraph>I played Ice Hockey (even if I'm bad, I love this sport! 🏒)</AnimatedParagraph>
						<AnimatedParagraph>
							I played way too many video games before these last 6 years, but I still finished Baldur's Gate 3 (wahou!)
							and Clair Obscur (Wahou!!!).
						</AnimatedParagraph>
						<AnimatedParagraph>
							I have a past on League of Legends where I created a semi-pro team back in the day! 🎮
						</AnimatedParagraph>
						<AnimatedParagraph>
							I listen to a lot of music (everything, except Rap!) and I'm originally from the Alps in France where I
							grew up my whole childhood! 🏔️
						</AnimatedParagraph>
					</motion.div>
				</ExpandableSection>

				{/* Links Section */}
				<div className="mt-12 border-t border-white/10 pt-12">
					<h3 className="mb-6 text-center font-serif text-2xl font-semibold text-white md:text-3xl">
						Find Me Everywhere
					</h3>
					<div className="grid gap-4 md:grid-cols-2">
						<LinkCard
							href="https://andy-cinquin.com/portefolio"
							icon={<ExternalLink className="h-5 w-5" />}
							title="Portfolio"
							description="View all my recent projects"
						/>
						<LinkCard
							href="https://github.com/CinquinAndy"
							icon={<Github className="h-5 w-5" />}
							title="GitHub"
							description="Check my activity and repos"
						/>
						<LinkCard
							href="https://www.linkedin.com/in/andy-cinquin/"
							icon={<Linkedin className="h-5 w-5" />}
							title="LinkedIn"
							description="Connect professionally"
						/>
						<LinkCard
							href="https://andy-cinquin.com/blog"
							icon={<BookOpen className="h-5 w-5" />}
							title="Blog"
							description="Random ramblings and tech articles"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
