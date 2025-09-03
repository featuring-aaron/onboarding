import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ style, ...props }, ref) => (
	<div
		ref={ref}
		style={{
			position: 'relative',
			display: 'flex',
			height: '40px',
			width: '40px',
			flexShrink: 0,
			overflow: 'hidden',
			borderRadius: '50%',
			...style,
		}}
		{...props}
	/>
));
Avatar.displayName = 'Avatar';

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(({ style, ...props }, ref) => (
	<img
		ref={ref}
		style={{
			aspectRatio: '1 / 1',
			height: '100%',
			width: '100%',
			objectFit: 'cover',
			...style,
		}}
		{...props}
	/>
));
AvatarImage.displayName = 'AvatarImage';

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(({ style, ...props }, ref) => (
	<div
		ref={ref}
		style={{
			display: 'flex',
			height: '100%',
			width: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '50%',
			backgroundColor: '#f3f4f6',
			fontSize: '14px',
			fontWeight: '500',
			color: '#6b7280',
			...style,
		}}
		{...props}
	/>
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
