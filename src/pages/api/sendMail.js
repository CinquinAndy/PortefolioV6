import { toast } from 'react-toastify'

const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
	key: process.env.MAILGUN_API_KEY,
	username: 'api',
})

export default function handler(req, res) {
	if (req.method === 'POST') {
		mg.messages
			.create(process.env.MAILGUN_DOMAIN, {
				text: `
                Nom: ${req.body.name} \n
                Email: ${req.body.email} \n
                Company: ${req.body.company} \n
                Numéro de téléphone: ${req.body.phone} \n
                Message: ${req.body.content}
            `,
				from: 'Andy Cinquin Website <contact@andy-cinquin.fr>',
				subject: 'Nouveau message de contact',
				to: 'contact@andy-cinquin.fr',
			})
			.then(msg => {
				res.status(200).json({ success: true })
			})
			.catch(err => {
				toast('Une erreur est survenue, veuillez réessayer plus tard', {
					toastId: 'toast-alert',
					type: 'error',
					icon: '⛔',
				})
				res.status(500).json({ success: false })
			})
	} else {
		res.status(405).json({ message: 'Method not allowed' })
	}
}
