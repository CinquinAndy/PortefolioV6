import React from 'react'

/**
 * Display the description and the price of a service offer -> pass the service offer as props
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function DescriptionPriceOffer(props) {
	const service_offer = props.serviceOffer

	return (
		<div className={'flex flex-col gap-4'}>
			<div
				data-cy={
					props.index === null
						? `service-offer-description`
						: `service-offer-description-${props.index}`
				}
			>
				{
					// display the user description
					// if \n is present, split the string and display each part in a new line
					service_offer?.description &&
						service_offer?.description?.split('\n').map((item, i) => {
							return (
								<p
									key={i}
									className={'border-l border-gray-300 pl-4 text-gray-700 '}
								>
									{item}
								</p>
							)
						})
				}
			</div>
			<div
				className={'flex w-full flex-col items-end justify-center gap-2'}
				data-cy={
					props.index === null
						? `service-offer-price`
						: `service-offer-price-${props.index}`
				}
			>
				{
					// display the price
					// if \n is present, split the string and display each part in a new line
					service_offer?.price &&
						service_offer?.price?.split('\n').map((item, i) => {
							return (
								<h3
									key={i}
									className={
										'text-md flex justify-end rounded-full bg-gray-50 px-3 py-2 text-right italic text-gray-500'
									}
								>
									{item}
								</h3>
							)
						})
				}
			</div>
		</div>
	)
}
