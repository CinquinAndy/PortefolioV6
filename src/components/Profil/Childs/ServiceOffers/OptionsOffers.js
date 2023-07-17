import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { DescriptionPriceOffer } from '@/components/Profil/Childs/ServiceOffers/DescriptionPriceOffer'

/**
 * Display the options of a service offer -> pass the service offer as props
 * @param props
 * @constructor
 */
export function OptionsOffers(props) {
	const options = props.serviceOffer.options
	return (
		<div className={'flex w-full flex-col gap-2 py-2'}>
			{
				// display the user description
				// if \n is present, split the string and display each part in a new line
				options?.length !== 0 &&
					options?.map((option, index) => {
						return (
							<Disclosure key={index}>
								{({ open }) => (
									/* Use the `open` state to conditionally change the direction of an icon. */
									<>
										<Disclosure.Button
											className={
												'flex w-full items-center justify-between border-t border-gray-300 pt-6 ' +
												(open ? 'text-indigo-900' : 'pb-4 text-gray-700')
											}
											data-cy={`service-offer-name-${index}`}
										>
											{option.name}
											<ChevronRightIcon
												data-cy={`service-offer-button-${index}`}
												className={
													'h-5 w-5 ' + (open ? 'rotate-90 transform' : '')
												}
											/>
										</Disclosure.Button>
										<Disclosure.Panel>
											<div className={'pb-4'}>
												<DescriptionPriceOffer
													serviceOffer={option}
													index={index}
												/>
											</div>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						)
					})
			}
		</div>
	)
}
