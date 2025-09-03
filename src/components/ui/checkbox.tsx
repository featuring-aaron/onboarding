import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ onCheckedChange, onChange, style, ...props }, ref) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(e);
			onCheckedChange?.(e.target.checked);
		};

		const checkboxStyle: React.CSSProperties = {
			height: '16px',
			width: '16px',
			borderRadius: '4px',
			border: '1px solid #d1d5db',
			accentColor: '#3b82f6',
			cursor: 'pointer',
			...style,
		};

		return <input type="checkbox" style={checkboxStyle} ref={ref} onChange={handleChange} {...props} />;
	},
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
