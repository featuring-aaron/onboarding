import { colors,spacing } from '@featuring-corp/design-tokens/tokens/global';
import { style } from '@vanilla-extract/css';
import { NonBinary } from 'lucide-react';



export const segmentedControlGroupWrapper = style({
   width: '100%',
   display: 'flex',

   gap: spacing[100],
  
});

export const segmentedControlBox = style({ 
    padding: `${spacing[100]} ${spacing[800]}`,
    ':hover': {
        backgroundColor: colors.primary[20],
    },

});