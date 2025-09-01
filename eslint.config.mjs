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
	'react-hooks/exhaustive-deps': 'off',
	'promise/always-return': 'off',
	'prettier/prettier': 'error',
	'no-only-tests/no-only-tests': 'error',
	'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
	'jsx-a11y/anchor-has-content': 'off',
	'jsx-a11y/alt-text': 'off',
	'@next/next/no-img-element': 'off',
}

// Configuration commune des règles perfectionist
const perfectionistRules = {
	'perfectionist/sort-objects': [
		'warn',
		{
			type: 'natural',
			order: 'desc',
		},
	],
	'perfectionist/sort-imports': [
		'error',
		{
			type: 'line-length',
			order: 'desc',
			newlinesBetween: 'always',
			internalPattern: ['@/app/.*', '@/components/.*', '@/lib/.*', '@/models/.*', '@/services/.*', '@/constants/.*'],
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
					react: ['react', 'react-*'],
					nanostores: '@nanostores/.*',
				},
				type: {
					react: 'react',
				},
			},
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
	reactHooks: reactHooksPlugin,
	perfectionist,
	'no-only-tests': noOnlyTestsPlugin,
	jsxA11y: jsxA11yPlugin,
}

// Options communes du parser
const baseParserOptions = {
	sourceType: 'module',
	ecmaVersion: 'latest',
	ecmaFeatures: { jsx: true },
}

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
	}, //	perfectionist.configs['recommended-natural'],
	eslintPluginPrettierRecommended,
	...queryPlugin.configs['flat/recommended'],
	promisePlugin.configs['flat/recommended'], // Configuration pour JavaScript
	{
		rules: {
			...baseRules,
			...perfectionistRules,
		},
		plugins: basePlugins,
		languageOptions: {
			parserOptions: baseParserOptions,
			parser: espree,
		},
		files: ['**/*.{js,jsx,mjs,cjs}'],
	}, // Configuration pour TypeScript
	{
		rules: {
			...baseRules,
			...perfectionistRules,
			// Règles TypeScript spécifiques
			...tsPlugin.configs.recommended.rules,
			...tsPlugin.configs['recommended-type-checked'].rules,
			'@typescript-eslint/strict-boolean-expressions': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			...basePlugins,
		},
		languageOptions: {
			parserOptions: {
				...baseParserOptions,
				project: './tsconfig.json',
			},
			parser: tsParser,
		},
		files: ['**/*.{ts,tsx}'],
	},
]

export default eslintConfig
