import type { Locale } from '@/types/strapi'

export const courseTranslations = {
	fr: {
		// Common
		course: 'Cours',
		courses: 'Cours',
		chapter: 'chapitre',
		chapters: 'chapitres',
		lesson: 'leçon',
		lessons: 'leçons',
		difficulty: 'Difficulté',
		level: {
			beginner: 'Débutant',
			intermediate: 'Intermédiaire',
			advanced: 'Avancé',
		},

		// Courses list page
		coursesPage: {
			title: 'Mes Cours de Développement',
			description:
				'Découvrez mes cours complets pour maîtriser le développement web moderne. Du JavaScript aux frameworks les plus populaires.',
			stats: {
				completeCourses: 'Cours complets',
				chapters: 'Chapitres',
				lessons: 'Leçons',
			},
			noCourses: 'Aucun cours disponible',
			noCoursesDescription: 'Vérifiez que votre API Strapi est bien lancée et accessible.',
		},

		// Parent course page
		parentCoursePage: {
			notFound: 'Cours non trouvé',
			chaptersTitle: 'Chapitres',
			backToCourses: 'Retour aux cours',
		},

		// Lesson page
		lessonPage: {
			notFound: 'Leçon non trouvée',
			attachments: 'Pièces jointes',
			nextLesson: {
				backToCourses: 'Retour aux cours',
				discoverOtherChapters: "Découvrez d'autres chapitres",
			},
		},

		// Chapter page
		chapterPage: {
			notFound: 'Chapitre non trouvé',
			lessonsTitle: 'Leçons du chapitre',
			backToParentCourse: 'Retour au cours',
			noLessonsAvailable: 'Aucune leçon disponible pour le moment',
			level: 'Niveau',
			free: 'Gratuit',
			min: 'min',
		},
	},
	en: {
		// Common
		course: 'Course',
		courses: 'Courses',
		chapter: 'chapter',
		chapters: 'chapters',
		lesson: 'lesson',
		lessons: 'lessons',
		difficulty: 'Difficulty',
		level: {
			beginner: 'Beginner',
			intermediate: 'Intermediate',
			advanced: 'Advanced',
		},

		// Courses list page
		coursesPage: {
			title: 'My Development Courses',
			description:
				'Discover my comprehensive courses to master modern web development. From JavaScript to the most popular frameworks.',
			stats: {
				completeCourses: 'Complete Courses',
				chapters: 'Chapters',
				lessons: 'Lessons',
			},
			noCourses: 'No courses available',
			noCoursesDescription: 'Please check that your Strapi API is running and accessible.',
		},

		// Parent course page
		parentCoursePage: {
			notFound: 'Course not found',
			chaptersTitle: 'Chapters',
			backToCourses: 'Back to courses',
		},

		// Lesson page
		lessonPage: {
			notFound: 'Lesson not found',
			attachments: 'Attachments',
			nextLesson: {
				backToCourses: 'Back to courses',
				discoverOtherChapters: 'Discover other chapters',
			},
		},

		// Chapter page
		chapterPage: {
			notFound: 'Chapter not found',
			lessonsTitle: 'Chapter Lessons',
			backToParentCourse: 'Back to course',
			noLessonsAvailable: 'No lessons available at the moment',
			level: 'Level',
			free: 'Free',
			min: 'min',
		},
	},
} as const

export function getCourseTranslations(locale: Locale) {
	return courseTranslations[locale] || courseTranslations.fr
}

// Helper function for pluralization
export function pluralize(count: number, singular: string, plural: string): string {
	return count > 1 ? plural : singular
}
