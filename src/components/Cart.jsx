import React, { useContext } from 'react';
import CartContext from '../store/CardContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import Modal from './UI/Modal.jsx';

export default function Cart() {
	const { items } = useContext(CartContext);

	const cartTotal = items.reduce((totalPrice, item) => {
		totalPrice + item.quantity * item.price;
	}, 0);

	return (
		<Modal className='cart'>
			<h2>Your Cart</h2>
			<ul>
				{items.map((item) => (
					<li key={item.id}>
						{item.name} - {item.quantity}
					</li>
				))}
			</ul>
			<p className='cart-total'>{currencyFormatter(cartTotal)}</p>
			<p className='modal-actions'>
				<Button textOnly>Close</Button>
				<Button>Go to Checkout</Button>
			</p>
		</Modal>
	);
}
