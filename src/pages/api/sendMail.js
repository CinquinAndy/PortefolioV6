import { toast } from 'react-toastify'

const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY,
})

export default function handler(req, res) {
	if (req.method === 'POST') {
		mg.messages
			.create(process.env.MAILGUN_DOMAIN, {
				from: 'Andy Cinquin Website <contact@andy-cinquin.fr>',
				to: 'contact@andy-cinquin.fr',
				subject: 'Nouveau message de contact',
				text: `
                Nom: ${req.body.name} \n
                Email: ${req.body.email} \n
                Company: ${req.body.company} \n
                Numéro de téléphone: ${req.body.phone} \n
                Message: ${req.body.content}
            `,
			})
			.then(msg => {
				res.status(200).json({ success: true })
			})
			.catch(err => {
				toast('Une erreur est survenue, veuillez réessayer plus tard', {
					type: 'error',
					icon: '⛔',
					toastId: 'toast-alert',
				})
				res.status(500).json({ success: false })
			})
	} else {
		res.status(405).json({ message: 'Method not allowed' })
	}
}
