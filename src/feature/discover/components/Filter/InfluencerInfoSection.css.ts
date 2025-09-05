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

export const modalContentHeaderTitleBox = style([
	sprinkles({ gap: 'spacing-200' }),
	{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
	},
]);

export const segmentedControlBox = style([
	sprinkles({ padding: 'spacing-100', paddingX: 'spacing-600' }),
	{
		fontSize: vars.semantic.typography.heading[2].fontSize,
		fontWeight: vars.semantic.typography.heading[2].fontWeight,
		lineHeight: vars.semantic.typography.heading[2].lineHeight,
		':hover': {
			backgroundColor: vars.global.colors.primary[20],
		},
	},
]);

export const followerRangeContainer = style({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	justifyContent: 'space-between',
	gap: '8px',
	width: '100%',
});

export const followerRangeButton = style({
	width: '120px',
	justifySelf: 'end',
});

export const inputRangeContainer = style({
	display: 'flex',
	gap: '10px',
	alignItems: 'end',
});

export const rangeSeparator = style({
	fontSize: '16px',
	fontWeight: 'bold',
	marginBottom: '5px',
});

export const tooltipContainer = style({
	display: 'flex',
	gap: '2px',
	alignItems: 'start',
});
