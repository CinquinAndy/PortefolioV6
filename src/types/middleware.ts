import type { NextRequest } from 'next/server'

export interface I18nConfig {
	serverSetCookie: 'always'
	locales: string[]
	defaultLocale: string
}

export interface MiddlewareRequest extends NextRequest {
	headers: NextRequest['headers'] & {
		get(name: string): string | null
		set(name: string, value: string): void
	}
}
