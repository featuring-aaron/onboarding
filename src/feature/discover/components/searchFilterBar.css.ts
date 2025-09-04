import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { sprinkles } from '@/styles/sprinkles.css';
export const container = style([
	sprinkles({ gap: 'spacing-200', paddingX: 'spacing-800' }),
	{
		gap: vars.global.spacing[200],
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
		height: 50,
		borderBottom: '1px solid  rgb(222, 226, 230)',
	},
]);
export const modalContentBox = style([
	sprinkles({ padding: 'spacing-500' }),
	{
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: 300,
		height: '100%',
		borderRight: `1px solid ${vars.semantic.color.border.default}`,
		selectors: {
			'&:nth-child(2)': {
				borderRight: `1px solid ${vars.semantic.color.border.default}`,
				borderLeft: `1px solid ${vars.semantic.color.border.default}`,
			},
		},
	},
]);

export const modalContentFooterBox = style([
	sprinkles({ gap: 'spacing-200' }),
	{
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
	},
]);

export const modalContentWrapper = style({
	display: 'flex',
	height: '100%',
});
export const modalContentHeaderTitleBox = style([
	sprinkles({ gap: 'spacing-200' }),
	{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
	},
]);

export const closeButton = style({
	position: 'absolute',
	right: vars.global.spacing[400],
});
