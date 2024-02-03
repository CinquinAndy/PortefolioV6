import Image from 'next/image'

export function PopupMainCat(props) {
	return (
		<div
			className={
				'custom-popup user-select-none pointer-events-none fixed right-0 z-50 mr-10 flex cursor-pointer items-center justify-center'
			}
		>
			<div
				className={
					'relative flex h-full w-full items-center justify-center rounded-lg border-2 border-white bg-indigo-1100 px-8 py-2 text-lg font-semibold text-slate-50 shadow-lg transition-all duration-300'
				}
			>
				<Image
					src={'/assets/images/cute_avatar_cat.svg'}
					height={75}
					width={75}
					alt={'Cute cat saying hello'}
					className={'absolute bottom-[30px] left-0 -z-10'}
				/>
				<div className={'h-full w-full text-center'}>
					{props?.content_website?.attributes?.content_home?.popup_main_cat ||
						'Hello there!'}
				</div>
			</div>
		</div>
	)
}
