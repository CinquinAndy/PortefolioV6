import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Pagination } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

function ViewPortfolioProfil(props) {
	const [mySwiper, setMySwiper] = React.useState(null)

	const [user, setUser] = React.useState(null)
	const [imageGallery, setImageGallery] = React.useState([])

	useEffect(() => {
		if (props.user) {
			setUser(props.user)
			// check if user.image_gallery.data property exists
			if (user?.image_gallery?.data === undefined) {
				setImageGallery(user?.image_gallery)
			} else {
				// array to object conversion, {id: x, attributes: {...}} to {...} for each element
				setImageGallery(
					user?.image_gallery?.data?.map(image => image.attributes)
				)
			}
		}
	}, [props.user, user?.image_gallery])

	return (
		<div className={'flex w-full flex-col gap-4'}>
			<h2 className={'text-xl font-bold text-gray-700'}>Portfolio</h2>
			<>
				<Swiper
					slidesPerView={'auto'}
					spaceBetween={32}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="h-[500px] w-full"
					loop={true}
					onInit={ev => {
						setMySwiper(ev)
					}}
				>
					{
						// 	map on user?.image_gallery and return a SwiperSlide with the image
					}
					{imageGallery &&
						imageGallery?.length !== 0 &&
						imageGallery.map((image, index) => {
							return (
								<SwiperSlide
									key={index}
									style={{
										aspectRatio: `${image?.width}/${image?.height}`,
										height: '100%',
									}}
									className={'!h-[500px] !w-auto'}
								>
									<Image
										src={image?.url}
										alt={image?.alternativeText ?? image?.name}
										fill={true}
										sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw"
										className={'rounded object-cover'}
									/>
								</SwiperSlide>
							)
						})}
				</Swiper>
			</>
			{/* btn to go on next slide */}
			<div className={'flex w-full items-center justify-between'}>
				<div>
					<button
						className={'flex items-center justify-center gap-2'}
						onClick={() => {
							mySwiper.slidePrev()
						}}
					>
						<Image
							alt={'next'}
							src={'/assets/down-arrow.svg'}
							className={'rotate-90'}
							width={20}
							height={20}
						></Image>
						<span className={'font-semibold text-indigo-950'}>Précédent</span>
					</button>
				</div>
				<div>
					<button
						className={'flex items-center justify-center gap-2'}
						onClick={() => {
							mySwiper.slideNext()
						}}
					>
						<span className={'font-semibold text-indigo-950'}>Suivant</span>
						<Image
							alt={'next'}
							src={'/assets/down-arrow.svg'}
							className={'-rotate-90'}
							width={20}
							height={20}
						></Image>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ViewPortfolioProfil
