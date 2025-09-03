import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'ghost' | 'secondary' | 'destructive';
	size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = 'default', size = 'default', style, ...props }, ref) => {
		const baseStyle: React.CSSProperties = {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '6px',
			fontSize: '14px',
			fontWeight: '500',
			border: 'none',
			cursor: 'pointer',
			transition: 'all 0.2s',
			...style,
		};

		const variantStyles: Record<string, React.CSSProperties> = {
			default: {
				backgroundColor: '#3b82f6',
				color: 'white',
			},
			ghost: {
				backgroundColor: 'transparent',
				color: '#374151',
			},
			secondary: {
				backgroundColor: '#e5e7eb',
				color: '#1f2937',
			},
			destructive: {
				backgroundColor: '#ef4444',
				color: 'white',
			},
		};

		const sizeStyles: Record<string, React.CSSProperties> = {
			default: {
				height: '40px',
				paddingLeft: '16px',
				paddingRight: '16px',
				paddingTop: '8px',
				paddingBottom: '8px',
			},
			sm: {
				height: '32px',
				paddingLeft: '12px',
				paddingRight: '12px',
				paddingTop: '4px',
				paddingBottom: '4px',
			},
			lg: {
				height: '48px',
				paddingLeft: '32px',
				paddingRight: '32px',
				paddingTop: '12px',
				paddingBottom: '12px',
			},
		};

		const combinedStyle = {
			...baseStyle,
			...variantStyles[variant],
			...sizeStyles[size],
		};

		return <button style={combinedStyle} ref={ref} {...props} />;
	},
);
Button.displayName = 'Button';

export { Button };
