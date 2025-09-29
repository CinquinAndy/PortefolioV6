import formData from 'form-data'
import Mailgun from 'mailgun.js'
import type { NextApiRequest, NextApiResponse } from 'next'

interface ContactFormData {
	phone?: string
	name: string
	email: string
	content: string
	company?: string
}

interface ApiResponse {
	success: boolean
	message?: string
}

interface ContactRequest extends NextApiRequest {
	body: ContactFormData
}

// Type definitions for Mailgun
interface MailgunMessages {
	create(
		domain: string,
		data: {
			to: string
			text: string
			subject: string
			from: string
		}
	): Promise<unknown>
}

interface MailgunClient {
	messages: MailgunMessages
}

// Initialize Mailgun client

const mailgun = new Mailgun(formData) as {
	client(config: { username: string; key: string }): MailgunClient
}
const mg: MailgunClient = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY ?? '',
})

export default function handler(req: ContactRequest, res: NextApiResponse<ApiResponse>): void {
	if (req.method === 'POST') {
		const { phone, name, email, content, company } = req.body

		const mailgunDomain = process.env.MAILGUN_DOMAIN ?? ''
		if (!mailgunDomain.trim()) {
			res.status(500).json({ success: false, message: 'Mailgun domain not configured' })
			return
		}

		if (mg == null) {
			res.status(500).json({ success: false, message: 'Mailgun client not initialized' })
			return
		}

		mg.messages
			.create(mailgunDomain, {
				to: 'contact@andy-cinquin.fr',
				text: `
                Nom: ${name} \n
                Email: ${email} \n
                Company: ${company} \n
                Numéro de téléphone: ${phone} \n
                Message: ${content}
            `,
				subject: 'Nouveau message de contact',
				from: 'Andy Cinquin Website <contact@andy-cinquin.fr>',
			})
			.then(() => {
				res.status(200).json({ success: true })
			})
			.catch((error: unknown) => {
				console.error('Mailgun error:', error)
				res.status(500).json({ success: false, message: 'Failed to send email' })
			})
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}
