import { redirect } from 'next/navigation'
import type { NotFoundResponse } from '@/types/api'
import type { Course, CoursesResponse, Lesson, LessonResponse } from '@/types/course'
import type { Locale } from '@/types/strapi'
import { fetchAPI, processMarkdown } from './getContentWebsite'

/**
 * Get all courses
 */
export async function getCourses(locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return await fetchAPI<CoursesResponse>(
		`api/courses?populate=deep,3&sort=order&filters[is_published][$eq]=true&locale=${locale}`
	)
}

/**
 * Get course by slug
 */
export async function getCourseBySlug(slug: string, locale: Locale): Promise<CoursesResponse | NotFoundResponse> {
	return fetchAPI<CoursesResponse>(
		`api/courses?populate=deep,4&sort=order&filters[slug][$eq]=${slug}&filters[is_published][$eq]=true&locale=${locale}`
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
		data.data?.map(record => ({
			params: {
				slug: record.attributes.slug,
			},
		})) ?? []
	)
}

/**
 * Get lesson by slug
 */
export async function getLessonBySlug(slug: string, locale: Locale): Promise<LessonResponse | NotFoundResponse> {
	return fetchAPI<LessonResponse>(
		`api/lessons?populate=deep,3&filters[slug][$eq]=${slug}&locale=${locale}`
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
			course.attributes.lessons.data.map(async lesson => {
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
						data: processedLessons,
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

	const lesson = lessonData.data

	if (lesson.attributes.content) {
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
		data: lesson,
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
 * Get next lesson in a course
 * Trouve la prochaine leçon après celle donnée
 */
export async function getNextLesson(
	currentLessonSlug: string,
	locale: Locale
): Promise<Lesson | null> {
	// Récupérer tous les cours
	const coursesData = await getCourses(locale)

	if ('notFound' in coursesData || !coursesData.data) {
		return null
	}

	// Trouver le cours contenant la leçon actuelle
	for (const course of coursesData.data) {
		const lessons = course.attributes.lessons?.data ?? []
		const currentIndex = lessons.findIndex(
			lesson => lesson.attributes.slug === currentLessonSlug
		)

		if (currentIndex !== -1) {
			// Si on a trouvé la leçon et qu'il y a une suivante
			if (currentIndex < lessons.length - 1) {
				return lessons[currentIndex + 1]
			}
			// Sinon on peut retourner null ou la première leçon du cours suivant
			return null
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
