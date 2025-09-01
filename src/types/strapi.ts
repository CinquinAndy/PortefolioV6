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

export interface UploadFile {
	id: number
	name: string
	alternativeText?: string
	caption?: string
	width: number
	height: number
	formats?: number
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl?: string
	provider: string
	provider_metadata?: Record<string, unknown>
	createdAt: string
	updatedAt: string
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

export interface Technology {
	id: number
	attributes: {
		label: string
		image?: {
			data: StrapiMedia
		}
		rank?: number
		createdAt: string
		updatedAt: string
		createdBy?: StrapiRelation
		updatedBy?: StrapiRelation
	}
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
		links?: Array<{
			id: number
			label: string
			url: string
		}>
		subtitle?: string
		type?: string
		rank?: number
		tags?: Array<{
			id: number
			name: string
		}>
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
		seo_title?: string
		seo_description?: string
		excerpt?: string
		image_presentation?: {
			data: StrapiMedia
		}
		galery?: {
			data: StrapiMedia[]
		}
		slug: string
		technologies?: {
			data: Array<{
				id: number
				attributes: {
					label: string
					image?: {
						data: StrapiMedia
					}
					rank?: number
					createdAt: string
					updatedAt: string
					createdBy?: StrapiRelation
					updatedBy?: StrapiRelation
				}
			}>
		}
		links?: Array<{
			id: number
			label: string
			url: string
		}>
		subtitle?: string
		type?: string
		rank?: number
		techno?: Array<{
			id: number
			name: string
			icon?: {
				data: StrapiMedia
			}
		}>
		createdAt: string
		updatedAt: string
		publishedAt?: string
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

export interface SocialsComponent {
	linkedin?: string
	facebook?: string
	instagram?: string
	github?: string
	malt?: string
	email?: string
}

export interface ContactComponent {
	email?: string
	phone?: string
	address?: string
	langage?: string
}

export interface ContentHomeComponent {
	title_home?: string
	title_service?: string
	title_blog?: string
	title_realisation?: string
	link?: Array<{
		id: number
		label: string
		url: string
	}>
	seo?: SeoContent
	title_vertical_left_1?: string
	title_vertical_left_2?: string
	title_vertical_left_3?: string
	title_vertical_left_4?: string
	title_vertical_left_5?: string
	title_vertical_left_6?: string
}

export interface ContentServiceComponent {
	seo?: SeoContent
}

export interface ContentRealisationsComponent {
	seo?: SeoContent
	title_galery?: string
	btn_galery?: ButtonContent
	title_links?: string
	title_content?: string
	title_technology?: string
}

export interface ContentBlogComponent {
	seo?: SeoContent
}

export interface ContentContactComponent {
	title?: string
	title_name?: string
	title_email?: string
	title_phone?: string
	title_company?: string
	title_content?: string
	error_name?: string
	error_email?: string
	error_phone?: string
	error_company?: string
	error_content?: string
	informative_message?: string
	btn_send?: string
	seo?: SeoContent
	toast_error?: string
	toast_success?: string
}

export interface ContentAboutComponent {
	seo?: SeoContent
}

export interface ContentCguComponent {
	seo?: SeoContent
}

export interface ContentNotFoundComponent {
	seo?: SeoContent
}

export interface ContentFooterComponent {
	image?: {
		data: StrapiMedia
	}
	content?: string
	title_sitemap?: string
	title_legals?: string
	content_signature?: string
}

export interface CtaComponent {
	title?: string
	content?: string
	link?: ButtonContent
}

export interface ContentWebsite {
	id: number
	attributes: {
		// Social media links
		socials?: SocialsComponent

		// Navigation menu
		menu?: Array<{
			id: number
			Link: LinkComponent
		}>

		// Contact information
		contact?: ContactComponent

		// Page-specific content
		content_home?: ContentHomeComponent
		content_footer?: ContentFooterComponent
		content_service?: ContentServiceComponent
		content_realisations?: ContentRealisationsComponent
		content_blog?: ContentBlogComponent
		content_contact?: ContentContactComponent
		content_cgu?: ContentCguComponent
		content_about?: ContentAboutComponent
		content_notfound?: ContentNotFoundComponent
		content_popup?: string

		// Site navigation structure
		Sitemap?: Array<{
			id: number
			Link: LinkComponent
			categorie?: string
		}>

		// Call-to-action component
		cta?: CtaComponent

		// Standard Strapi fields
		createdAt: string
		updatedAt: string
		publishedAt?: string
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
		eyebrow?: string
		title: string
		description: string
		graphic?: {
			data: StrapiMedia
		}
		createdAt: string
		updatedAt: string
		publishedAt?: string
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
		link?: ButtonContent
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
export type ApiResponse<T> = StrapiResponse<T> | import('@/types/api').NotFoundResponse

// Type guard to check if response is a StrapiResponse
export function isStrapiResponse<T>(response: ApiResponse<T>): response is StrapiResponse<T> {
	return 'data' in response && !('notFound' in response)
}

// Type guard to check if response is a NotFoundResponse
export function isNotFoundResponse<T>(response: ApiResponse<T>): response is import('@/types/api').NotFoundResponse {
	return 'notFound' in response
}

// Safe accessor for response data
export function getResponseData<T>(response: ApiResponse<T>): T | undefined {
	if (isStrapiResponse(response)) {
		return response.data
	}
	return undefined
}

// Safe accessor for response attributes
export function getResponseAttributes<T extends { attributes: Record<string, unknown> }>(
	response: ApiResponse<T>
): T['attributes'] | undefined {
	const data = getResponseData(response)
	return data?.attributes ?? undefined
}
