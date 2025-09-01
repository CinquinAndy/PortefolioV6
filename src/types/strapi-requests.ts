import type { Locale, LinkComponent, TagComponent, TechnologyComponent } from './strapi'

// Article Request Types
export interface CreateArticleRequest {
	data: {
		title: string
		content: string
		seo_title?: string
		seo_description?: string
		slug: string
		excerpt?: string
		image_presentation?: number | string
		galery?: (number | string)[]
		links?: LinkComponent[]
		subtitle?: string
		type?: string
		rank?: number
		featured?: boolean
		tags?: TagComponent[]
		locale: Locale
	}
}

export interface UpdateArticleRequest {
	data: Partial<CreateArticleRequest['data']>
}

// Realisation Request Types
export interface CreateRealisationRequest {
	data: {
		title: string
		content: string
		slug: string
		seo_title?: string
		seo_description?: string
		excerpt?: string
		subtitle?: string
		type?: string
		rank?: number
		featured?: boolean
		image?: number | string
		galery?: (number | string)[]
		technologies?: TechnologyComponent[]
		links?: LinkComponent[]
		tags?: TagComponent[]
		locale: Locale
	}
}

export interface UpdateRealisationRequest {
	data: Partial<CreateRealisationRequest['data']>
}

// ContentWebsite Request Types
export interface UpdateContentWebsiteRequest {
	data: {
		content_footer?: {
			content?: string
			content_signature?: string
		}
		cta?: {
			content?: string
		}
		content_about?: {
			seo?: {
				title?: string
				description?: string
				canonical?: string
				h1?: string
			}
		}
		content_realisations?: {
			title_galery?: string
			btn_galery?: {
				label?: string
				url?: string
			}
			title_links?: string
		}
		locale: Locale
	}
}

// Service Request Types
export interface CreateServiceRequest {
	data: {
		title: string
		description: string
		icon?: string
		rank?: number
		locale: Locale
	}
}

export interface UpdateServiceRequest {
	data: Partial<CreateServiceRequest['data']>
}

// About Request Types
export interface UpdateAboutRequest {
	data: {
		content?: string
		locale: Locale
	}
}

// CGU Request Types
export interface UpdateCguRequest {
	data: {
		content?: string
		locale: Locale
	}
}

// NotFound Request Types
export interface UpdateNotFoundRequest {
	data: {
		content?: string
		locale: Locale
	}
}

// Common Query Parameters
export interface StrapiQueryParams {
	populate?: string | string[]
	filters?: Record<string, unknown>
	sort?: string | string[]
	pagination?: {
		page?: number
		pageSize?: number
		start?: number
		limit?: number
	}
	locale?: Locale
	publicationState?: 'live' | 'preview'
}

// Search Parameters
export interface SearchParams extends StrapiQueryParams {
	query?: string
	fields?: string[]
}

// Bulk Operations
export interface BulkOperationResponse {
	count: number
}

export interface BulkDeleteRequest {
	ids: number[]
}
