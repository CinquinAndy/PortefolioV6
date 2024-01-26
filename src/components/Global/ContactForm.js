'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

export function ContactForm({ content_website }) {
	const schema = z
		.object({
			name: z.string().nonempty({
				message: content_website?.attributes?.content_contact?.error_name,
			}),
			email: z.string().nonempty({
				message: content_website?.attributes?.content_contact?.error_email,
			}),
			phone: z.string().nonempty({
				message: content_website?.attributes?.content_contact?.error_phone,
			}),
			company: z.string(),
			content: z.string().nonempty({
				message: content_website?.attributes?.content_contact?.error_content,
			}),
		})
		.required()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset, // pour réinitialiser le formulaire
	} = useForm({
		resolver: zodResolver(schema),
	})

	// Créez une nouvelle fonction pour gérer la soumission du formulaire
	const onSubmit = async data => {
		const response = await fetch('/api/sendMail', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				phone: data.phone,
				company: data.company,
				content: data.content,
			}),
		})

		if (response.ok) {
			toast(content_website?.attributes?.content_contact?.toast_success, {
				type: 'success',
				icon: '✅',
			})
			reset()
		} else {
			toast(content_website?.attributes?.content_contact?.toast_error, {
				type: 'error',
				icon: '⛔',
			})
		}
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="z-50 mx-auto my-32 max-w-xl px-4 sm:mt-20 md:px-0"
			>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-semibold leading-6 text-slate-50"
						>
							{content_website?.attributes?.content_contact?.title_name}
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="name"
								id="name"
								{...register('name', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
							/>
							{errors.name && (
								<p className={'mt-2 text-xs text-red-500/80'}>
									{errors.name.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-semibold leading-6 text-slate-50"
						>
							Email
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								{...register('email', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
							/>
						</div>
						{errors.email && (
							<p className={'mt-2 text-xs text-red-500/80'}>
								{errors.email.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-semibold leading-6 text-slate-50"
						>
							{content_website?.attributes?.content_contact?.title_phone}
						</label>
						<div className="relative mt-2.5">
							<input
								type="tel"
								name="phone"
								id="phone"
								{...register('phone', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
							/>
						</div>
						{errors.phone && (
							<p className={'mt-2 text-xs text-red-500/80'}>
								{errors.phone.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="company"
							className="block text-sm font-semibold leading-6 text-slate-50"
						>
							{content_website?.attributes?.content_contact?.title_company}
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="company"
								id="company"
								{...register('company', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
							/>
							{errors.company && (
								<p className={'mt-2 text-xs text-red-500/80'}>
									{errors.company.message}
								</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="content"
							className="block text-sm font-semibold leading-6 text-slate-50"
						>
							{content_website?.attributes?.content_contact?.title_content}
						</label>
						<div className="mt-2.5">
							<textarea
								name="content"
								id="content"
								rows={4}
								{...register('content', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
								defaultValue={''}
							/>
						</div>
						{errors.content && (
							<p className={'mt-2 text-xs text-red-500/80'}>
								{errors.content.message}
							</p>
						)}
					</div>
					<div className={'sm:col-span-2'}>
						<p className="text-sm leading-6 text-slate-300">
							{
								content_website?.attributes?.content_contact
									?.informative_message
							}
						</p>
					</div>
				</div>
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-indigo-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
					>
						{content_website?.attributes?.content_contact?.btn_send}
					</button>
				</div>
			</form>
		</div>
	)
}
