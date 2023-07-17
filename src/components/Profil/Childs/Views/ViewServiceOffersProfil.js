import React, { useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { DescriptionPriceOffer } from '@/components/Profil/Childs/ServiceOffers/DescriptionPriceOffer'
import { OptionsOffers } from '@/components/Profil/Childs/ServiceOffers/OptionsOffers'

function ViewServiceOffersProfil(props) {
	const [user, setUser] = React.useState(null)

	useEffect(() => {
		if (props.user) {
			setUser(props.user)
		}
	}, [props.user])

	return (
		<div className={'flex w-full flex-col gap-4'}>
			<h2 className={'text-xl font-bold text-gray-700'}>
				Service(s) proposé(s)
			</h2>
			{user?.service_offers && (
				<Tab.Group>
					<Tab.List className={'flex h-full w-full justify-center py-4'}>
						{user?.service_offers?.length !== 0 &&
							user?.service_offers?.map((service_offer, index) => {
								return (
									<Tab
										key={index}
										className={
											'h-auto w-full border-b-2 border-gray-300/20 bg-gray-50/30 p-4 text-xs text-gray-600 hover:bg-gray-50/50 focus:outline-none ' +
											// 	aria selected
											' aria-selected:border-b-2 aria-selected:border-indigo-800  aria-selected:text-gray-900'
										}
									>
										{service_offer?.name}
									</Tab>
								)
							})}
					</Tab.List>
					<Tab.Panels>
						{user?.service_offers?.map((service_offer, index) => {
							return (
								<Tab.Panel key={index}>
									<div className={'flex flex-col gap-4 bg-white py-4'}>
										<div className={'flex flex-col'}>
											<h2
												className={
													'text-start text-lg font-bold text-indigo-900'
												}
												data-cy={'service-offer-name'}
											>
												{service_offer?.name}
											</h2>
										</div>
										<DescriptionPriceOffer
											serviceOffer={service_offer}
											index={null}
										/>
									</div>
									<div className={'flex w-full flex-col gap-2 py-2'}>
										<OptionsOffers serviceOffer={service_offer} />
									</div>
								</Tab.Panel>
							)
						})}
					</Tab.Panels>
				</Tab.Group>
			)}
		</div>
	)
}

export default ViewServiceOffersProfil
