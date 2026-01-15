'use client'

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
import { AnimatedItem, ExpandableSection, LinkCard, ProjectCard } from '@/components/ui/expandable-section'

export default function WhyMeContent() {
	return (
		<section className="relative w-full px-4 py-12 md:px-20 md:py-24">
			{/* Hero Section - Simple without vaporize effect */}
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
					<div className="relative aspect-[3/1] w-full overflow-hidden rounded-xl">
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
					summary="Linux enthusiast, self-hosted infrastructure master, and Next.js expert"
					icon={<Code2 className="h-5 w-5" />}
				>
					<div className="space-y-6">
						{/* Linux */}
						<AnimatedItem className="flex items-start gap-4">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
								<Terminal className="h-4 w-4" />
							</div>
							<div>
								<h4 className="mb-1 font-semibold text-white">Linux</h4>
								<p className="text-sm leading-relaxed text-slate-400">
									I&apos;ve been on Fedora as my daily driver for a few years now, so I know the environment well. I
									have my workflow habits and feel right at home in the terminal.
								</p>
							</div>
						</AnimatedItem>

						{/* Servers */}
						<AnimatedItem className="flex items-start gap-4">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
								<Server className="h-4 w-4" />
							</div>
							<div>
								<h4 className="mb-1 font-semibold text-white">Servers & Infrastructure</h4>
								<p className="text-sm leading-relaxed text-slate-400">
									Infra/archi-wise, I tinker often. I&apos;ve tested plenty of PaaS and configured my own servers.
									Started with Apache and natively installed services, then migrated to CapRover, and now Coolify.
									Today, I have <strong className="text-cyan-400">55 services running on a €20/month VPS</strong> at
									Netcup! Also deployed on GCP (medical field in France), AWS tools, and Vercel (with Wildlife.la).
								</p>
							</div>
						</AnimatedItem>

						{/* CI/CD */}
						<AnimatedItem className="flex items-start gap-4">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
								<GitBranch className="h-4 w-4" />
							</div>
							<div>
								<h4 className="mb-1 font-semibold text-white">CI/CD</h4>
								<p className="text-sm leading-relaxed text-slate-400">
									GitHub Actions, Docker, Dockerfile, scripting, GitLab CI, self-hosted workers — I&apos;ve touched a
									lot. Today, Coolify handles it for me with Nixpacks, so I worry less about this.
								</p>
							</div>
						</AnimatedItem>

						{/* Monitoring */}
						<AnimatedItem className="flex items-start gap-4">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
								<Activity className="h-4 w-4" />
							</div>
							<div>
								<h4 className="mb-1 font-semibold text-white">Monitoring & Alerting</h4>
								<p className="text-sm leading-relaxed text-slate-400">
									BetterUptime, then Kuma self-hosted. Now using Coolify&apos;s built-in tools, plus Sentry on certain
									projects.
								</p>
							</div>
						</AnimatedItem>

						{/* Analytics */}
						<AnimatedItem className="flex items-start gap-4">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-500/20 text-yellow-400">
								<BarChart3 className="h-4 w-4" />
							</div>
							<div>
								<h4 className="mb-1 font-semibold text-white">Analytics</h4>
								<p className="text-sm leading-relaxed text-slate-400">
									Google Analytics then Umami self-hosted — sometimes both depending on clients and needs!
								</p>
							</div>
						</AnimatedItem>

						{/* UI/UX */}
						<AnimatedItem className="flex items-start gap-4">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400">
								<Palette className="h-4 w-4" />
							</div>
							<div>
								<h4 className="mb-1 font-semibold text-white">UI/UX Design</h4>
								<p className="text-sm leading-relaxed text-slate-400">
									Front-end is what I prefer! I&apos;ve learned Adobe Illustrator, Photoshop, Animate, Premiere Pro,
									After Effects. I master <strong className="text-cyan-400">Figma</strong>, and I&apos;ve used tools
									like <strong className="text-cyan-400">Rive</strong> and{' '}
									<strong className="text-cyan-400">Lottie</strong> for motion design. I design from A to Z most of the
									projects I develop.
								</p>
							</div>
						</AnimatedItem>

						{/* Frontend */}
						<AnimatedItem className="flex items-start gap-4">
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
								<Monitor className="h-4 w-4" />
							</div>
							<div>
								<h4 className="mb-1 font-semibold text-white">Frontend</h4>
								<p className="text-sm leading-relaxed text-slate-400">
									I&apos;ve touched many technologies. Even if I&apos;m able to adapt, I have a very strong preference
									for the <strong className="text-cyan-400">React ecosystem</strong>, especially{' '}
									<strong className="text-cyan-400">Next.js</strong>, with libs like{' '}
									<strong className="text-cyan-400">Shadcn/TailwindCSS</strong>.
								</p>
							</div>
						</AnimatedItem>
					</div>
				</ExpandableSection>

				{/* Featured Projects */}
				<ExpandableSection
					title="Featured Projects"
					summary="Repos that best represent my Next.js expertise"
					icon={<Layers className="h-5 w-5" />}
				>
					<div className="grid gap-4 md:grid-cols-2">
						<ProjectCard
							href="https://beswib.com/"
							githubUrl="https://github.com/For-Hives/beswib"
							title="Beswib"
							description="The most complete: translations, preprod + prod, marketplace for running race bibs, designed from A to Z!"
							highlight="Most Complete"
						/>
						<ProjectCard
							href="https://forvoyez.com/"
							githubUrl="https://github.com/For-Hives/ForVoyez"
							title="ForVoyez"
							description="A full SaaS environment built with Next.js, demonstrating my ability to build scalable applications."
							highlight="SaaS"
						/>
						<ProjectCard
							href="https://cinquin-maeva.com/"
							githubUrl="https://github.com/CinquinAndy/MaevaSiteV2"
							title="Maeva Site"
							description="The prettiest one! Made for my little sister recently with lots of love and attention to detail."
							highlight="Design Focus"
						/>
						<ProjectCard
							href="https://andy-cinquin.com/portefolio/wildlife-aws-realtime-racetrack-f1"
							title="Wildlife F1 App"
							description="I greatly participated in creating the app for F1 — Lewis Hamilton and Charles Leclerc both tested our app! 🏎️"
							highlight="F1 Experience"
						/>
						<ProjectCard
							href="https://andy-cinquin.com/portefolio/wildlife-aws-sticker-generator"
							title="Wildlife AWS Sticker Generator"
							description="Wildlife trusted me 200% and gave me full responsibility. Used at an AWS convention in Spain with fantastic feedback!"
							highlight="Most Proud"
						/>
					</div>
				</ExpandableSection>

				{/* Client Relations */}
				<ExpandableSection
					title="Client Relations"
					summary="Freelance experience, teaching, and project leadership"
					icon={<Users className="h-5 w-5" />}
				>
					<div className="space-y-4 text-sm leading-relaxed text-slate-300">
						<AnimatedItem>
							<p>
								Being a freelancer for a long time, I have the ability to{' '}
								<strong className="text-white">talk simply with anyone</strong>, gather client needs, engineer them,
								think them through, and adapt to other people&apos;s fields. That&apos;s what I&apos;ve done in dozens
								and dozens of projects: websites, apps, e-commerce platforms...
							</p>
						</AnimatedItem>
						<AnimatedItem>
							<p>
								I think one of my greatest qualities is{' '}
								<strong className="text-cyan-400">knowing how to speak in front of people</strong>, being able to
								listen, understand, adapt to my audience, and popularize technical skills.
							</p>
						</AnimatedItem>
						<AnimatedItem>
							<p>
								I also have the ability to pass on my skills — I gave classes in an engineering school for 3rd-year
								students. Check out my{' '}
								<a
									href="https://andy-cinquin.com/course/javascript-frameworks-training"
									target="_blank"
									rel="noopener noreferrer"
									className="text-cyan-400 underline hover:text-cyan-300"
								>
									JavaScript Frameworks Training
								</a>
								.
							</p>
						</AnimatedItem>
						<AnimatedItem>
							<p>
								I can also lead a project from a commercial and administrative standpoint — like when I went to sign a
								specific contract to have the right to act as a marketplace by obtaining a partnership with{' '}
								<strong className="text-cyan-400">PayPal US</strong>.
							</p>
						</AnimatedItem>
					</div>
				</ExpandableSection>

				{/* Open Source */}
				<ExpandableSection
					title="Open Source"
					summary="Contributing to WordPress, Strapi, Obsidian, and more"
					icon={<GitBranch className="h-5 w-5" />}
				>
					<div className="space-y-4 text-sm leading-relaxed text-slate-300">
						<AnimatedItem>
							<p>I&apos;ve participated in quite a few Open Source contributions, notably:</p>
						</AnimatedItem>
						<AnimatedItem>
							<ul className="ml-4 list-disc space-y-2 text-slate-400">
								<li>WordPress plugins</li>
								<li>Strapi CMS</li>
								<li>Obsidian</li>
								<li>
									Components in <strong className="text-cyan-400">21st.dev</strong> (accepted to be listed publicly)
								</li>
							</ul>
						</AnimatedItem>
						<AnimatedItem>
							<p>
								<a
									href="https://21st.dev/community/cinquinandy"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-cyan-400 underline hover:text-cyan-300"
								>
									View my 21st.dev contributions <ExternalLink className="h-3 w-3" />
								</a>
							</p>
						</AnimatedItem>
					</div>
				</ExpandableSection>

				{/* Personal */}
				<ExpandableSection
					title="Personal"
					summary="Marathon runner, hockey player, and former semi-pro gamer"
					icon={<Heart className="h-5 w-5" />}
				>
					<div className="space-y-4 text-sm leading-relaxed text-slate-300">
						<AnimatedItem>
							<p>
								I&apos;m athletic — <strong className="text-cyan-400">I ran a marathon in 2024</strong> 🏃 and I plan on
								doing another one in 2026!
							</p>
						</AnimatedItem>
						<AnimatedItem>
							<p>I played Ice Hockey (even if I&apos;m bad, I love this sport! 🏒)</p>
						</AnimatedItem>
						<AnimatedItem>
							<p>
								I played way too many video games before these last 6 years, but I still finished{' '}
								<strong className="text-cyan-400">Baldur&apos;s Gate 3</strong> (wahou!) and{' '}
								<strong className="text-cyan-400">Clair Obscur</strong> (Wahou!!!).
							</p>
						</AnimatedItem>
						<AnimatedItem>
							<p>
								I have a past on League of Legends where I{' '}
								<strong className="text-cyan-400">created a semi-pro team</strong> back in the day! 🎮
							</p>
						</AnimatedItem>
						<AnimatedItem>
							<p>
								I listen to a lot of music (everything, except Rap!) and I&apos;m originally from the{' '}
								<strong className="text-cyan-400">Alps in France</strong> where I grew up my whole childhood! 🏔️
							</p>
						</AnimatedItem>
					</div>
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
