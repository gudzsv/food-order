import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CardContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Button from './UI/Button.jsx';

export default function Header() {
	const { items } = useContext(CartContext);
	const { showCart } = useContext(UserProgressContext);

	const totalCartItems = items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity;
	}, 0);

	function handleShowCart() {
		showCart();
	}

	return (
		<header id='main-header'>
			<div id='title'>
				<img src={logoImg} alt='A restaurant' />
				<h1>FoodOrder</h1>
			</div>
			<nav>
				<Button textOnly onClick={handleShowCart}>
					Cart ({totalCartItems})
				</Button>
			</nav>
		</header>
	);
}
