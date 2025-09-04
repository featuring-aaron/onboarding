import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';
import { sprinkles } from '@/styles/sprinkles.css';

export const segmentedControlGroupWrapper = style({
	width: '100%',
	display: 'flex',

	gap: vars.global.spacing[100],
});
export const segmentedControlGroup = style([
	sprinkles({ paddingY: 'spacing-100', paddingX: 'spacing-800' }),
	{
		width: '100%',
	},
]);

export const segmentedControlBox = style([
	sprinkles({ padding: 'spacing-100', paddingX: 'spacing-800' }),
	{
		fontSize: vars.semantic.typography.heading[2].fontSize,
		fontWeight: vars.semantic.typography.heading[2].fontWeight,
		lineHeight: vars.semantic.typography.heading[2].lineHeight,
		':hover': {
			backgroundColor: vars.global.colors.primary[20],
		},
	},
]);
