import { useContext } from 'react';
import CartContext from '../store/CardContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import Input from './UI/Input.jsx';
import Modal from './UI/Modal.jsx';

export default function Checkout() {
	const { items } = useContext(CartContext);
	const { progress, hideCheckOut } = useContext(UserProgressContext);

	const cartTotal = items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	function handleCheckoutClose() {
		hideCheckOut();
	}

	function handleSubmit(e) {
		e.preventDefault();

		const fd = new FormData(e.target);
		const customerData = Object.fromEntries(fd.entries());
		fetch('http://localhost:3000/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				order: {
					items,
					customer: customerData,
				},
			}),
		});

		e.target.reset();
	}

	return (
		<Modal open={progress === 'checkout'} onClose={handleCheckoutClose}>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>{`Total Amount: ${currencyFormatter.format(cartTotal)}`}</p>

				<Input label='Full Name' name='name' type='text' />
				<Input label='Email Address' type='text' name='email' />
				<Input label='Street' type='text' name='street' />

				<div className='control-row'>
					<Input label='Postal Code' type='text' name='postal-code' />
					<Input label='City' type='text' name='city' />
				</div>

				<p className='modal-actions'>
					<Button type='button' textOnly onClick={handleCheckoutClose}>
						Close
					</Button>
					<Button onClick={handleSubmit}>Submit Order</Button>
				</p>
			</form>
		</Modal>
	);
}
