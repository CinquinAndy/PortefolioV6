import type {
	Article,
	Realisation,
	Service,
	About,
	Cgu,
	NotFound,
	ContentWebsite,
	Locale,
	StrapiResponse,
} from '@/types/strapi'
import type { NotFoundResponse } from '@/types/api'
import type {
	CreateArticleRequest,
	UpdateArticleRequest,
	CreateRealisationRequest,
	UpdateRealisationRequest,
	CreateServiceRequest,
	UpdateServiceRequest,
	UpdateAboutRequest,
	UpdateCguRequest,
	UpdateNotFoundRequest,
	UpdateContentWebsiteRequest,
	StrapiQueryParams,
	BulkOperationResponse,
	BulkDeleteRequest,
} from '@/types/strapi-requests'

/**
 * Generic CRUD operations for Strapi entities
 */

// Generic fetch with query parameters
export async function fetchWithParams<T = unknown>(
	endpoint: string,
	params?: StrapiQueryParams
): Promise<T | NotFoundResponse> {
	const queryParams = new URLSearchParams()

	if (params) {
		if (params.populate) {
			queryParams.append('populate', Array.isArray(params.populate) ? params.populate.join(',') : params.populate)
		}
		if (params.sort) {
			queryParams.append('sort', Array.isArray(params.sort) ? params.sort.join(',') : params.sort)
		}
		if (params.locale) {
			queryParams.append('locale', params.locale)
		}
		if (params.publicationState) {
			queryParams.append('publicationState', params.publicationState)
		}
		if (params.pagination) {
			Object.entries(params.pagination).forEach(([key, value]) => {
				queryParams.append(`pagination[${key}]`, value.toString())
			})
		}
		if (params.filters) {
			Object.entries(params.filters).forEach(([key, value]) => {
				if (typeof value === 'object') {
					Object.entries(value).forEach(([operator, operatorValue]) => {
						queryParams.append(`filters[${key}][${operator}]`, String(operatorValue))
					})
				} else {
					queryParams.append(`filters[${key}]`, String(value))
				}
			})
		}
	}

	const url = `${endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
				Accept: 'application/json',
			},
		})

		if (!res.ok) {
			console.error(`API Error: ${res.status} ${res.statusText}`)
			return { notFound: true }
		}

		return (await res.json()) as T
	} catch (error) {
		console.error('Fetch API Error:', error)
		return { notFound: true }
	}
}

// Generic create operation
export async function createEntity<TRequest, TResponse>(
	endpoint: string,
	data: TRequest
): Promise<StrapiResponse<TResponse> | NotFoundResponse> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!res.ok) {
			console.error(`API Error: ${res.status} ${res.statusText}`)
			return { notFound: true }
		}

		return (await res.json()) as StrapiResponse<TResponse>
	} catch (error) {
		console.error('Create API Error:', error)
		return { notFound: true }
	}
}

// Generic update operation
export async function updateEntity<TRequest, TResponse>(
	endpoint: string,
	id: number,
	data: TRequest
): Promise<StrapiResponse<TResponse> | NotFoundResponse> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!res.ok) {
			console.error(`API Error: ${res.status} ${res.statusText}`)
			return { notFound: true }
		}

		return (await res.json()) as StrapiResponse<TResponse>
	} catch (error) {
		console.error('Update API Error:', error)
		return { notFound: true }
	}
}

// Generic delete operation
export async function deleteEntity(endpoint: string, id: number): Promise<StrapiResponse<{}> | NotFoundResponse> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
				Accept: 'application/json',
			},
		})

		if (!res.ok) {
			console.error(`API Error: ${res.status} ${res.statusText}`)
			return { notFound: true }
		}

		return (await res.json()) as StrapiResponse<{}>
	} catch (error) {
		console.error('Delete API Error:', error)
		return { notFound: true }
	}
}

// Bulk delete operation
export async function bulkDeleteEntities(
	endpoint: string,
	data: BulkDeleteRequest
): Promise<BulkOperationResponse | NotFoundResponse> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/bulk-delete`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!res.ok) {
			console.error(`API Error: ${res.status} ${res.statusText}`)
			return { notFound: true }
		}

		return (await res.json()) as BulkOperationResponse
	} catch (error) {
		console.error('Bulk Delete API Error:', error)
		return { notFound: true }
	}
}

// Article CRUD operations
export const ArticleCRUD = {
	create: (data: CreateArticleRequest) => createEntity<CreateArticleRequest, Article>('api/articles', data),
	update: (id: number, data: UpdateArticleRequest) =>
		updateEntity<UpdateArticleRequest, Article>('api/articles', id, data),
	delete: (id: number) => deleteEntity('api/articles', id),
	bulkDelete: (data: BulkDeleteRequest) => bulkDeleteEntities('api/articles', data),
}

// Realisation CRUD operations
export const RealisationCRUD = {
	create: (data: CreateRealisationRequest) =>
		createEntity<CreateRealisationRequest, Realisation>('api/realisations', data),
	update: (id: number, data: UpdateRealisationRequest) =>
		updateEntity<UpdateRealisationRequest, Realisation>('api/realisations', id, data),
	delete: (id: number) => deleteEntity('api/realisations', id),
	bulkDelete: (data: BulkDeleteRequest) => bulkDeleteEntities('api/realisations', data),
}

// Service CRUD operations
export const ServiceCRUD = {
	create: (data: CreateServiceRequest) => createEntity<CreateServiceRequest, Service>('api/services', data),
	update: (id: number, data: UpdateServiceRequest) =>
		updateEntity<UpdateServiceRequest, Service>('api/services', id, data),
	delete: (id: number) => deleteEntity('api/services', id),
	bulkDelete: (data: BulkDeleteRequest) => bulkDeleteEntities('api/services', data),
}

// Content Website operations
export const ContentWebsiteCRUD = {
	update: (id: number, data: UpdateContentWebsiteRequest) =>
		updateEntity<UpdateContentWebsiteRequest, ContentWebsite>('api/content-website', id, data),
}

// About operations
export const AboutCRUD = {
	update: (id: number, data: UpdateAboutRequest) =>
		updateEntity<UpdateAboutRequest, About>('api/about', id, data),
}

// CGU operations
export const CguCRUD = {
	update: (id: number, data: UpdateCguRequest) => updateEntity<UpdateCguRequest, Cgu>('api/cgu', id, data),
}

// NotFound operations
export const NotFoundCRUD = {
	update: (id: number, data: UpdateNotFoundRequest) =>
		updateEntity<UpdateNotFoundRequest, NotFound>('api/not-found', id, data),
}