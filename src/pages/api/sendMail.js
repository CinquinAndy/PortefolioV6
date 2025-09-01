import { toast } from 'react-toastify'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY,
})

export default function handler(req, res) {
	if (req.method === 'POST') {
		mg.messages
			.create(process.env.MAILGUN_DOMAIN, {
				to: 'contact@andy-cinquin.fr',
				text: `
                Nom: ${req.body.name} \n
                Email: ${req.body.email} \n
                Company: ${req.body.company} \n
                Numéro de téléphone: ${req.body.phone} \n
                Message: ${req.body.content}
            `,
				subject: 'Nouveau message de contact',
				from: 'Andy Cinquin Website <contact@andy-cinquin.fr>',
			})
			.then(msg => { // eslint-disable-line no-unused-vars
				res.status(200).json({ success: true })
			})
			.catch(err => { // eslint-disable-line no-unused-vars
				toast('Une erreur est survenue, veuillez réessayer plus tard', {
					type: 'error',
					toastId: 'toast-alert',
					icon: '⛔',
				})
				res.status(500).json({ success: false })
			})
	} else {
		res.status(405).json({ message: 'Method not allowed' })
	}
}
