import type { StrapiImage, StrapiResponseArray, StrapiResponseSingle } from './strapi'

// Types pour les sous-titres vidéo
export interface VideoCaption {
	id: number
	attributes: {
		locale: string
		url: string
		kind: 'captions' | 'subtitles' | 'descriptions'
	}
}

// Types pour les pièces jointes
export interface LessonAttachment {
	id: number
	attributes: {
		name: string
		url: string
		size: number
		mime?: string
	}
}

// Types pour les questions de quiz
export interface QuizQuestion {
	id: number
	question: string
	type: 'multiple_choice' | 'true_false' | 'short_answer'
	options?: string[]
	correct_answer: number | string
	explanation?: string
}

// Types pour les quiz
export interface LessonQuiz {
	id: number
	attributes: {
		title: string
		questions: QuizQuestion[]
		passing_score?: number
	}
}

// Types pour les vidéos
export interface LessonVideo {
	id: number
	attributes: {
		name: string
		url: string
		mime: string
		size: number
		duration: number
	}
}

// Types pour les leçons
export interface Lesson {
	id: number
	documentId?: string
	attributes: {
		slug: string
		title: string
		description: string
		order: number
		content: string // Markdown ou HTML
		video: StrapiResponseSingle<LessonVideo> | null
		video_thumbnail: StrapiImage | null
		video_duration: number | null
		video_captions: StrapiResponseArray<VideoCaption>
		attachments: StrapiResponseArray<LessonAttachment>
		quiz: StrapiResponseSingle<LessonQuiz> | null
		is_free: boolean
		completed_by: number
		average_completion_time: number
		locale: string
		localizations?: StrapiResponseArray<Partial<Lesson>>
		createdAt: string
		updatedAt: string
		publishedAt: string
	}
}

// Types pour les catégories
export interface CourseCategory {
	id: number
	attributes: {
		name: string
		slug: string
		color: string
		description?: string
	}
}

// Types pour les instructeurs
export interface Instructor {
	id: number
	attributes: {
		name: string
		bio: string
		avatar: StrapiImage
		social_links?: {
			linkedin?: string
			github?: string
			twitter?: string
			website?: string
		}
	}
}

// Types pour les tags
export interface CourseTag {
	id: number
	name: string
	slug: string
}

// Types pour les avis
export interface CourseReview {
	id: number
	attributes: {
		rating: number
		comment: string
		user_name: string
		user_avatar?: StrapiImage
		createdAt: string
		updatedAt: string
	}
}

// Types pour les statistiques
export interface CourseStatistics {
	total_students: number
	completion_rate: number
	average_rating: number
	total_reviews: number
}

// Types pour le pricing
export interface CoursePricing {
	is_free: boolean
	price?: number
	currency?: string
	discount_price?: number | null
	discount_end_date?: string | null
}

// Types pour les certificats
export interface CourseCertificate {
	enabled: boolean
	template_url?: string
	requirements?: {
		minimum_completion_rate: number
		minimum_quiz_score?: number
	}
}

// Types pour le SEO
export interface CourseSEO {
	title: string
	description: string
	keywords?: string
	canonical?: string
	og_image?: StrapiImage
}

// Type principal pour les cours
export interface Course {
	id: number
	documentId?: string
	attributes: {
		slug: string
		title: string
		description: string
		order: number
		thumbnail: StrapiImage
		category: StrapiResponseSingle<CourseCategory>
		level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert'
		duration_total: number // en secondes
		is_published: boolean
		featured: boolean
		lessons: StrapiResponseArray<Lesson>
		instructors: StrapiResponseArray<Instructor>
		tags: CourseTag[]
		prerequisites: StrapiResponseArray<Partial<Course>>
		related_courses: StrapiResponseArray<Partial<Course>>
		reviews: StrapiResponseArray<CourseReview>
		statistics: CourseStatistics
		pricing: CoursePricing
		certificate: CourseCertificate
		seo: CourseSEO
		locale: string
		localizations?: StrapiResponseArray<Partial<Course>>
		parent_course?: StrapiResponseSingle<Course> // For hierarchical course structure
		chapters?: StrapiResponseArray<Course> // Child chapters for parent courses
		createdAt: string
		updatedAt: string
		publishedAt: string
	}
}

// Type pour la réponse de l'API Strapi
export type CoursesResponse = StrapiResponseArray<Course>
export type CourseResponse = StrapiResponseSingle<Course>
export type LessonsResponse = StrapiResponseArray<Lesson>
export type LessonResponse = StrapiResponseSingle<Lesson>

// Helper types pour extraire les données
export type CourseData = Course['attributes']
export type LessonData = Lesson['attributes']
