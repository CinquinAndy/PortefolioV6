import Link from 'next/link'
import React from 'react'

export function Signature({ isPaddingActivated = true }) {
	const actualYear = new Date().getFullYear()
	return (
		<div
			className={
				'mx-auto flex w-full max-w-7xl py-20 ' +
				(isPaddingActivated ? 'px-4 md:px-8 2xl:px-0' : '')
			}
		>
			<p className={'mx-auto text-sm text-slate-200'}>
				© {actualYear} Andy Cinquin - Tous droits réservés - Developed &
				Designed with ❤️ &nbsp; - 🐝&nbsp;
				<Link
					className={'text-sm text-slate-200 underline'}
					href={'https://forhives.fr/'}
					target={'_blank'}
				>
					ForHives co-founders
				</Link>
			</p>
		</div>
	)
}
