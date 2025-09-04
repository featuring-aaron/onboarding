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
