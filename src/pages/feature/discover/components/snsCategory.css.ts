import { colors,spacing } from '@featuring-corp/design-tokens/tokens/global';
import { style } from '@vanilla-extract/css';



export const segmentedControlGroupWrapper = style({
   width: '100%',
   display: 'flex',
   padding: `${spacing[100]} ${spacing[800]}`,
   gap: spacing[100],
   
});

export const segmentedControlBox = style({ 
    ':hover': {
        backgroundColor: colors.primary[20],
    },

});