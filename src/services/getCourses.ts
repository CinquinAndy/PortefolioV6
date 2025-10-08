import { redirect } from 'next/navigation'
import type { NotFoundResponse } from '@/types/api'
import type { Course, CoursesResponse, Lesson, LessonResponse, LessonsResponse } from '@/types/course'
import type { Locale } from '@/types/strapi'
import { fetchAPI, processMarkdown } from './getContentWebsite'

/**
 * Get all parent courses (courses without parent_course) - LIGHT VERSION
 * Only loads essential data for the course listing page:
 * - title, slug, description, difficulty (for stars)
 * - thumbnail (url + alt)
 * - tags (name only)
 * - chapters count (without loading full chapter data)
 *
 * This is optimized for the /course page display
 */
export async function getParentCoursesLight(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	const result = await fetchAPI<CoursesResponse>(
		`api/courses?fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=difficulty&populate[thumbnail][fields][0]=url&populate[thumbnail][fields][1]=alternativeText&populate[tags][fields][0]=name&populate[chapters][fields][0]=id&filters[is_published][$eq]=true&filters[parent_course][id][$null]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)

	if (!('notFound' in result) && result.data) {
		console.log(`Fetched ${result.data.length} parent courses (light) (locale: ${locale})`)
	}

	return result
}

/**
 * Get all parent courses (courses without parent_course) - FULL VERSION
 * Populates: thumbnail, tags, chapters with their lessons for proper link generation
 * Use this when you need full chapter/lesson data (e.g., for sidebar navigation)
 */
export async function getParentCourses(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	const result = await fetchAPI<CoursesResponse>(
		`api/courses?populate[thumbnail]=*&populate[tags]=*&populate[chapters][populate][lessons]=*&filters[is_published][$eq]=true&filters[parent_course][id][$null]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)

	if (!('notFound' in result) && result.data) {
		console.log(`Fetched ${result.data.length} parent courses (full) (locale: ${locale})`)
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
 * Optimized: Only populates what's needed (lessons with basic info, no deep populate)
 */
export async function getChaptersByCourseId(
	courseId: number,
	locale: Locale
): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate[lessons][populate]=*&populate=thumbnail,tags&filters[parent_course][id][$eq]=${courseId}&filters[is_published][$eq]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)
}

/**
 * Get parent course by slug with all chapters and lessons
 * Optimized: Only loads 2 levels instead of 6
 */
export async function getParentCourseBySlug(slug: string, locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate[chapters][populate][lessons]=*&populate=thumbnail,tags,seo&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
	)
}

/**
 * Get parent course for display page - OPTIMIZED VERSION
 * Loads chapters with basic lesson info (for counting), plus seo and localizations
 * Much lighter than deep populate because lessons don't include content, attachments, etc.
 */
export async function getParentCourseForSidebar(
	slug: string,
	locale: Locale
): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate[chapters][populate][lessons]=*&populate[chapters][sort][0]=order:asc&populate[seo]=*&populate[localizations]=*&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&locale=${locale}`
	)
}

/**
 * Get parent course for sidebar with full chapter and lesson data - FULL VERSION
 * Use this when you need complete lesson data (e.g., for navigation sidebar with all lesson titles)
 */
export async function getParentCourseForSidebarFull(
	slug: string,
	locale: Locale
): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate[chapters][populate][lessons][sort][0]=order:asc&populate[chapters][populate][lessons][pagination][pageSize]=100&populate[chapters][sort][0]=order:asc&populate[chapters][pagination][pageSize]=100&populate=thumbnail,tags&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&locale=${locale}`
	)
}

/**
 * Get course/chapter by slug (can be parent or chapter)
 * Optimized: Only loads necessary relations
 */
export async function getCourseBySlug(slug: string, locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate[chapters][populate]=lessons&populate[lessons]=*&populate=thumbnail,tags,seo,parent_course&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&sort=order:asc&pagination[pageSize]=100&locale=${locale}`
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
 * Optimized: Only populates necessary fields
 */
export async function getFeaturedCourses(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate=thumbnail,tags&filters[featured][$eq]=true&filters[is_published][$eq]=true&locale=${locale}&sort=order:asc&pagination[pageSize]=100`
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
 * Get all lessons - ultra light version for counting only
 * Only loads the lesson ID, nothing else (super fast)
 */
export async function getAllLessons(locale: Locale): Promise<LessonsResponse | NotFoundResponse> {
	return fetchAPI<LessonsResponse>(`api/lessons?fields[0]=id&pagination[pageSize]=100&locale=${locale}`)
}

/**
 * Get all lessons count only (even lighter)
 * Returns pagination metadata with total count
 */
export async function getAllLessonsCount(locale: Locale): Promise<number> {
	const response = await fetchAPI<LessonsResponse>(`api/lessons?fields[0]=id&pagination[pageSize]=1&locale=${locale}`)
	if ('notFound' in response) return 0
	return response.meta?.pagination?.total ?? 0
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
