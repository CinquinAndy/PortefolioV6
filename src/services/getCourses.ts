import { redirect } from 'next/navigation'
import type { NotFoundResponse } from '@/types/api'
import type { Course, CoursesResponse, Lesson, LessonResponse } from '@/types/course'
import type { Locale } from '@/types/strapi'
import { fetchAPI, processMarkdown } from './getContentWebsite'

/**
 * Get all parent courses (courses without parent_course)
 */
export async function getParentCourses(_locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate[chapters][populate]=lessons&populate[chapters][sort][0]=order:asc&populate=thumbnail,tags,seo&filters[parent_course][id][$null]=true&filters[is_published][$eq]=true&sort=order:asc`
	)
}

/**
 * Get all courses (for backward compatibility)
 */
export async function getCourses(_locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(`api/courses?populate=deep,3&sort=order&filters[is_published][$eq]=true`)
}

/**
 * Get chapters for a parent course
 */
export async function getChaptersByCourseId(
	courseId: number,
	_locale: Locale
): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate=lessons,parent_course&filters[parent_course][id][$eq]=${courseId}&filters[is_published][$eq]=true&sort=order:asc`
	)
}

/**
 * Get parent course by slug with all chapters and lessons
 */
export async function getParentCourseBySlug(
	slug: string,
	_locale: Locale
): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate[chapters][populate][lessons][sort][0]=order:asc&populate[chapters][sort][0]=order:asc&populate=thumbnail,tags,seo&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true`
	)
}

/**
 * Get course/chapter by slug (can be parent or chapter)
 */
export async function getCourseBySlug(slug: string, _locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate[lessons][sort][0]=order:asc&populate[lessons][populate]=attachments&populate=parent_course,thumbnail,seo&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true`
	)
}

/**
 * Get featured courses
 */
