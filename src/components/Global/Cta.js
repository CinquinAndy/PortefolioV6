import { Layout } from '@/components/Global/Layout'
import { replaceTitle } from '@/services/utils'
import Link from 'next/link'

function Cta({ content_website }) {
	return (
		<section className="w-full p-4 md:p-20">
			<div className="shadow-innercustom relative mt-[100px] flex items-center justify-center rounded bg-slate-1000 p-12  xl:p-20">
				<div>
					<div className="flex w-full items-center justify-center">
						<h2
							className="text-center text-xl font-bold xl:text-3xl [&>*]:text-xl [&>*]:font-bold xl:[&>*]:text-3xl"
							dangerouslySetInnerHTML={{
								__html: replaceTitle(content_website?.attributes?.cta?.title),
							}}
						/>
					</div>
					<div className="py-8 text-center text-sm xl:py-10 xl:text-sm">
						<Layout
							className={'prose-xs flex flex-col gap-4'}
							value={content_website?.attributes?.cta?.content.toString()}
						/>
					</div>
					<div className="flex items-center justify-center">
						<Link
							href={content_website?.attributes?.cta?.link?.url}
							className="button-purple rounded px-6 py-3 text-xs xl:px-10 xl:py-4 xl:text-sm"
						>
							<span className={'button-purple-title'}>
								{content_website?.attributes?.cta?.link?.label}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Cta
