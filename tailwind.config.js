const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	safelist: [
		'fill-indigo-500',
		'fill-sky-500',
		'fill-lime-500',
		'fill-rose-500',
		'fill-amber-500',
		'fill-emerald-500',
		'fill-cyan-500',
		'fill-violet-500',
		'fill-fuchsia-500',
		'fill-orange-500',
		'fill-teal-500',
		'*:border-white',
		'border-white',
	],
	theme: {
		fontFamily: {
			body: ['"Be Vietnam Pro"', 'sans-serif'],
			display: ['"Noto Serif Display"', 'serif'],
		},
		extend: {
			colors: {
				sky: {
					1000: '#042C44',
					1100: '#011623',
				},
				indigo: {
					1000: '#1E1C5E',
					1100: '#0D0C3C',
				},
				neutral: {
					1000: '#0F0F0F',
					1100: '#080808',
				},
				slate: {
					1000: '#0D1321',
					1100: '#090D16',
				},
			},
			brightness: {
				10: '.10',
				25: '.25',
			},
			spacing: {
				112: '28rem',
				128: '32rem',
			},
			borderWidth: {
				20: '20px',
				40: '40px',
			},
			skew: {
				17: '17deg',
				20: '20deg',
				24: '24deg',
				28: '28deg',
				30: '30deg',
				32: '32deg',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		addVariablesForColors,
	],
}

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme('colors'))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)

	addBase({
		':root': newVars,
	})
}
