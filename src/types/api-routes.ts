export interface ContactFormData {
	name: string
	email: string
	company: string
	phone: string
	content: string
}

export interface ApiResponse<T = unknown> {
	success: boolean
	data?: T
	message?: string
}

export interface MailgunResponse {
	id: string
	message: string
}
