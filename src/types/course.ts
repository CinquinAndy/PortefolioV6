import type { StrapiImage, StrapiResponseArray, StrapiResponseSingle } from './strapi'

// Types pour les tags
export interface CourseTag {
	id: number
	name: string
}

// Types pour le SEO
export interface CourseSEO {
	id: number
	title: string
	description: string
	h1: string
	canonical: string
}

// Type principal pour les leçons
export interface Lesson {
	id: number
	documentId?: string
	attributes: {
		slug: string
		title: string
		description: string
		order: number
		content: string // Markdown content
		attachments?: {
			data: StrapiImage[]
		}
		seo?: CourseSEO
		locale: string
		localizations?: {
			data: Array<{ id: number; attributes: string }>
		}
		createdAt: string
		updatedAt: string
		publishedAt: string
		createdBy?: {
			data: { id: number; attributes: Record<string, unknown> }
		}
		updatedBy?: {
			data: { id: number; attributes: Record<string, unknown> }
		}
	}
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
		thumbnail?: {
			data: StrapiImage | null
		}
		duration_total: number
		is_published: boolean
		featured: boolean
		tags: CourseTag[]
		seo?: CourseSEO
		category: string
		lessons: StrapiResponseArray<Lesson>
		parent_course?: {
			data: Course[]
		}
		chapters?: {
			data: Course[]
		}
		difficulty?: number
		locale: string
		localizations?: {
			data: Array<{ id: number; attributes: string }>
		}
		createdAt: string
		updatedAt: string
		publishedAt: string
		createdBy?: {
			data: { id: number; attributes: Record<string, unknown> }
		}
		updatedBy?: {
			data: { id: number; attributes: Record<string, unknown> }
		}
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
