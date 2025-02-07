const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import("tailwindcss").Config} */
module.exports = {
	darkMode: ['class'],
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
			body: ['Be Vietnam Pro"', 'sans-serif'],
			display: ['Noto Serif Display"', 'serif'],
		},
		screens: {
			sm: {
				raw: '(min-width: 640px) and (min-height: 575px)',
			},
			md: {
				raw: '(min-width: 768px) and (min-height: 650px)',
			},
			lg: {
				raw: '(min-width: 1024px) and (min-height: 650px)',
			},
			xl: {
				raw: '(min-width: 1280px) and (min-height: 650px)',
			},
			'2xl': {
				raw: '(min-width: 1536px) and (min-height: 650px)',
			},
		},
		extend: {
			colors: {
				andy_purple: {
					500: '#6c00a2',
				},
				andy_blue: {
					500: '#001152',
				},
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
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		addVariablesForColors,
		require('tailwindcss-animate'),
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
