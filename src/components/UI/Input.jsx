import { useId } from 'react';

export default function Input({ label, name, ...props }) {
	const id = useId();
	return (
		<p className='control'>
			<label htmlFor={id}>{label}</label>
			<input id={id} name={name} {...props} required />
		</p>
	);
}
