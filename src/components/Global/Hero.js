import Image from 'next/image'
import Link from 'next/link'

export default function Hero({
	imgBackgroundSrc = 'assets/back.webp',
	isAlternativeDisplay = false,
}) {
	return <div className="relative bg-white 2xl:pt-[90px]"></div>
}
