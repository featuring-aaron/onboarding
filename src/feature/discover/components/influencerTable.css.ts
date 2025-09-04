import { colors, spacing } from '@featuring-corp/design-tokens/tokens/global';
import { color, type SemanticBorderColor } from '@featuring-corp/design-tokens/tokens/semantic';
import { style } from '@vanilla-extract/css';

export const tableBodyRow = style({
	height: '86px',

	selectors: {
		'&:nth-child(odd)': { backgroundColor: colors.gray[10] },
		'&:nth-child(even)': { backgroundColor: colors.white },
	},
});
export const tableHeaderRow = style({

	height: '38px',
});
export const checkBox = style({
	width: '30px',
	height: '38px',
});

export const checkBoxBody = style([
	checkBox,
	{
		height: '56px',
	},
]);

export const tableCell = style({
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	selectors: {
		'&:first-child': {
			borderRight: `1px solid ${color.border[2]}`,
		},
	},
	borderRight: `1px solid ${color.border.default}`,
});
export const tableWrapper = style({
	width: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	overflowX: 'auto',
});

export const fixedArea = style({
	
	
	borderRight: '2px solid #d1d5db',
	backgroundColor: 'white',
	position: 'sticky',
	left: 0,
	
	zIndex: 10,
});

export const scrollArea = style({
	flex: 1,
	overflowX: 'auto',
	backgroundColor: 'white',
	minWidth: 0, // flex item이 축소될 수 있도록 함
});

export const tableContainer = style({
	display: 'flex',
	border: '1px solid #e5e7eb',
	width: '100%',
});

export const headerCell = style({
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	padding: '8px 12px',
	fontWeight: '600',
	fontSize: '12px',
	textTransform: 'uppercase',
	letterSpacing: '0.05em',
	color: '#6b7280',
	backgroundColor: '#f9fafb',
	borderBottom: '1px solid #e5e7eb',
});

export const bodyCell = style({

	
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	padding: '12px',
	fontSize: '14px',
	color: '#111827',
	borderBottom: '1px solid #e5e7eb',
});

export const fixedTable = style({
	width: '350px',
	minWidth: '350px',
	tableLayout: 'fixed',
});

export const scrollTable = style({
	width: '100%',
	minWidth: '800px', // 최소 너비 보장
	tableLayout: 'fixed',
});
