import reactHooksPlugin from 'eslint-plugin-react-hooks'

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests'
import queryPlugin from '@tanstack/eslint-plugin-query'
import perfectionist from 'eslint-plugin-perfectionist'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import promisePlugin from 'eslint-plugin-promise'
import tsParser from '@typescript-eslint/parser'
import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import * as espree from 'espree'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

// Configuration commune des règles (Next.js rules are included by compat.extends)
const baseRules = {
	'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
	'no-only-tests/no-only-tests': 'error',
	'react-hooks/exhaustive-deps': 'off',
	'jsx-a11y/anchor-has-content': 'off',
	'@next/next/no-img-element': 'off',
	'promise/always-return': 'off',
	'prettier/prettier': 'error',
	'jsx-a11y/alt-text': 'off',
}

// Configuration commune des règles perfectionist
const perfectionistRules = {
	'perfectionist/sort-imports': [
		'error',
		{
			groups: [
				'type',
				'react',
				'nanostores',
				['builtin', 'external'],
				'internal-type',
				'internal',
				['parent-type', 'sibling-type', 'index-type'],
				['parent', 'sibling', 'index'],
				'side-effect',
				'style',
				'object',
				'unknown',
			],
			customGroups: {
				value: {
					nanostores: '@nanostores/.*',
					react: ['react', 'react-*'],
				},
				type: {
					react: 'react',
				},
			},
			internalPattern: [
				'@/app/.*',
				'@/components/.*',
				'@/lib/.*',
				'@/models/.*',
				'@/services/.*',
				'@/constants/.*',
			],
			newlinesBetween: 'always',
			type: 'line-length',
			order: 'desc',
		},
	],
	'perfectionist/sort-objects': [
		'warn',
		{
			type: 'natural',
			order: 'desc',
		},
	],
	'perfectionist/sort-enums': [
		'error',
		{
			type: 'natural',
			order: 'desc',
		},
	],
}

// Plugins communs (without @next/next as it's already included by compat.extends)
const basePlugins = {
	'no-only-tests': noOnlyTestsPlugin,
	reactHooks: reactHooksPlugin,
	jsxA11y: jsxA11yPlugin,
	perfectionist,
}

// Options communes du parser
const baseParserOptions = {
	ecmaFeatures: { jsx: true },
	ecmaVersion: 'latest',
	sourceType: 'module',
}

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'next-env.d.ts',
		],
	}, //	perfectionist.configs['recommended-natural'],
	eslintPluginPrettierRecommended,
	...queryPlugin.configs['flat/recommended'],
	promisePlugin.configs['flat/recommended'], // Configuration pour JavaScript
	{
		languageOptions: {
			parserOptions: baseParserOptions,
			parser: espree,
		},
		rules: {
			...baseRules,
			...perfectionistRules,
		},
		files: ['**/*.{js,jsx,mjs,cjs}'],
		plugins: basePlugins,
	}, // Configuration pour TypeScript
	{
		rules: {
			...baseRules,
			...perfectionistRules,
			// Règles TypeScript spécifiques
			...tsPlugin.configs.recommended.rules,
			...tsPlugin.configs['recommended-type-checked'].rules,
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/strict-boolean-expressions': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
		},
		languageOptions: {
			parserOptions: {
				...baseParserOptions,
				project: './tsconfig.json',
			},
			parser: tsParser,
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			...basePlugins,
		},
		files: ['**/*.{ts,tsx}'],
	},
]

export default eslintConfig
