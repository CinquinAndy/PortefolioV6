import type { NextApiRequest, NextApiResponse } from 'next'
import { toast } from 'react-toastify'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import type { ContactFormData, ApiResponse } from '@/types/api-routes'

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY || '',
})

interface ContactRequest extends NextApiRequest {
	body: ContactFormData
}

export default function handler(
	req: ContactRequest,
	res: NextApiResponse<ApiResponse>
): void {
	if (req.method === 'POST') {
		const { name, email, company, phone, content } = req.body
		
		if (!process.env.MAILGUN_DOMAIN) {
			res.status(500).json({ success: false, message: 'Mailgun domain not configured' })
			return
		}

		mg.messages
			.create(process.env.MAILGUN_DOMAIN, {
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
			.catch((error) => {
				console.error('Mailgun error:', error)
				toast('An error occurred, please try again later', {
					type: 'error',
					toastId: 'toast-alert',
				})
				res.status(500).json({ success: false, message: 'Failed to send email' })
			})
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}