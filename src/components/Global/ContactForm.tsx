'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { ContentWebsite } from '@/types/strapi'
import { z } from 'zod'

interface ContactFormProps {
	content_website?: ContentWebsite
}

export function ContactForm({ content_website }: ContactFormProps): React.JSX.Element {
	const schema = z.object({
		phone: z.string().min(1, {
			message: content_website?.attributes?.content_contact?.error_phone,
		}),
		name: z.string().min(1, {
			message: content_website?.attributes?.content_contact?.error_name,
		}),
		email: z.string().email({
			message: content_website?.attributes?.content_contact?.error_email,
		}),
		content: z.string().min(1, {
			message: content_website?.attributes?.content_contact?.error_content,
		}),
		company: z.string(),
	})

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	})

	const onSubmit = async (data: { phone: string; name: string; email: string; content: string; company: string }) => {
		const response = await fetch('/api/sendMail', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				phone: data.phone,
				name: data.name,
				email: data.email,
				content: data.content,
				company: data.company,
			}),
		})

		if (response.ok) {
			toast(content_website?.attributes?.content_contact?.toast_success, {
				type: 'success',
			})
			reset()
		} else {
			toast(content_website?.attributes?.content_contact?.toast_error, {
				type: 'error',
			})
		}
	}

	return (
		<div>
			<form className="z-50 mx-auto my-32 max-w-xl px-4 sm:mt-20 md:px-0" onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label className="block text-sm font-semibold leading-6 text-slate-50" htmlFor="name">
							{content_website?.attributes?.content_contact?.title_name}
						</label>
						<div className="mt-2.5">
							<input
								id="name"
								type="text"
								{...register('name', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
							/>
							{errors.name && <p className={'mt-2 text-xs text-red-500/80'}>{String(errors.name.message)}</p>}
						</div>
					</div>
					<div>
						<label className="block text-sm font-semibold leading-6 text-slate-50" htmlFor="email">
							Email
						</label>
						<div className="mt-2.5">
							<input
								id="email"
								type="email"
								{...register('email', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
							/>
						</div>
						{errors.email && <p className={'mt-2 text-xs text-red-500/80'}>{String(errors.email.message)}</p>}
					</div>
					<div>
						<label className="block text-sm font-semibold leading-6 text-slate-50" htmlFor="phone">
							{content_website?.attributes?.content_contact?.title_phone}
						</label>
						<div className="relative mt-2.5">
							<input
								id="phone"
								type="tel"
								{...register('phone', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
							/>
						</div>
						{errors.phone && <p className={'mt-2 text-xs text-red-500/80'}>{String(errors.phone.message)}</p>}
					</div>
					<div>
						<label className="block text-sm font-semibold leading-6 text-slate-50" htmlFor="company">
							{content_website?.attributes?.content_contact?.title_company}
						</label>
						<div className="mt-2.5">
							<input
								id="company"
								type="text"
								{...register('company', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
							/>
							{errors.company && <p className={'mt-2 text-xs text-red-500/80'}>{String(errors.company.message)}</p>}
						</div>
					</div>
					<div className="sm:col-span-2">
						<label className="block text-sm font-semibold leading-6 text-slate-50" htmlFor="content">
							{content_website?.attributes?.content_contact?.title_content}
						</label>
						<div className="mt-2.5">
							<textarea
								id="content"
								rows={4}
								{...register('content', {
									required: true,
								})}
								className="block w-full rounded-md border-0 bg-slate-1000 px-3.5 py-2 text-slate-50 shadow-sm ring-1 ring-inset ring-slate-900 placeholder:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
								defaultValue={''}
							/>
						</div>
						{errors.content && <p className={'mt-2 text-xs text-red-500/80'}>{String(errors.content.message)}</p>}
					</div>
					<div className={'sm:col-span-2'}>
						<p className="text-sm leading-6 text-slate-300">
							{content_website?.attributes?.content_contact?.informative_message}
						</p>
					</div>
				</div>
				<div className="mt-10">
					<button
						className="block w-full rounded-md bg-indigo-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
						type="submit"
					>
						{content_website?.attributes?.content_contact?.btn_send}
					</button>
				</div>
			</form>
		</div>
	)
}
