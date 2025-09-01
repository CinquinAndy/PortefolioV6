export interface FetchOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	headers?: Record<string, string>
	body?: string
	next?: {
		revalidate?: number
	}
}

export interface ApiError {
	message: string
	status?: number
	details?: any
}

export interface NotFoundResponse {
	notFound: boolean
}
