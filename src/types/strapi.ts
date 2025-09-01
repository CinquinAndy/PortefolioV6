export interface StrapiResponse<T> {
	data: T
	meta?: {
		pagination?: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface StrapiEntity {
	id: number
	attributes: Record<string, unknown>
}

export interface StrapiUser {
	id: number
	attributes: {
		firstname?: string
		lastname?: string
		username?: string
		email: string
		resetPasswordToken?: string
		registrationToken?: string
		isActive?: boolean
		roles?: {
			data: StrapiRole[]
		}
		blocked?: boolean
		preferedLanguage?: string
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
	}
}

export interface StrapiRole {
	id: number
	attributes: {
		name: string
		code: string
		description?: string
		users?: {
			data: StrapiEntity[]
		}
		permissions?: {
			data: StrapiPermission[]
		}
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
	}
}

export interface StrapiPermission {
	id: number
	attributes: {
		action: string
		actionParameters?: unknown
		subject?: string
		properties?: unknown
		conditions?: unknown
		role?: {
			data: StrapiRelation
		}
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
	}
}

export interface StrapiFolder {
	id: number
	attributes: {
		name: string
		pathId: number
		parent?: {
			data: StrapiRelation
		}
		children?: {
			data: StrapiEntity[]
		}
		files?: {
			data: StrapiMedia[]
		}
		path?: string
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
	}
}

export interface StrapiRelation {
	id: number
	attributes: Record<string, unknown>
}

export interface StrapiMedia {
	id: number
	attributes: {
		name: string
		alternativeText?: string
		caption?: string
		width: number
		height: number
		formats?: {
			thumbnail?: StrapiImageFormat
			small?: StrapiImageFormat
			medium?: StrapiImageFormat
			large?: StrapiImageFormat
		}
		hash: string
		ext: string
		mime: string
		size: number
		url: string
		previewUrl?: string
		provider: string
		provider_metadata?: unknown
		related?: {
			data: StrapiEntity[]
		}
		folder?: {
			data: StrapiFolder
		}
		folderPath?: string
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
	}
}

export interface StrapiImageFormat {
	name: string
	hash: string
	ext: string
	mime: string
	width: number
	height: number
	size: number
	path?: string
	url: string
}

export interface LinkComponent {
	id: number
	label: string
	url: string
}

export interface TagComponent {
	id: number
	name: string
}

export interface TechnologyComponent {
	id: number
	name: string
	icon?: string
	color?: string
}

export interface Article {
	id: number
	attributes: {
		title: string
		content: string
		seo_title?: string
		seo_description?: string
		slug: string
		excerpt?: string
		image_presentation?: {
			data: StrapiMedia
		}
		galery?: {
			data: StrapiMedia[]
		}
		links?: LinkComponent[]
		subtitle?: string
		type?: string
		rank?: number
		tags?: TagComponent[]
		createdAt: string
		updatedAt: string
		publishedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
		localizations?: {
			data: Article[]
		}
		locale: string
	}
}

export interface Realisation {
	id: number
	attributes: {
		title: string
		content: string
		slug: string
		seo_title?: string
		seo_description?: string
		excerpt?: string
		subtitle?: string
		type?: string
		rank?: number
		image?: {
			data: StrapiMedia
		}
		galery?: {
			data: StrapiMedia[]
		}
		technologies?: TechnologyComponent[]
		links?: LinkComponent[]
		tags?: TagComponent[]
		createdAt: string
		updatedAt: string
		publishedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
		localizations?: {
			data: Realisation[]
		}
		locale: string
	}
}

export interface SeoContent {
	title?: string
	description?: string
	canonical?: string
	h1?: string
}

export interface ButtonContent {
	label?: string
	url?: string
}

export interface ContentAbout {
	seo?: SeoContent
}

export interface ContentRealisations {
	title_galery?: string
	btn_galery?: ButtonContent
	title_links?: string
}

export interface ContentWebsite {
	id: number
	attributes: {
		content_footer?: {
			content: string
			content_signature: string
		}
		cta?: {
			content: string
		}
		content_about?: ContentAbout
		content_realisations?: ContentRealisations
		createdAt: string
		updatedAt: string
		publishedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
		localizations?: {
			data: ContentWebsite[]
		}
		locale: string
	}
}

export interface Service {
	id: number
	attributes: {
		title: string
		description: string
		icon?: string
		rank?: number
		createdAt: string
		updatedAt: string
		publishedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
		localizations?: {
			data: Service[]
		}
		locale: string
	}
}

export interface About {
	id: number
	attributes: {
		content: string
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
		localizations?: {
			data: About[]
		}
		locale: string
	}
}

export interface Cgu {
	id: number
	attributes: {
		content: string
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
		localizations?: {
			data: Cgu[]
		}
		locale: string
	}
}

export interface NotFound {
	id: number
	attributes: {
		content: string
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
		localizations?: {
			data: NotFound[]
		}
		locale: string
	}
}

export type Locale = 'fr' | 'en'

// Utility types for handling API responses
export interface NotFoundResponse {
	notFound: true
	message?: string
}

export type ApiResponse<T> = StrapiResponse<T> | NotFoundResponse

// Type guard to check if response is a StrapiResponse
export function isStrapiResponse<T>(response: ApiResponse<T>): response is StrapiResponse<T> {
	return 'data' in response && !('notFound' in response)
}

// Type guard to check if response is a NotFoundResponse
export function isNotFoundResponse<T>(response: ApiResponse<T>): response is NotFoundResponse {
	return 'notFound' in response
}

// Safe accessor for response data
export function getResponseData<T>(response: ApiResponse<T>): T | null {
	if (isStrapiResponse(response)) {
		return response.data
	}
	return null
}

// Safe accessor for response attributes
export function getResponseAttributes<T extends { attributes: Record<string, unknown> }>(
	response: ApiResponse<T>
): T['attributes'] | null {
	const data = getResponseData(response)
	return data?.attributes ?? null
}
