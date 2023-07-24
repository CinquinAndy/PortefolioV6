import React from 'react'

function Cta(props) {
	return (
		<section className="w-full p-4 xl:p-20">
			<div className="shadow-innercustom relative mt-[100px] flex items-center justify-center rounded bg-slate-1000 p-12  xl:p-20">
				<div>
					<div className="flex w-full items-center justify-center">
						<h2 className="text-center text-xl font-bold xl:text-3xl">
							Développons{' '}
							<span className="font-display font-black text-indigo-500 xl:font-bold">
								ensemble
							</span>{' '}
							vos projets
						</h2>
					</div>
					<p className="py-8 text-center text-sm xl:py-10 xl:text-sm">
						Une idée, un projet ? Je suis là pour répondre à vos demandes et
						vous accompagner.
						<br />
						<br />
						N’hésitez pas, je serais ravi d’échanger avec vous sur votre projet
						!
					</p>
					<div className="flex items-center justify-center">
						<button
							onClick="location.href = '/contact'"
							className="rounded bg-indigo-600 px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							Me contacter
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Cta
