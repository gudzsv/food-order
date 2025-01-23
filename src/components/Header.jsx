import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CardContext.jsx';
import Button from './UI/Button.jsx';

export default function Header() {
	const { items } = useContext(CartContext);

	const totalCartItems = items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity;
	}, 0);

	return (
		<header id='main-header'>
			<div id='title'>
				<img src={logoImg} alt='A restaurant' />
				<h1>FoodOrder</h1>
			</div>
			<nav>
				<Button textOnly>Cart ({totalCartItems})</Button>
			</nav>
		</header>
	);
}
