import React from 'react';

export default function Button({ children, textOnly, ...props }) {
	let className = textOnly ? 'text-button' : 'button';
	className += ' ' + className;
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
}
