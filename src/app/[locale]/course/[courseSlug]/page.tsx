import { Breadcrumb, BreadcrumbHome, Breadcrumbs, BreadcrumbSeparator } from '@/components/course/Breadcrumbs'
import { ContentLink } from '@/components/course/ContentLink'
import { BookIcon } from '@/components/course/icons/BookIcon'
import { ClockIcon } from '@/components/course/icons/ClockIcon'
import { LessonsIcon } from '@/components/course/icons/LessonsIcon'
import { PlayIcon } from '@/components/course/icons/PlayIcon'
import { PageSection } from '@/components/course/PageSection'
import { SidebarLayoutContent } from '@/components/course/SidebarLayout'
import { getCourseBySlug } from '@/services/getCourses'
import type { Locale } from '@/types/strapi'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageParams {
	locale: Locale
	courseSlug: string
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
	const { locale, courseSlug } = await params
	const courseData = await getCourseBySlug(courseSlug, locale)

	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		return {
			title: 'Cours non trouvé',
		}
	}

	const course = courseData.data[0]

	return {
		title: `${course.attributes.title} - Cours`,
		description: course.attributes.description,
	}
}

function formatDuration(seconds: number): string {
	const h = Math.floor(seconds / 3600)
	const m = Math.floor((seconds % 3600) / 60)

	return h > 0 ? (m > 0 ? `${h}h ${m}min` : `${h}h`) : `${m}min`
}

export default async function CourseDetailPage({ params }: { params: Promise<PageParams> }) {
	const { locale, courseSlug } = await params
	const courseData = await getCourseBySlug(courseSlug, locale)

	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		notFound()
	}

	const course = courseData.data[0]
	const lessons = course.attributes.lessons?.data ?? []
	const totalDuration = course.attributes.duration_total ?? 0

	return (
		<SidebarLayoutContent
			breadcrumbs={
				<Breadcrumbs>
					<BreadcrumbHome locale={locale} />
					<BreadcrumbSeparator />
					<Breadcrumb>{course.attributes.title}</Breadcrumb>
				</Breadcrumbs>
			}
		>
			<div className="relative mx-auto max-w-7xl">
				{/* Hero Section */}
				<div className="relative overflow-hidden rounded-t-2xl">
					<div className="absolute -inset-x-2 top-0 -z-10 h-80 sm:h-88 md:h-112 lg:-inset-x-4 lg:h-128">
						{course.attributes.thumbnail?.data?.attributes?.url && (
							<img
								alt=""
								src={course.attributes.thumbnail.data.attributes.url}
								className="absolute inset-0 h-full w-full object-cover object-center opacity-20 mask-l-from-60%"
							/>
						)}
						<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-slate-900/40 to-slate-900/80 backdrop-blur-3xl" />
						<div className="absolute inset-0 rounded-t-2xl outline-1 -outline-offset-1 outline-slate-50/10" />
					</div>
					<div className="mx-auto max-w-6xl">
						<div className="relative px-4 pt-48 pb-12 lg:py-24">
							<div className="mb-4 inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-400 backdrop-blur-sm">
								{course.attributes.category?.data?.attributes?.name ?? 'Cours'}
							</div>
							<h1 className="text-3xl font-bold text-slate-50 lg:text-4xl">
								{course.attributes.title}
							</h1>
							<p className="mt-7 max-w-lg text-base/7 text-pretty text-slate-300">
								{course.attributes.description}
							</p>
							<div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm/7 font-semibold text-slate-50 sm:gap-3">
								<div className="flex items-center gap-1.5">
									<LessonsIcon className="stroke-cyan-400" />
									{lessons.length} leçons
								</div>
								<span className="hidden text-slate-50/25 sm:inline">&middot;</span>
								<div className="flex items-center gap-1.5">
									<ClockIcon className="stroke-cyan-400" />
									{formatDuration(totalDuration)}
								</div>
								{course.attributes.level && (
									<>
										<span className="hidden text-slate-50/25 sm:inline">&middot;</span>
										<div className="flex items-center gap-1.5">
											<BookIcon className="stroke-cyan-400" />
											{course.attributes.level}
										</div>
									</>
								)}
							</div>
							{lessons.length > 0 && (
								<div className="mt-10">
									<Link
										href={`/${locale}/course/${courseSlug}/${lessons[0].attributes.slug}`}
										className="inline-flex items-center gap-x-2 rounded-full bg-cyan-500 px-4 py-2 text-sm/7 font-semibold text-slate-950 transition-all hover:bg-cyan-400"
									>
										<PlayIcon className="fill-slate-950" />
										Commencer
									</Link>
								</div>
							)}
						</div>

						{/* Lessons List */}
						<div className="grid grid-cols-1 gap-y-16 pb-10 sm:px-4">
							<PageSection id="lessons" title="Leçons">
								<div className="max-w-2xl">
									<ol className="space-y-4">
										{lessons.map((lesson, index) => (
											<li key={lesson.id}>
												<ContentLink
													title={`${index + 1}. ${lesson.attributes.title}`}
													description={lesson.attributes.description}
													href={`${courseSlug}/${lesson.attributes.slug}`}
													duration={lesson.attributes.video_duration}
													locale={locale}
												/>
											</li>
										))}
									</ol>
								</div>
							</PageSection>
						</div>
					</div>
				</div>
			</div>
		</SidebarLayoutContent>
	)
}
