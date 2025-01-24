import { useContext } from 'react';
import CartContext from '../store/CardContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import CartItem from './CartItem.jsx';
import Button from './UI/Button.jsx';
import Modal from './UI/Modal.jsx';

export default function Cart() {
	const { items, addItem, removeItem } = useContext(CartContext);
	const { progress, hideCart, showCheckOut } = useContext(UserProgressContext);

	const cartTotal = items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price;
	}, 0);

	function handleCloseCart() {
		hideCart('');
	}

	function handleCheckout() {
		showCheckOut();
	}

	return (
		<Modal className='cart' open={progress === 'cart'}>
			<h2>Your Cart</h2>
			<ul>
				{items.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						onDecrease={() => removeItem(item.id)}
						onIncrease={() => addItem(item)}
					/>
				))}
			</ul>
			<p className='cart-total'>
				{`Total: ${currencyFormatter.format(cartTotal)}`}
			</p>
			<p className='modal-actions'>
				<Button textOnly onClick={handleCloseCart}>
					Close
				</Button>
				<Button onClick={handleCheckout}>Go to Checkout</Button>
			</p>
		</Modal>
	);
}
