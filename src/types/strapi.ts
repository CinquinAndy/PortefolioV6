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
	attributes: Record<string, any>
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
		provider_metadata?: any
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

export interface Article {
	id: number
	attributes: {
		title: string
		content: string
		slug: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		rank?: number
		image?: {
			data: StrapiMedia
		}
		tags?: {
			data: StrapiEntity[]
		}
	}
}

export interface Realisation {
	id: number
	attributes: {
		title: string
		content: string
		slug: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		rank?: number
		image?: {
			data: StrapiMedia
		}
		galery?: {
			data: StrapiMedia[]
		}
		technologies?: {
			data: StrapiEntity[]
		}
	}
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
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
	}
}

export interface Service {
	id: number
	attributes: {
		title: string
		description: string
		icon?: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		rank?: number
	}
}

export interface About {
	id: number
	attributes: {
		content: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
	}
}

export interface Cgu {
	id: number
	attributes: {
		content: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
	}
}

export interface NotFound {
	id: number
	attributes: {
		content: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
	}
}

export type Locale = 'fr' | 'en'
