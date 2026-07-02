import type { NextRequest } from 'next/server'

// Re-use the library's own Config type so the middleware config stays in sync
// with what i18nRouter actually accepts (localeCookie, localeDetector, etc.)
export type { Config as I18nConfig } from 'next-i18n-router/dist/types'

export interface MiddlewareRequest extends NextRequest {
	headers: NextRequest['headers'] & {
		get(name: string): string | null
		set(name: string, value: string): void
	}
}
