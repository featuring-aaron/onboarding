import { colors,spacing } from "@featuring-corp/design-tokens/tokens/global";
import { color, type SemanticBorderColor } from "@featuring-corp/design-tokens/tokens/semantic";
import { style } from "@vanilla-extract/css";



export const tableRow = style({
	
	height: '56px',
	selectors: {
	  '&:nth-child(odd)': { backgroundColor: colors.gray[10] },
	  '&:nth-child(even)': { backgroundColor: colors.white },
	},

});

export const tableCell = style({

	
	selectors: {
		'&:first-child': {
			borderRight: `1px solid ${color.border[2]}`, 
		},
	},
	borderRight: `1px solid ${color.border.default}`, 
});