export async function getFeaturedCourses(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate=deep,3&sort=order&filters[featured][$eq]=true&filters[is_published][$eq]=true&locale=${locale}`
	)
}

/**
 * Get course paths for static generation
 */
export async function getCoursePaths(locale: Locale): Promise<Array<{ params: { slug: string } }>> {
	const data = await getCourses(locale)

	if ('notFound' in data) {
		return []
	}

	return (
		data.data?.map((record: { attributes: { slug: string } }) => ({
			params: {
				slug: record.attributes.slug,
			},
		})) ?? []
	)
}

/**
 * Get lesson by slug with attachments
 */
export async function getLessonBySlug(slug: string, _locale: Locale): Promise<LessonResponse | NotFoundResponse> {
	return fetchAPI<LessonResponse>(`api/lessons?populate=attachments&filters[slug][$eq]=${slug}`)
}

/**
 * Get lesson paths for static generation
 */
export async function getLessonPaths(locale: Locale): Promise<Array<{ params: { slug: string } }>> {
	// On récupère tous les cours avec leurs leçons
	const coursesData = await getCourses(locale)

	if ('notFound' in coursesData || !coursesData.data) {
		return []
	}

	// On extrait toutes les leçons de tous les cours
	const lessonPaths: Array<{ params: { slug: string } }> = []

	for (const course of coursesData.data) {
		const lessons = course.attributes.lessons?.data ?? []
		for (const lesson of lessons) {
			lessonPaths.push({
				params: {
					slug: lesson.attributes.slug,
				},
			})
		}
	}

	return lessonPaths
}

/**
 * Process course data with markdown content
 */
export async function processCourseData(
	courseData: CoursesResponse | NotFoundResponse
): Promise<{ data: Course & { attributes: Course['attributes'] } }> {
	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		redirect('/404')
	}

	const course = courseData.data[0]

	// Traiter le markdown des leçons si nécessaire
	if (course.attributes.lessons?.data) {
		const processedLessons = await Promise.all(
			course.attributes.lessons.data.map(async (lesson: { attributes: { content?: string } }) => {
				if (lesson.attributes.content) {
					const processedContent = await processMarkdown(lesson.attributes.content)
					return {
						...lesson,
						attributes: {
							...lesson.attributes,
							content: processedContent,
						},
					}
				}
				return lesson
			})
		)

		return {
			data: {
				...course,
				attributes: {
					...course.attributes,
					lessons: {
						data: processedLessons as Lesson[],
					},
				},
			},
		}
	}

	return {
		data: course,
	}
}

/**
 * Process lesson data with markdown content
 */
export async function processLessonData(
	lessonData: LessonResponse | NotFoundResponse
): Promise<{ data: Lesson & { attributes: Lesson['attributes'] & { content: string } } }> {
	if ('notFound' in lessonData || !lessonData.data) {
		redirect('/404')
	}

	// Handle both array and single object responses
	const lesson = Array.isArray(lessonData.data) ? lessonData.data[0] : lessonData.data

	if (!lesson) {
		redirect('/404')
	}

	if (lesson.attributes?.content) {
		const processedContent = await processMarkdown(lesson.attributes.content)

		return {
			data: {
				...lesson,
				attributes: {
					...lesson.attributes,
					content: processedContent,
				},
			},
		}
	}

	return {
		data: {
			...lesson,
			attributes: {
				...lesson.attributes,
				content: '',
			},
		},
	}
}

/**
 * Get course with all related lessons details
 * Utile pour afficher un cours complet avec toutes ses leçons
 */
export async function getCourseWithLessons(
	slug: string,
	locale: Locale
): Promise<{ course: Course; lessons: Lesson[] } | NotFoundResponse> {
	const courseData = await getCourseBySlug(slug, locale)

	if ('notFound' in courseData || !courseData.data || courseData.data.length === 0) {
		return { notFound: true }
	}

	const course = courseData.data[0]
	const lessons = course.attributes.lessons?.data ?? []

	return {
		course,
		lessons,
	}
}

/**
 * Get next lesson in current chapter or first lesson of next chapter
 */
export async function getNextLesson(
	currentLessonSlug: string,
	currentChapterSlug: string,
	locale: Locale
): Promise<{ lesson: Lesson; chapterSlug: string } | null> {
	// Get current chapter with lessons
	const chapterData = await getCourseBySlug(currentChapterSlug, locale)

	if ('notFound' in chapterData || !chapterData.data || chapterData.data.length === 0) {
		return null
	}

	const currentChapter = chapterData.data[0]
	const lessons = currentChapter.attributes.lessons?.data ?? []
	const currentIndex = lessons.findIndex((lesson: { attributes: { slug: string } }) => lesson.attributes.slug === currentLessonSlug)

	// If there's a next lesson in the same chapter
	if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
		return {
			lesson: lessons[currentIndex + 1],
			chapterSlug: currentChapterSlug,
		}
	}

	// Try to find next chapter
	const parentCourseId = currentChapter.attributes.parent_course?.data?.id
	if (!parentCourseId) {
		return null
	}

	const chaptersData = await getChaptersByCourseId(parentCourseId, locale)
	if ('notFound' in chaptersData || !chaptersData.data) {
		return null
	}

	const chapters = chaptersData.data.sort((a: { attributes: { order: number } }, b: { attributes: { order: number } }) => a.attributes.order - b.attributes.order)
	const currentChapterIndex = chapters.findIndex((ch: { attributes: { slug: string } }) => ch.attributes.slug === currentChapterSlug)

	// If there's a next chapter
	if (currentChapterIndex !== -1 && currentChapterIndex < chapters.length - 1) {
		const nextChapter = chapters[currentChapterIndex + 1]
		const nextChapterLessons = nextChapter.attributes.lessons?.data ?? []

		if (nextChapterLessons.length > 0) {
			return {
				lesson: nextChapterLessons[0],
				chapterSlug: nextChapter.attributes.slug,
			}
		}
	}

	return null
}

/**
 * Get course statistics
 * Retourne des statistiques agrégées sur tous les cours
 */
export async function getCoursesStatistics(locale: Locale): Promise<{
	totalCourses: number
	totalLessons: number
	totalDuration: number
	totalStudents: number
}> {
	const coursesData = await getCourses(locale)

	if ('notFound' in coursesData || !coursesData.data) {
		return {
			totalCourses: 0,
			totalLessons: 0,
			totalDuration: 0,
			totalStudents: 0,
		}
	}

	let totalLessons = 0
	let totalDuration = 0
	let totalStudents = 0

	for (const course of coursesData.data) {
		totalLessons += course.attributes.lessons?.data?.length ?? 0
		totalDuration += course.attributes.duration_total ?? 0
		totalStudents += course.attributes.statistics?.total_students ?? 0
	}

	return {
		totalCourses: coursesData.data.length,
		totalLessons,
		totalDuration,
		totalStudents,
	}
}
