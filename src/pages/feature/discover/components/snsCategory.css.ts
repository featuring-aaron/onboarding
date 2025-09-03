import { colors, spacing } from '@featuring-corp/design-tokens/tokens/global';
import { style } from '@vanilla-extract/css';
import { typography } from '@featuring-corp/design-tokens/tokens/semantic';
import { NonBinary } from 'lucide-react';

export const segmentedControlGroupWrapper = style({
	width: '100%',
	display: 'flex',

	gap: spacing[100],
});
export const segmentedControlGroup = style({
	width: '100%',
	paddingTop: spacing[100],
	paddingBottom: spacing[100],
	paddingLeft: spacing[800],
	paddingRight: spacing[800],
});

export const segmentedControlBox = style({
	padding: `${spacing[100]} ${spacing[800]}`,
	fontSize: typography.heading[2].fontSize,
	fontWeight: typography.heading[2].fontWeight,
	lineHeight: typography.heading[2].lineHeight,
	':hover': {
		backgroundColor: colors.primary[20],
	},
});
