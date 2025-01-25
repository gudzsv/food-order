import { useActionState, useContext } from 'react';
import useHttp from '../hooks/useHttp.js';
import CartContext from '../store/CardContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Error from './Error.jsx';
import Button from './UI/Button.jsx';
import Input from './UI/Input.jsx';
import Modal from './UI/Modal.jsx';

const reqCong = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
};

export default function Checkout() {
	const { items, clearCart } = useContext(CartContext);
	const { progress, hideCheckOut } = useContext(UserProgressContext);

	const { data, error, sendRequest, clearData } = useHttp(
		'http://localhost:3000/orders',
		reqCong
	);

	const cartTotal = items.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	function handleCheckoutClose() {
		hideCheckOut();
	}

	function handleFinish() {
		hideCheckOut();
		clearCart();
		clearData();
	}

	async function checkoutAction(prevState, fd) {
		const customerData = Object.fromEntries(fd.entries());

		await sendRequest(
			JSON.stringify({
				order: {
					items,
					customer: customerData,
				},
			})
		);
	}

	const [formState, formAction, isSending] = useActionState(
		checkoutAction,
		null
	);

	let actions = (
		<>
			<Button type='button' textOnly onClick={handleCheckoutClose}>
				Close
			</Button>
			<Button>Submit Order</Button>
		</>
	);

	if (isSending) {
		actions = <span>Sending order data ...</span>;
	}

	if (data && !error) {
		return (
			<Modal open={progress === 'checkout'} onClose={handleFinish}>
				<h2>Success!</h2>
				<p>Your order was submitted successfully.</p>
				<p>
					We will get back to you with more details via email within the next
					few minutes
				</p>
				<p className='modal-actions'>
					<Button onClick={handleFinish}>Okay</Button>
				</p>
			</Modal>
		);
	}
	return (
		<Modal open={progress === 'checkout'} onClose={handleCheckoutClose}>
			<form action={formAction}>
				<h2>Checkout</h2>
				<p>{`Total Amount: ${currencyFormatter.format(cartTotal)}`}</p>

				<Input label='Full Name' name='name' type='text' />
				<Input label='Email Address' type='text' name='email' />
				<Input label='Street' type='text' name='street' />

				<div className='control-row'>
					<Input label='Postal Code' type='text' name='postal-code' />
					<Input label='City' type='text' name='city' />
				</div>

				{error && <Error title='Failed to submit order' message={error} />}
				<p className='modal-actions'>{actions}</p>
			</form>
		</Modal>
	);
}
