import { style } from '@vanilla-extract/css';
import { spacing } from '@featuring-corp/design-tokens/tokens/global';

export const container = style({    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    padding: '0 32px',
    gap: spacing[200],
    height: '50px',
    borderBottom: '1px solid  rgb(222, 226, 230)',
});
export const modalContentHeaderBox = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    
});

export const modalContentFooterBox = style({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    gap: spacing[200],
});
export const modalContentWrapper = style({
    padding: `${spacing[500]} ${spacing[600]}`,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'start',
    justifyContent: 'space-between',

});
export const modalContentHeaderTitleBox = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: spacing[200],
});