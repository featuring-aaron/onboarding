import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ variant = 'default', style, ...props }, ref) => {
	const baseStyle: React.CSSProperties = {
		display: 'inline-flex',
		alignItems: 'center',
		borderRadius: '9999px',
		border: '1px solid transparent',
		paddingLeft: '10px',
		paddingRight: '10px',
		paddingTop: '2px',
		paddingBottom: '2px',
		fontSize: '12px',
		fontWeight: '600',
		transition: 'all 0.2s',
		...style,
	};

	const variantStyles: Record<string, React.CSSProperties> = {
		default: {
			backgroundColor: '#3b82f6',
			color: 'white',
		},
		secondary: {
			backgroundColor: '#e5e7eb',
			color: '#1f2937',
		},
		destructive: {
			backgroundColor: '#ef4444',
			color: 'white',
		},
		outline: {
			backgroundColor: 'transparent',
			color: '#374151',
			borderColor: '#d1d5db',
		},
	};

	const combinedStyle = {
		...baseStyle,
		...variantStyles[variant],
	};

	return <div ref={ref} style={combinedStyle} {...props} />;
});
Badge.displayName = 'Badge';

export { Badge };
