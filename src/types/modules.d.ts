declare module 'special-card' {
	export interface HoloCardProps {
		className?: string
		children?: React.ReactNode
		height?: number
		width?: number
		imageShineSrc?: string
		imageSrc?: string
		radius?: number
	}

	export const HoloCard: React.ComponentType<HoloCardProps>
}

declare module 'mailgun.js' {
	export interface MailgunClientOptions {
		username: string
		key: string
	}

	export interface MailgunMessage {
		to: string
		from: string
		subject: string
		text?: string
		html?: string
	}

	export interface MailgunResponse {
		id: string
		message: string
	}

	export class Mailgun {
		constructor(formData: any)
		client(options: MailgunClientOptions): {
			messages: {
				create(domain: string, message: MailgunMessage): Promise<MailgunResponse>
			}
		}
	}

	export default Mailgun
}
