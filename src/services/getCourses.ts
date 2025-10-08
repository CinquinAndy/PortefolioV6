import { redirect } from 'next/navigation'
import type { NotFoundResponse } from '@/types/api'
import type { Course, CoursesResponse, Lesson, LessonResponse, LessonsResponse } from '@/types/course'
import type { Locale } from '@/types/strapi'
import { fetchAPI, processMarkdown } from './getContentWebsite'

/**
 * Get all parent courses (courses without parent_course)
 * Populates: thumbnail, tags, chapters with their lessons for proper link generation
 * API call: https://api.andy-cinquin.fr/api/courses?populate[thumbnail]=*&populate[tags]=*&populate[chapters][populate][lessons]=*&filters[is_published][$eq]=true&filters[parent_course][id][$null]=true&sort=order:asc&locale=fr
 */
export async function getParentCourses(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	const result = await fetchAPI<CoursesResponse>(
		`api/courses?populate[thumbnail]=*&populate[tags]=*&populate[chapters][populate][lessons]=*&filters[is_published][$eq]=true&filters[parent_course][id][$null]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)

	if (!('notFound' in result) && result.data) {
		console.log(`Fetched ${result.data.length} parent courses (locale: ${locale})`)
		if (result.data.length > 0) {
			const firstCourse = result.data[0]
			const totalChapters = firstCourse.attributes.chapters?.data?.length ?? 0
			console.log(`First course: ${firstCourse.attributes.title} - ${totalChapters} chapters`)
		}
	}

	return result
}

/**
 * Get all courses - simple call without deep populate
 * Returns all published courses (both parent courses and chapters)
 */
export async function getCourses(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(`api/courses?filters[is_published][$eq]=true&sort=order:asc&locale=${locale}`)
}

/**
 * Get all courses with deep populate (for backward compatibility when deep data is needed)
 */
export async function getCoursesDeep(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate=deep,6&filters[is_published][$eq]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)
}

/**
 * Get chapters for a parent course
 */
export async function getChaptersByCourseId(
	courseId: number,
	locale: Locale
): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate=deep,6&filters[parent_course][id][$eq]=${courseId}&filters[is_published][$eq]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)
}

/**
 * Get parent course by slug with all chapters and lessons
 */
export async function getParentCourseBySlug(slug: string, locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate=deep,6&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)
}

/**
 * Get parent course for sidebar with explicit chapter and lesson population
 */
export async function getParentCourseForSidebar(
	slug: string,
	locale: Locale
): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate[chapters][populate][lessons][sort][0]=order:asc&populate[chapters][populate][lessons][pagination][pageSize]=100&populate[chapters][sort][0]=order:asc&populate[chapters][pagination][pageSize]=100&populate=thumbnail,tags&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&locale=${locale}`
	)
}

/**
 * Get course/chapter by slug (can be parent or chapter)
 */
export async function getCourseBySlug(slug: string, locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate=deep,6&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)
}

/**
 * Get chapter by slug with explicit lessons and parent_course population
 */
export async function getChapterBySlug(slug: string, locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate[lessons][sort][0]=order:asc&populate[lessons][populate]=attachments&populate[lessons][pagination][pageSize]=100&populate[parent_course][populate]=*&populate=thumbnail,tags,seo&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&locale=${locale}`
	)
}

/**
 * Get featured courses
 */
export async function getFeaturedCourses(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate=deep,6&filters[featured][$eq]=true&filters[is_published][$eq]=true&locale=${locale}&sort=order:asc&pagination[pageSize]=100`
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
 * Get all lessons - simple call without populate
 * Returns all lessons for counting purposes
 */
export async function getAllLessons(locale: Locale): Promise<LessonsResponse | NotFoundResponse> {
	return fetchAPI<LessonsResponse>(`api/lessons?pagination[pageSize]=100&locale=${locale}`)
}

/**
 * Get lesson by slug with attachments
 */
export async function getLessonBySlug(slug: string, locale: Locale): Promise<LessonResponse | NotFoundResponse> {
	return fetchAPI<LessonResponse>(
		`api/lessons?populate=deep,2&filters[slug][$eq]=${slug}&pagination[pageSize]=100&locale=${locale}`
	)
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
): Promise<{ lesson: Lesson; chapterSlug: string; parentCourseSlug: string } | null> {
	// Get current chapter with lessons
	const chapterData = await getChapterBySlug(currentChapterSlug, locale)

	if ('notFound' in chapterData || !chapterData.data || chapterData.data.length === 0) {
		return null
	}

	const currentChapter = chapterData.data[0]
	const lessons = currentChapter.attributes.lessons?.data ?? []
	const currentIndex = lessons.findIndex(
		(lesson: { attributes: { slug: string } }) => lesson.attributes.slug === currentLessonSlug
	)

	// Get parent course slug
	const parentCourseSlug = currentChapter.attributes.parent_course?.data?.[0]?.attributes?.slug
	if (!parentCourseSlug) {
		return null
	}

	// If there's a next lesson in the same chapter
	if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
		return {
			lesson: lessons[currentIndex + 1],
			chapterSlug: currentChapterSlug,
			parentCourseSlug,
		}
	}

	// Try to find next chapter
	const parentCourseId = currentChapter.attributes.parent_course?.data?.[0]?.id
	if (!parentCourseId) {
		return null
	}

	const chaptersData = await getChaptersByCourseId(parentCourseId, locale)
	if ('notFound' in chaptersData || !chaptersData.data) {
		return null
	}

	const chapters = chaptersData.data.sort(
		(a: { attributes: { order: number } }, b: { attributes: { order: number } }) =>
			a.attributes.order - b.attributes.order
	)
	const currentChapterIndex = chapters.findIndex(
		(ch: { attributes: { slug: string } }) => ch.attributes.slug === currentChapterSlug
	)

	// If there's a next chapter
	if (currentChapterIndex !== -1 && currentChapterIndex < chapters.length - 1) {
		const nextChapter = chapters[currentChapterIndex + 1]
		const nextChapterLessons = nextChapter.attributes.lessons?.data ?? []

		if (nextChapterLessons.length > 0) {
			return {
				lesson: nextChapterLessons[0],
				chapterSlug: nextChapter.attributes.slug,
				parentCourseSlug,
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
	const totalStudents = 0

	for (const course of coursesData.data) {
		totalLessons += course.attributes.lessons?.data?.length ?? 0
		totalDuration += course.attributes.duration_total ?? 0
		// Note: statistics field is not available in the current API response
		// totalStudents += course.attributes.statistics?.total_students ?? 0
	}

	return {
		totalCourses: coursesData.data.length,
		totalLessons,
		totalDuration,
		totalStudents,
	}
}
