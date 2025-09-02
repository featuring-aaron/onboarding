module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
		browser: true,
	},
	parserOptions: {
		ecmaVersion: 8,
		ecmaFeatures: {
			jsx: true,
			tsx: true,
		},
	},
	ignorePatterns: ['node_modules/*:', 'dist/*', '.next/*', 'orval/model/*', 'orval/endpoints/*'],
	extends: [
		'eslint:recommended',
		'next/core-web-vitals',
		'plugin:testing-library/react',
		'plugin:jest-dom/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		// 'plugin:import/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['testing-library', 'jest-dom', '@typescript-eslint', 'prettier', 'import', 'unused-imports'],
	rules: {
		semi: [2, 'always'],
		'prettier/prettier': [
			'error',
			{
				printWidth: 120,
			},
		],
		'import/order': [
			'warn',
			{
				groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'type', 'unknown'],
				pathGroups: [
					// {
					// 	pattern: '{react*,react*/**}',
					// 	group: 'external',
					// 	position: 'before',
					// },
					{
						pattern: '{src/config/**,@config/**}',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '{src/actions/**,@actions/**}',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '{src/helper/**,@helper/**}',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '{src/utils/**,@utils/**}',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '{src/hooks/**,@hooks/**}',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '{src/components/**,@components/**}',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '{src/pages/**,@pages/**}',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '{src/types/**,src/type/**,@type/**}',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: 'core/**',
						group: 'internal',
						position: 'after',
					},
				],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				pathGroupsExcludedImportTypes: [],
				'newlines-between': 'always-and-inside-groups',
			},
		],
		'testing-library/prefer-screen-queries': 'off', // Because We are using Playwright Page
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
		'@typescript-eslint/no-var-requires': 'off',
	},
};
