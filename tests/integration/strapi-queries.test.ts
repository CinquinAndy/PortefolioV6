import { describe, expect, test } from 'bun:test'
import type { NotFoundResponse } from '@/types/api'
import { getArticles, getContentWebsite, getRealisations, getTechnologies } from '@/services/getContentWebsite'
import {
	getAllLessons,
	getChapterBySlug,
	getChapterBySlugFull,
	getChaptersByCourseId,
	getCourseBySlug,
	getCourses,
	getFeaturedCourses,
	getLessonBySlug,
	getParentCourseBySlug,
	getParentCourseForSidebar,
	getParentCourseForSidebarFull,
	getParentCourses,
	getParentCoursesLight,
} from '@/services/getCourses'
import { localesConstant } from '@/services/localesConstant'

/**
 * Integration tests against the live Strapi API.
 *
 * These replay every query the site actually uses. They exist because the
 * Strapi schema can drift (fields removed/renamed) or reject query syntax
 * after an upgrade: fetchAPI() converts any 400/500 into { notFound: true },
 * which the pages then turn into silent 404s in production.
 *
 * Real incidents these tests would have caught (2026-07):
 * - getChapterBySlug requested the removed lesson fields video_duration and
 *   is_free -> Strapi 400 -> every chapter page 404'd.
 * - Several queries mixed populate syntaxes (populate[x][y]=* together with
 *   populate=a,b,c) -> Strapi 500 -> the affected pages 404'd.
 *
 * Requires NEXT_PUBLIC_API_URL and NEXT_PUBLIC_API_TOKEN (loaded from .env
 * automatically by bun). Skipped when they are missing (e.g. offline CI).
 */

const missingEnv = !process.env.NEXT_PUBLIC_API_URL || !process.env.NEXT_PUBLIC_API_TOKEN
const it = test.skipIf(missingEnv)
const TIMEOUT = 30_000

// fetchAPI hides HTTP errors behind { notFound: true } — unwrap or fail loudly
function expectData<T>(result: T | NotFoundResponse, label: string): Exclude<T, NotFoundResponse> {
	if (result != null && typeof result === 'object' && 'notFound' in result) {
		throw new Error(`${label}: the API request failed (Strapi returned an error or an invalid query)`)
	}
	return result as Exclude<T, NotFoundResponse>
}

for (const locale of localesConstant) {
	describe(`Strapi course queries (locale: ${locale})`, () => {
		it(
			'getParentCoursesLight returns at least one published course',
			async () => {
				const result = expectData(await getParentCoursesLight(locale), 'getParentCoursesLight')
				expect(result.data.length).toBeGreaterThan(0)
			},
			TIMEOUT
		)

		it(
			'every course page query works for a real course, chapter and lesson',
			async () => {
				const parents = expectData(await getParentCourses(locale), 'getParentCourses')
				expect(parents.data.length).toBeGreaterThan(0)

				const course = parents.data[0]
				const courseSlug = course.attributes.slug

				// /course/[parentCourseSlug] page
				const sidebar = expectData(await getParentCourseForSidebar(courseSlug, locale), 'getParentCourseForSidebar')
				expect(sidebar.data.length).toBeGreaterThan(0)

				const bySlug = expectData(await getParentCourseBySlug(courseSlug, locale), 'getParentCourseBySlug')
				expect(bySlug.data.length).toBeGreaterThan(0)

				const sidebarFull = expectData(
					await getParentCourseForSidebarFull(courseSlug, locale),
					'getParentCourseForSidebarFull'
				)
				expect(sidebarFull.data.length).toBeGreaterThan(0)

				const courseBySlug = expectData(await getCourseBySlug(courseSlug, locale), 'getCourseBySlug')
				expect(courseBySlug.data.length).toBeGreaterThan(0)

				// getNextLesson() path
				expectData(await getChaptersByCourseId(course.id, locale), 'getChaptersByCourseId')

				// /course/[parentCourseSlug]/[chapterSlug] page
				const chapters = course.attributes.chapters?.data ?? []
				expect(chapters.length).toBeGreaterThan(0)
				const chapterSlug = chapters[0].attributes.slug

				const chapter = expectData(await getChapterBySlug(chapterSlug, locale), 'getChapterBySlug')
				expect(chapter.data.length).toBeGreaterThan(0)

				const chapterFull = expectData(await getChapterBySlugFull(chapterSlug, locale), 'getChapterBySlugFull')
				expect(chapterFull.data.length).toBeGreaterThan(0)

				// /course/[parentCourseSlug]/[chapterSlug]/[lessonSlug] page
				const lessonSlug = chapter.data[0].attributes.lessons?.data?.[0]?.attributes.slug
				expect(lessonSlug).toBeTruthy()
				if (lessonSlug) {
					const lesson = expectData(await getLessonBySlug(lessonSlug, locale), 'getLessonBySlug')
					expect(lesson.data).toBeTruthy()
				}
			},
			TIMEOUT
		)

		it(
			'course listing queries work',
			async () => {
				expectData(await getCourses(locale), 'getCourses')
				expectData(await getFeaturedCourses(locale), 'getFeaturedCourses')
				expectData(await getAllLessons(locale), 'getAllLessons')
			},
			TIMEOUT
		)
	})

	describe(`Strapi content queries (locale: ${locale})`, () => {
		it(
			'articles are available for blog static generation',
			async () => {
				const articles = expectData(await getArticles(locale), 'getArticles')
				expect(articles.data.length).toBeGreaterThan(0)
			},
			TIMEOUT
		)

		it(
			'realisations are available for portfolio static generation',
			async () => {
				const realisations = expectData(await getRealisations(locale), 'getRealisations')
				expect(realisations.data.length).toBeGreaterThan(0)
			},
			TIMEOUT
		)

		it(
			'global content and technologies queries work',
			async () => {
				expectData(await getContentWebsite(locale), 'getContentWebsite')
				expectData(await getTechnologies(locale), 'getTechnologies')
			},
			TIMEOUT
		)
	})
}
