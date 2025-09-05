import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { sprinkles } from '@/styles/sprinkles.css';

export const modalContentBox = style([
	sprinkles({ padding: 'spacing-500', gap: 'spacing-500'}),
	{
		display: 'flex',
		alignItems: 'start',
		flexDirection: 'column',
	
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
	height: '450px',
	borderBottom: `1px solid ${vars.semantic.color.border.default}`,
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
