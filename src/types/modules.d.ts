declare module 'special-card' {
	export interface HoloCardProps {
		className?: string
		children?: React.ReactNode
		height?: number
		width?: number
		imageShineSrc?: string
		imageSrc?: string
		radius?: number
	}

	export const HoloCard: React.ComponentType<HoloCardProps>
}
