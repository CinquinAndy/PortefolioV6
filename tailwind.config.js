/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
	plugins: [require('@tailwindcss/forms')],
}
